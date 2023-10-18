import { connectDB } from "../modules/db";
import { Area, User, Project, Todo, Resource } from "../models/models";

/*
  user: IUser['_id'];
  title: string;
  description?: string;
  type: 'markdown' | 'link';
  markdownContent?: string;
  link?: string;
  archived: boolean;
}
*/

export async function createResource(req: any, res: any) {
  try {
    // connecting to database
    await connectDB();
    const { title, description, projectID, type, markdownContent, link } =
      req.body;
    const alreadyCreated = await Resource.findOne({ title, user: req.user.id });

    // checking if already created or not
    if (alreadyCreated !== null) {
      res.status(400).json({ message: "resource already exists" });
      return;
    }

    // creating Project and pushing it to Area
    const uid = req.user.id;
    const resource = new Resource({
      user: uid,
      title,
      description,
      type,
      markdownContent,
      link,
      archived: false,
    });

    await resource.save();
    await Project.findByIdAndUpdate(
      { _id: projectID },
      { $push: { resources: resource._id } }
    );
    return res.status(200).json({ message: "Resource created" });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
}

export async function getResourcesByProject(req: any, res: any) {
  try {
    // connecting to database
    await connectDB();

    // getting area id from params
    const uid = req.user.id;
    const { id } = req.params;

    // finding area
    const project = await Project.findById(id);
    if (!project) {
      // if area not found
      return res.status(400).json({ message: "project not found" });
    }
    // finding projects
    const resources = await Resource.find({ _id: { $in: project.resources } });

    return res.status(200).json({ resources });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
}

export async function getResource(req: any, res: any) {
  try {
    await connectDB();

    const { id } = req.params;

    const resource = await Resource.findById(id);
    if (!resource) {
      return res.status(400).json({ message: "project not found" });
    }
    return res.status(200).json({ resource });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
}

export async function updateResource(req: any, res: any) {
  try {
    await connectDB();
    const { title, description, markdownContent, link } = req.body;
    const uid = req.user.id;
    const { id } = req.params;
    const resource = await Resource.findById(id);
    if (!resource) {
      return res.status(400).json({ message: "resource not found" });
    }

    const updatedResource = await Resource.findByIdAndUpdate(id, req.body);
    return res
      .status(200)
      .json({ message: "Resource updated", updatedResource });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
}

export async function deleteResource(req: any, res: any) {
  try {
    await connectDB();
    const { rid, pid } = req.body;
    const uid = req.user.id;
    const result = await Resource.findByIdAndDelete(rid);
    if (!result) {
      return res.status(400).json({ message: "Resource not found" });
    }
    await Project.findOneAndUpdate({ _id: pid }, { $pull: { resources: rid } });

    return res.status(200).json({ message: "Resource deleted" });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
}
