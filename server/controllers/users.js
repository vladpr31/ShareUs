import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { validateLoginInput } from "../utils/checkAuth.js";
export const signIn = async (req, res) => {
  const { email, password } = req.body; //destructure the data from the req.body.
  try {
    const { valid, errors } = validateLoginInput(email, password); //validate email and password inserted correctly.
    if (!valid) {
      throw new Error("Error", { errors });
    }
    const existingUser = await User.findOne({ email }); //checks if such email exsists.
    if (!existingUser) {
      //res.status(401).json({ message: "Email is Not Valid." });
    }
    //comparing password with bcrypt.
    const verifyPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    //no match? no login.
    if (!verifyPassword) {
      res.status(401).json({ message: "Password is Incorrect." });
    }

    //if matches then create a token with 1h expiration, the hash key needs to be stored into .env.
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "superSecretKey!@",
      {
        expiresIn: "1h",
      }
    );
    //return users data + token.
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    console.log(error);
  }
};

export const signUp = async (req, res) => {
  const { userName, email, password } = req.body; //destructure data.

  try {
    const existingUser = await User.findOne({ email }); //check if Email already exsists in database.

    //if not then register.
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(password, 12); //hashing the password using Bcrypt.
      const newUser = User({
        username: userName,
        email,
        password: hashedPassword,
      }); //creating user document.

      //creating token with 1h expiration and a secret which needs to be stored in .env.
      const token = jwt.sign(
        { email: newUser.email, id: newUser._id },
        "superSecretKey!@",
        { expiresIn: "1h" }
      );
      //then we try to save user and return it's data.
      try {
        await newUser.save();
        res.status(200).json({ result: newUser, token });
      } catch (error) {
        //or problemo.
        console.log(error);
      }
    } else {
      //if email exsists return email exsits.
      res.status(100).json({ message: "User with that email already exists." });
    }
  } catch (error) {
    throw new Error("this error:", error.message);
  }
};
