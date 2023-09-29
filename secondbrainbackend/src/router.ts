import { Request, Response, Router } from "express";
import { createUser, signin } from "./handler/user";
import { createArea, deleteArea, getArea, getAreas, updateArea } from "./handler/area";



const router = Router();

router.get("/area", getAreas)
router.get("/area/:id", getArea)
router.post("/area", createArea)
router.put("/area/:id", updateArea)
router.delete("/area/:id", deleteArea)



export {
    router
};

