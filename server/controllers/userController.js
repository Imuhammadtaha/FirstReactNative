import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { expressjwt as jwt } from "express-jwt";

export const requireSignIn = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input fields
    if (!name || !email) {
      return res.status(400).send({
        success: false,
        message: "Name or Email is missing",
      });
    }
    if (!password && password.length < 6) {
      return res.status(400).send({
        success: false,
        message: "Error in Password",
      });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "User with this email already exists.",
      });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create and save new user
    const user = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    await user.save(); // Use await to ensure the user is saved before responding

    if (user) {
      res.status(201).send({
        success: true,
        message: "Account created successfully",
        user,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in your registration",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Email or Password Invalid",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User Not Found",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(400).send({
        success: false,
        message: "Invalid Email or Password",
      });
    }
    //TOKEN JWT
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    user.password = undefined;
    return res.status(200).send({
      success: true,
      message: "Login Sucessfull",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

// /*--------------UPDATE PROFILE-------*****---------------/

export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email) {
      return res.status(400).send({
        success: false,
        message: "Email Or Name is Invalid",
      });
    }

    if (password && password.length < 6) {
      return res.status(400).send({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    const existingUser = await userModel.findOne({ email });

    if (!existingUser) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }

    const hashedPassword = password
      ? await hashPassword(password)
      : existingUser.password;

    const updatedUser = await userModel.findOneAndUpdate(
      { email },
      {
        name: name || existingUser.name,
        password: hashedPassword,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Profile Updated Successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Updating Profile",
      error,
    });
  }
};
