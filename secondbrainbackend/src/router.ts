import { Request, Response, Router } from "express";
import { createUser, signin } from "./handler/user";



const router = Router();
router.post("/signup", createUser);
router.post("/singin", signin);

export {
    router
};

