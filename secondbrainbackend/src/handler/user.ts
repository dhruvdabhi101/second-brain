import { Request, Response } from "express";
import * as mongoDB from "mongodb";
import { connectDB } from "../modules/db";
import { IUser, User } from "../models/models";
import { comparePassword, generateToken, hashPassword } from "../modules/auth";


export const createUser = async (req: Request, res: Response) => {
    const hash = await hashPassword(req.body.password);
    try {
        await connectDB();
        const { username, password, email } = req.body;

      const user = User.findOne({ username: username.toString() });
      if(user) {
          return res.status(400).json({ message: "User already exists" });
      }

        // Iuser interface
        const userData = {
            username: username.toString(),
            password: hash.toString(),
            email: email.toString(),
            projects:  [],
            areas: [],
            resources: []
        }
        // data that will be inserted
        const userToBeAdded = new User(userData);
        const savedUser = await userToBeAdded.save();
        const generatedToken =  generateToken(savedUser._id);
        return res.status(201).json({user: savedUser, token: generatedToken});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const signin = async (req: Request, res: Response) => {
    const {username, password} = req.body;
    try {
        await connectDB();
        const user = await User.findOne({ username: username.toString() });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }
        const isMatch = await comparePassword(password.toString(), user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }else {
            const token = generateToken(user._id);
            return res.status(200).json({ message: "Logged in successfully", token });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
