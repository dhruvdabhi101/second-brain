import { connectDB } from "../modules/db";
import { Area, User } from "../models/models";

export async function createArea(req: any, res: any) {
    try {
        // connecting to database
        await connectDB();
        const { title, description } = req.body;
        const alreadyCreated = await Area.findOne({ title });

        // checking if already created or not
        if (alreadyCreated) {
            res.status(400).json({ message: "Area already exists" });
            return;
        }
        // creating area and pushing it to user
        const uid = req.user.id;
        const area = new Area({
            user: uid,
            title,
            description,
            projects: []
        });
        await area.save();
        const user = User.findById(uid);
        // await User.findOneAndUpdate({ _id: uid }, { areas: [...user.areas, area._id] });
        await User.findOneAndUpdate({ _id: uid }, { $push: { areas: area._id } });

        return res.status(200).json({ message: "Area created" });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

export async function getAreas(req: any, res: any) {
    try {

        await connectDB();
        const uid = req.user.id;
        const areas = await Area.find({ user: uid });
        return res.status(200).json({ areas });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

export async function getArea(req: any, res: any) {
    try {
        await connectDB();
        const { id } = req.params;
        const area = await Area.findById(id);
        if (!area) {
            return res.status(400).json({ message: "Area not found" });
        }
        return res.status(200).json({ area });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

export async function updateArea(req: any, res: any) {
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

export async function deleteArea(req: any, res: any) {
    try {
        await connectDB();
        const { aid } = req.body;
        const uid = req.user.id;
        const result = await Area.findByIdAndDelete(aid);
        if (!result) {
            return res.status(400).json({ message: "Area not found" });
        }
        const user = User.findById(uid);
        await User.findOneAndUpdate({ _id: uid }, { $pull: { areas: result._id } });

        return res.status(200).json({ message: "Area deleted" });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}
