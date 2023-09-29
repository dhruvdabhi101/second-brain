import { connectDB } from "../modules/db";
import { Area, User, Project } from "../models/models";

export async function createProject(req: any, res: any) {
    try {

        // connecting to database
        await connectDB();
        const { title, description, areaID } = req.body;
        const alreadyCreated = await Project.findOne({ title });

        // checking if already created or not
        if (alreadyCreated.title === title) {
            res.status(400).json({ message: "Project already exists" });
            return;
        }

        // creating Project and pushing it to Area
        const uid = req.user.id;
        const project = new Project({
            user: uid,
            title,
            description,
            todos: [],
            resources: [],
            archived: false,
        });

        await project.save();
        const area = Area.findById(areaID);
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
        const { aid } = req.params;

        // finding area
        const area = await Area.findById(aid);
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

/*
export async function updateProject(req: any, res: any) {
    try {
        await connectDB();
        const { aid, title, description } = req.body;
        const uid = req.user.id;
        const area = await Area.findById(aid);
        if (!area) {
            return res.status(400).json({ message: "Area not found" });
        }
        let updatedTitle = area.title;
        let updatedDescription = area.description;
        if (title) {
            updatedTitle = title;
        }
        if (description) {
            updatedDescription = description;
        }

        const updatedArea = await Area.findOneAndUpdate({ _id: aid },
            { title: updatedTitle, description: updatedDescription });
        return res.status(200).json({ message: "Area updated" });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}
*/

export async function deleteProject(req: any, res: any) {
    try {
        await connectDB();
        const { pid, aid } = req.body;
        const uid = req.user.id;
        const result = await Project.findByIdAndDelete(pid);
        if (!result) {
            return res.status(400).json({ message: "Project not found" });
        }
        const area = Area.findById(aid);
        await Area.findOneAndUpdate({ _id: aid }, { $pull: { projects: result._id } });

        return res.status(200).json({ message: "Project deleted" });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}
