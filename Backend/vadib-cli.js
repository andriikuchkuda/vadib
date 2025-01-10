#!/usr/bin/env node
import mongoose from "mongoose";
import User from "./models/User.js";
import bcrypt from "bcrypt";
import { Command } from 'commander';
import crypto from 'crypto';
import dotenv from "dotenv";

// Create the CLI program
const program = new Command();

// Command to initialize the admin email and password
program
  .command('init')
  .description('Generate and display initial admin email and password')
  .action(async () => {
    
    dotenv.config();
    mongoose
      .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
      })
      .catch((error) => console.log(`${error} did not connect`));


    // Generate initial admin credentials
    const adminEmail = 'admin@vadib.com';

    const isExistSuperAdmin = await User.findOne({
      email : adminEmail
    })

    if(isExistSuperAdmin) {
      return console.log('You have already created Super Admin!')
    }
    const adminPassword = generateRandomPassword();

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const user = new User({
      name: 'Super Admin',
      email: adminEmail,
      password: hashedPassword,
      role: 'superadmin'
    });

    await user.save();

    // Display credentials
    console.log('Initial Admin Credentials:');
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);
  });

// Generate a random password
function generateRandomPassword() {
  return crypto.randomBytes(8).toString('hex'); // Generate a 16-character random password
}

// Parse the CLI arguments
program.parse(process.argv);
