import { Request, Response, Router } from "express";
import { createUser, signin } from "./handler/user";
import { createArea, deleteArea, getArea, getAreas, updateArea } from "./handler/area";
import { createProject, deleteProject, getProject, getProjectsByArea } from "./handler/projects";



const router = Router();

router.get("/area", getAreas)
router.get("/area/:id", getArea)
router.post("/area", createArea)
router.put("/area/:id", updateArea)
router.delete("/area/:id", deleteArea)

router.get("/area/project/:id", getProjectsByArea)
router.get("/project/:id", getProject)
router.post("/project", createProject)
router.put("/project/:id", updateProject)
router.delete("/project/:id", deleteProject)


export {
    router
};

