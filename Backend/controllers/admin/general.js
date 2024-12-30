import User from "../../models/User.js";
import OverallStat from "../../models/OverallStat.js";
import Transaction from "../../models/Transaction.js";
import bcrypt from "bcrypt";

const error = new Error();

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
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

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    // hardcoded values
    const currentMonth = "November";
    const currentYear = 2021;
    const currentDay = "2021-11-15";
    
    /* Recent Transactions */
    const transactions = await Transaction.find().limit(50).sort({ createdOn: -1 });
    
    /* Overall Stats */
    const overallStat = await OverallStat.find({ year: currentYear });
    console.log('1235', overallStat[0])
    
    const { totalCustomers, yearlyTotalSoldUnits, yearlySalesTotal, monthlyData, salesByCategory } =
    overallStat[0];
    
    const thisMonthStats = overallStat[0].monthlyData.find(({ month }) => {
      return month === currentMonth;
    });

    const todayStats = overallStat[0].dailyData.find(({ date }) => {
      return date === currentDay;
    });

    res.status(200).json({
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
      thisMonthStats,
      todayStats,
      transactions,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
