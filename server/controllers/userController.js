import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";

const secret = 'test';
export const signup = async (req, res) => {
  const { name,email,userName,password,phone} = req.body;
  console.log(req.body);
  try {
    const oldUser = await UserModel.findOne({ userName });
    if (oldUser) return res.status(400).json({ message: "User already exists" });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const result = await UserModel.create({ name,email,userName,password:hashedPassword, phone });
    const token = jwt.sign( { userName: result.userName, id: result._id }, secret, { expiresIn: "1h" } );
   
    res.status(201).json({ result , token }); 
  } catch (error) {
    res.status(500).json(error); 
    console.log(error);
  }
};



export const signin = async (req, res) => {
    const { userName, password } = req.body;
    try {
      const oldUser = await UserModel.findOne({ userName });
      if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });
      const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
      if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
      const token = jwt.sign({ userName: oldUser.userName, id: oldUser._id }, secret, { expiresIn: "1h" });
      res.status(200).json({ result: oldUser, token });
    } catch (err) {
      res.status(500).json({ message: "Something went wrong" });
    }
  };



  //const { name,email,userName,password,phone} = req.body;

  // try {
  //   const oldUser = await UserModal.findOne({ userName });
  //   if (oldUser) return res.status(400).json({ message: "User already exists" });
  //   const salt = await bcrypt.genSalt(10);
  //   const hashedPassword = await bcrypt.hash(password, salt);
  //   const result = await UserModal.create({ name,email,userName,password, phone });
  //   const token = jwt.sign( { userName: result.userName, id: result._id }, secret, { expiresIn: "1h" } );
   
  //   res.status(201).json({ result, token }); 
  // } catch (error) {
  //   res.status(500).json(error.message); 
  //   console.log(error);
  // }