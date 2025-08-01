import validator from "validator";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exist = await userModel.findOne({ email: email });
    if (exist) {
      return res.json({ success: false, message: "User already exists" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Please enter a valid password" });
    }

    bcrypt.genSalt(10, (error, salt) => {
      bcrypt.hash(password, salt, async (error, hash) => {
        let newUser = await userModel.create({
          username: name,
          email: email,
          password: hash,
        })
        const user = await newUser.save();
        const token = jwt.sign({ email: email, userId: user._id }, process.env.JWT_SECRET);
        res.json({ success: true, token })
      })
    })

  } catch (error) {
    // console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.json({ success: false, message: "user doesn't exist" });
    }
    bcrypt.compare(password, user.password, (error, result) => {
      if (result) {
        const token = jwt.sign({ email: email, userId: user._id }, process.env.JWT_SECRET);
        res.json({ success: true, token })
      } else {
        res.json({ success: false, message: "Invalid Credentials" })
      }
    })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
};

// Route for admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      let token = jwt.sign(email + password, process.env.JWT_SECRET)
      res.json({ success: true, token })
    } else {
      res.json({ success: false, message: "Invalid credentials" })
    }
  } catch (error) {
    console.log(error);
    res, json({ success: false, message: error.message });
  }
};



const socialLogin = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      });
    }

    let user = await userModel.findOne({ email });

    if (!user) {
      console.log("Creating new user for email:", email);
      const dummyPassword = await bcrypt.hash(
        Math.random().toString(36).slice(2) + Date.now(),
        10
      );

      user = await userModel.create({
        username: name || email.split('@')[0],
        email,
        password: dummyPassword
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    return res.status(200).json({
      success: true,
      message: "Login successfull",
      token,
      user: {
        userId: user._id,
        name: user.name,
        email: user.email,
      }
    });
  } catch (err) {
    console.error("Social login error:", err);
    return res.status(500).json({
      success: false,
      message: err.message || "Authentication failed"
    });
  }
};


const getAllUsers = async (req, res) => {
  try {
    let allUsers = await userModel.find();
    if (!allUsers) {
      return res.json({ success: false, message: "Users not found" });
    }

    res.json({ success: true, allUsers });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Internal Server Error" });
  }
}

const deleteUserById = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.json({ success: false, message: "User Id not found" })
    }

    await userModel.findByIdAndDelete(userId);
    let allUsers = await userModel.find();
    if (!allUsers) {
      return res.json({ success: false, message: "Users not found" });
    }
    res.json({ success: true, message: "User Deleted Successfully", allUsers });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Internal Server Error" });
  }
}

export { loginUser, registerUser, adminLogin, socialLogin, getAllUsers, deleteUserById};