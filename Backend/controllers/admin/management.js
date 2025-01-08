import mongoose from "mongoose";
import User from "../../models/User.js";
import Transaction from "../../models/Transaction.js";
import bcrypt from "bcrypt";

export const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" });
    res.status(200).json(admins);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const editAdmins = async (req, res) => {
  const {_id, name, email, password, transaction, role } = req.body;
  try {
    if(!name || !email ) {
      const error = new Error();
      error.message = 'Must fill out name and email!';
      throw error;
    }

    const admin = await User.findById(_id);
    let hashedPassword;

    if(!admin) {
      if (!password) {
        const error = new Error();
        error.message = 'Enter new Password!';
        throw error;
      }

      hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        name,
        email,
        password: hashedPassword,
        transaction,
        role : 'admin'
      });
      
      await user.save();
    } else {
      const isMatch = password == admin.password;
      if (!isMatch) {
        hashedPassword = await bcrypt.hash(password, 10);
      }

      const update = {
        $set : {name , email, password: hashedPassword, transaction, role : role ? role : 'admin'}
      }
  
      const updatedAdmin = await User.findOneAndUpdate(
        { _id },
        update,
        { new : true,
          upsert : true
        }
      );
    }

    const admins = await User.find({ role: "admin" });

    res.status(200).json(admins);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getUserPerformance = async (req, res) => {
  try {
    const { id } = req.params;

    const userWithStats = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: "affiliatestats",
          localField: "_id",
          foreignField: "userId",
          as: "affiliateStats",
        },
      },
      { $unwind: "$affiliateStats" },
    ]);

    const saleTransactions = await Promise.all(
      userWithStats[0].affiliateStats.affiliateSales.map((id) => {
        return Transaction.findById(id);
      })
    );
    const filteredSaleTransactions = saleTransactions.filter((transaction) => transaction !== null);

    res.status(200).json({ user: userWithStats[0], sales: filteredSaleTransactions });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
