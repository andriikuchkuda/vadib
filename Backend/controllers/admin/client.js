import Product from "../../models/Product.js";
import ProductStat from "../../models/ProductStat.js";
import User from "../../models/User.js";
import Transaction from "../../models/Transaction.js";
import getCountryIso3 from "country-iso-2-to-3";
import bcrypt from "bcrypt";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStat.find({
          productId: product._id,
        });
        return {
          ...product._doc,
          stat,
        };
      })
    );

    res.status(200).json(productsWithStats);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "user" }).populate("transaction").select("-password");

    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteCustomers = async (req, res) => {
  const id = req.params.id;

  try {
    const isExistDeletedUser = await User.findOneAndDelete({
      _id : id
    });

    if (isExistDeletedUser.transaction) {
      const isExistDeletedTransaction = await Transaction.findOneAndDelete({
        _id: isExistDeletedUser.transaction
      });
    }

    if (!isExistDeletedUser) {
      const error = new Error();
      error.message = 'Not exist User!';
      throw error;
    }

    const customers = await User.find({ role: "user" }).select("-password");

    res.status(200).json(customers);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const editCustomers = async (req, res) => {
  const { _id, name, email, transaction, password, adminId } = req.body;
  let newTransaction = {}
  try {
    if (!name || !email) {
      const error = new Error();
      error.message = 'Must fill out name and email!';
      throw error;
    }

    const isExistUser = await User.findById(_id);
    let hashedPassword;

    if (isExistUser) {
      if (transaction) {
        if (isExistUser.transaction) {
          // Update existing transaction
          newTransaction = await Transaction.findOneAndUpdate(
            { _id: isExistUser.transaction },
            {
              $set: {
                userId: isExistUser.id,
                usePeriod: transaction,
                adminId : adminId
              }
            },
            {
              new: true
            }
          );
        } else {
          // Create new transaction
          newTransaction = new Transaction({
            userId: isExistUser.id,
            adminId : adminId,
            usePeriod: transaction
          });
          await newTransaction.save();
        }
      } else {
        if (isExistUser.transaction) {
          const isExistDeletedTransaction = await Transaction.findOneAndDelete({
            _id: isExistUser.transaction
          });

          isExistUser.transaction = null;
          await isExistUser.save();
        }
      }

      const isMatch = password == isExistUser.password;
      
      if (password !== undefined && !isMatch) {
        hashedPassword = await bcrypt.hash(password, 10);
      }
      
      const update = {
        $set: {
          name,
          email,
          password: hashedPassword ? hashedPassword : password,
          transaction: newTransaction ? newTransaction._id : null,
          role: 'user'
        }
      }

      const customer = await User.findOneAndUpdate(
        { _id },
        update,
        {
          new: true,
          upsert: true
        }
      );

    } else {
      hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({
        name,
        email,
        password: hashedPassword,
        role : 'user'
      });
      
      const newUser = await user.save();

      if (transaction) {
          // Create new transaction
        newTransaction = new Transaction({
          userId: newUser.id,
          usePeriod: transaction,
          adminId : adminId
        });
        await newTransaction.save();


        const update = {
          $set: {
            name,
            email,
            transaction: newTransaction && newTransaction._id ? newTransaction._id : null,
            role: 'user'
          }
        }

        const customer = await User.findOneAndUpdate(
          { _id : newUser.id },
          update,
          {
            new: true,
            upsert: true
          }
        );
      }
    }

    
    const customers = await User.find({ role: "user" }).populate("transaction").select("-password");

    res.status(200).json(customers);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getTransactions = async (req, res) => {
  try {
    // sort should look like this: { "field": "userId", "sort": "desc"}
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    // formatted sort should look like { userId: -1 }
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
      };

      return sortFormatted;
    };
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const transactions = await Transaction.find({
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await Transaction.countDocuments({
      name: { $regex: search, $options: "i" },
    });

    res.status(200).json({
      transactions,
      total,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getGeography = async (req, res) => {
  try {
    const users = await User.find();

    const mappedLocations = users.reduce((acc, { country }) => {
      const countryISO3 = getCountryIso3(country);
      if (!acc[countryISO3]) {
        acc[countryISO3] = 0;
      }
      acc[countryISO3]++;
      return acc;
    }, {});

    const formattedLocations = Object.entries(mappedLocations).map(([country, count]) => {
      return { id: country, value: count };
    });

    res.status(200).json(formattedLocations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
