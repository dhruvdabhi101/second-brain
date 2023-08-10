import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import { IUser, User } from "../models/models";
import * as dotenv from "dotenv";
import * as jwt from "jsonwebtoken";
dotenv.config();

export const comparePassword = async (password: string, hash: string) => {
    return bcrypt.compare(password, hash);
};

export const hashPassword = async (password: string) => {
    return bcrypt.hash(password, 3);
}

export const generateToken = (uid) => {
    const token = jwt.sign({ id: uid }, process.env.JWT_TOKEN);
    return token;
}

export const protect = async (req: any, res: any, next: any) => {
    const bearer = req.headers.authorization;

    if (!bearer) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const [, token] = bearer.split(" ");
    console.log(bearer);
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Wrong Token, Mate" });
        return;
    }
}
