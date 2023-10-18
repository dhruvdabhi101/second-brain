import { Request, Response, Router } from "express";
import { createUser, signin } from "./handler/user";
import {
  createArea,
  deleteArea,
  getArea,
  getAreas,
  updateArea,
} from "./handler/area";
import {
  addTodo,
  createProject,
  deleteProject,
  deleteTodo,
  getProject,
  getProjectsByArea,
  getTodosByProject,
  updateProject,
  updateTodo,
} from "./handler/projects";
import {
  createResource,
  deleteResource,
  getResource,
  getResourcesByProject,
  updateResource,
} from "./handler/resource";

const router = Router();

router.get("/area", getAreas);
router.get("/area/:id", getArea);
router.post("/area", createArea);
router.put("/area/:id", updateArea);
router.delete("/area/:id", deleteArea);

router.get("/area/project/:id", getProjectsByArea);
router.get("/project/:id", getProject);
router.post("/project", createProject);
router.put("/project/:id", updateProject);
router.delete("/project/:id", deleteProject);

router.get("/project/todo", getTodosByProject);
router.post("/project/todo", addTodo);
router.put("project/todo", updateTodo);
router.delete("project/todo", deleteTodo);

router.get("/project/resources/:id", getResourcesByProject);
router.get("/resource/:id", getResource);
router.post("/resource", createResource);
router.put("/resource/:id", updateResource);
router.delete("/resource", deleteResource);

export { router };
