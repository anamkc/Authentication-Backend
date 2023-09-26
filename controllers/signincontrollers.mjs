import User from "../model/model.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const signinuser = async (req, res) => {
  const body = req.body;
  const { email, password } = body;

  try {
    if (!email || !password) {
      res.json({ message: "you can't leave the field empty " });
    }
    const knownUser = await User.findOne({ email: email });
    console.log(knownUser);
    if (!knownUser) {
      res.send({ message: "invalid credentials" });
    } else {
      let validPassword = await bcrypt.compare(password, knownUser.password);
      if (!validPassword) {
        res.status(400).json({ message: "inavlid credentials" });
      } else {
        const token = jwt.sign(
          { email: knownUser.email, id: knownUser._id },
          process.env.JWT_SECRET
        );
        console.log(token);

        res
          .status(200)
          .send({ token,knownUser, message: "user sign in successfully", success: true });
      }
    }
  } catch (error) {
    //check password

    res.json({ message: "error" }).status(500);
  }
};
