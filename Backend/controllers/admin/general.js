import User from "../../models/User.js";
import OverallStat from "../../models/OverallStat.js";
import Transaction from "../../models/Transaction.js";
import bcrypt from "bcrypt";

const error = new Error();

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate("transaction");
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const editProfile = async (req, res) => {
  try {
    const { id, name, email, username, current_password, new_password } = req.body;
    
    const user = await User.findById(id);
    const update = {
      $set : {name : name, email : email}
    }

    if(!user){
      error.message = "User not exist!";
      throw error;
    }

    if(current_password && new_password) {
      const isMatch = await bcrypt.compare(current_password, user.password);

      if(!isMatch) {
        return res.status(401).json({
          message : "Invalid credentials!",
        })
      }
      const hashedPassword = await bcrypt.hash(new_password, 10);

      update.$set.password = hashedPassword;
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id : id},
      update
    );

    res.status(200).json({
      data : updatedUser,
      message : 'Your profile has been updated successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDashboardStats = async (req, res) => {
  
  try {
    let totalCustomerStats = {};
    let thisTodayTotalSaleStats = {};
    let thisMonthTotalSaleStats = {};
    let thisYearTotalSaleStats = {};
    let transactions = [];

    // transactions = await User.find({transaction : {$ne: null}})
    //   .populate('transaction');

    transactions = await Transaction.find()
      .populate('adminId', '-password')
      .populate('userId', '-password');


    totalCustomerStats.counts = await User.find({role : 'user'}).count();

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    thisTodayTotalSaleStats.counts = await Transaction.countDocuments({
      createdAt : {
        $gte : startOfToday,
        $lte : endOfToday
      }
    });
    
    //yesterday sale counts
    const startOfYesterday = new Date();
    startOfYesterday.setDate(startOfYesterday.getDate() - 1); // Go back 1 day
    startOfYesterday.setHours(0, 0, 0, 0); // Set time to 12:00 AM
    
    const endOfYesterday = new Date(startOfYesterday);
    endOfYesterday.setDate(startOfYesterday.getDate() - 1); // Go back 1 day
    endOfYesterday.setHours(23, 59, 59, 999); // Set time to 11:59:59 PM
    
    const yesterdaySaleCounts = await Transaction.countDocuments({
      createdAt : {
        $gte : startOfYesterday,
        $lte : endOfYesterday
      }
    });

    thisTodayTotalSaleStats.increase = yesterdaySaleCounts == 0 ? (thisTodayTotalSaleStats.counts * 100) : ((thisTodayTotalSaleStats.counts - yesterdaySaleCounts)/ yesterdaySaleCounts * 100)


    // Define the start and end of the current month
    const startOfMonth = new Date();
    startOfMonth.setDate(1); // Set to the 1st day of the month
    startOfMonth.setHours(0, 0, 0, 0); // Set time to 12:00 AM

    const endOfMonth = new Date();
    endOfMonth.setMonth(endOfMonth.getMonth() + 1); // Move to the next month
    endOfMonth.setDate(1); // Set to the 1st day of the next month
    endOfMonth.setHours(0, 0, 0, 0); // Set time to 12:00 AM
    endOfMonth.setMilliseconds(-1); // Move back 1 ms to get the last moment of the current month

    thisMonthTotalSaleStats.counts = await Transaction.countDocuments({
      createdAt: {
        $gte: startOfMonth,
        $lte: endOfMonth
      }
    });
    // Calculate start and end of last month
    const now = new Date();

    // Start of last month
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1); // 1st day of last month at 12:00 AM

    // End of last month
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0); // Last day of last month
    endOfLastMonth.setHours(23, 59, 59, 999); // Set time to 11:59:59 PM

    const lastMonthSaleCounts = await Transaction.countDocuments({
      createdAt : {
        $gte : startOfYesterday,
        $lte : endOfYesterday
      }
    });

    thisMonthTotalSaleStats.increase = lastMonthSaleCounts == 0 ? (thisMonthTotalSaleStats.counts * 100) : ((thisMonthTotalSaleStats.counts - lastMonthSaleCounts)/ lastMonthSaleCounts * 100)


    // Define the start and end of the current year
    const startOfYear = new Date();
    startOfYear.setMonth(0); // January
    startOfYear.setDate(1);  // 1st day of January
    startOfYear.setHours(0, 0, 0, 0); // Set time to 12:00 AM

    const endOfYear = new Date();
    endOfYear.setMonth(11); // December
    endOfYear.setDate(31);  // 31st day of December
    endOfYear.setHours(23, 59, 59, 999); // Set time to 11:59:59 PM

    thisYearTotalSaleStats.counts = await Transaction.countDocuments({
      createdAt : {
        $gte: startOfYear,
        $lte: endOfYear
      }
    });

    // Start of last year
    const startOfLastYear = new Date(now.getFullYear() - 1, 0, 1); // January 1st of last year at 12:00 AM

    // End of last year
    const endOfLastYear = new Date(now.getFullYear() - 1, 11, 31); // December 31st of last year
    endOfLastYear.setHours(23, 59, 59, 999); // Set time to 11:59:59 PM

    const lastYearSaleCounts = await Transaction.countDocuments({
      createdAt : {
        $gte : startOfYesterday,
        $lte : endOfYesterday
      }
    });

    thisYearTotalSaleStats.increase = lastYearSaleCounts == 0 ? (thisYearTotalSaleStats.counts * 100) : ((thisYearTotalSaleStats.counts - lastYearSaleCounts)/ lastYearSaleCounts * 100)

    res.status(200).json({
      totalCustomerStats,
      thisTodayTotalSaleStats,
      thisMonthTotalSaleStats,
      thisYearTotalSaleStats,
      transactions
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
