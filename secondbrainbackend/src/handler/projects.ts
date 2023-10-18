import { connectDB } from "../modules/db";
import { Area, User, Project, Todo } from "../models/models";

export async function createProject(req: any, res: any) {
    try {

        // connecting to database
        await connectDB();
        const { title, description, areaID } = req.body;
        const alreadyCreated = await Project.findOne({ title, user: req.user.id });

        // checking if already created or not
        if (alreadyCreated !== null) {
            res.status(400).json({ message: "Project already exists" });
            return;
        }
        console.log("Here")

        // creating Project and pushing it to Area
        const uid = req.user.id;
        const project = new Project({
            user: uid,
            title,
            description,
            area: areaID,
            todos: [],
            resources: [],
            archived: false,
        });

        await project.save();
        const area = await Area.findById(areaID);
        console.log(area);
        await Area.findByIdAndUpdate(areaID, { $push: { projects: project._id } });
        return res.status(200).json({ message: "Project created" });

    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

export async function getProjectsByArea(req: any, res: any) {
    try {
        // connecting to database
        await connectDB();

        // getting area id from params
        const uid = req.user.id;
        const { id } = req.params;

        // finding area
        const area = await Area.findById(id);
        if (!area) {
            // if area not found
            return res.status(400).json({ message: "Area not found" });
        }
        // finding projects
        const projects = await Project.find({ _id: { $in: area.projects } });

        return res.status(200).json({ projects });

    } catch (err) {
        return res.status(500).json({ message: err });
    }
}


export async function getProject(req: any, res: any) {
    try {
        await connectDB();

        const { id } = req.params;

        const project = await Project.findById(id);
        if (!project) {
            return res.status(400).json({ message: "project not found" });
        }
        return res.status(200).json({ project });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

export async function updateProject(req: any, res: any) {
    try {
        await connectDB();
        const { id, title, description } = req.body;
        const uid = req.user.id;
        const project = await Project.findById(id);
        if (!project) {
            return res.status(400).json({ message: "project not found" });
        }

        const updatedProject = await Project.findByIdAndUpdate(id, req.body);
        return res.status(200).json({ message: "project updated", updatedProject });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

export async function deleteProject(req: any, res: any) {
    try {
        await connectDB();
        const { pid, aid } = req.body;
        const uid = req.user.id;
        const result = await Project.findByIdAndDelete(pid);
        if (!result) {
            return res.status(400).json({ message: "Project not found" });
        }
        await Area.findOneAndUpdate({ _id: aid }, { $pull: { projects: result._id } });

        return res.status(200).json({ message: "Project deleted" });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

export async function getTodosByProject(req: any, res: any) {
    try {
        await connectDB();
        const { pid } = req.params;
        const uid = req.user.id;
        const result = await Todo.find({ project: pid });
        return res.status(200).json({ todos: result });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

export async function addTodo(req:any, res:any) {
    try {
        await connectDB();
        const { pid, todo } = req.body;
        const uid = req.user.id;

        const result = await Todo.insertMany(todo);
        await Project.findByIdAndUpdate(pid, { $push: { todos: result } });
        const project = await Project.findById(pid);

        return res.status(200).json({ message: "Todo added", project });

    } catch (err) {
        return res.status(400).json({ message: err });
    }
}

export async function updateTodo(req:any ,res:any){
    try {
        await connectDB();
        const { pid, tid, todo } = req.body;
        const uid = req.user.id;

        const result = await Todo.findByIdAndUpdate(tid, todo);
        const project = await Todo.findById(pid);

        return res.status(200).json({ message: "Todo updated", project });
    }catch(err) {
        return res.status(400).json({ message: err });
    }
}

export async function deleteTodo (req:any, res:any) {
    try {
        await connectDB();
        const { pid, tid } = req.body;
        const uid = req.user.id;

        const result = await Todo.findByIdAndDelete(tid);
        const project = await Project.findByIdAndUpdate(pid, { $pull: { todos: result._id } });

        return res.status(200).json({ message: "Todo deleted", project });
    }catch(err) {
        return res.status(400).json({ message: err });
    }
}
