import mongoose, { Schema, Document, Model } from 'mongoose';

// Define interfaces for TypeScript type checking
interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  projects: IProject['_id'][];
  areas: IArea['_id'][];
  resources: IResource['_id'][];
}

interface IProject extends Document {
  user: IUser['_id'];
  area: IArea['_id'];
  title: string;
  description?: string;
  todos: ITodo[];
  resources: IResource['_id'][];
  archived: boolean;
}

interface ITodo extends Document {
    title: string;
    description?: string;
    completed: boolean;
}

interface IArea extends Document {
  user: IUser['_id'];
  title: string;
  link: string;
  description?: string;
  projects: IProject['_id'][];
}

interface IResource extends Document {
  user: IUser['_id'];
  title: string;
  description?: string;
  type: 'markdown' | 'link';
  markdownContent?: string;
  link?: string;
  archived: boolean;
}

// User Schema
const UserSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
  areas: [{ type: Schema.Types.ObjectId, ref: 'Area' }],
  resources: [{ type: Schema.Types.ObjectId, ref: 'Resource' }],
});

// Project Schema
const ProjectSchema: Schema<IProject> = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  area: { type: Schema.Types.ObjectId, ref: 'Area', required: true },
  todos: [
    {
      title: { type: String, required: true },
      description: { type: String },
      completed: { type: Boolean, default: false },
    },
  ],
  resources: [{ type: Schema.Types.ObjectId, ref: 'Resource' }],
  archived: { type: Boolean, default: false },
});

// Area Schema
const AreaSchema: Schema<IArea> = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  link: { type: String, required: false },
  description: { type: String },
  projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
});

// Resource Schema
const ResourceSchema: Schema<IResource> = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  type: { type: String, enum: ['markdown', 'link'], required: true },
  markdownContent: { type: String }, // Store Markdown text if type is 'markdown'
  link: { type: String }, // Store the link URL if type is 'link'
  archived: { type: Boolean, default: false },
});

const TodoSchema: Schema<ITodo> = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false },
});

const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);
const Project: Model<IProject> = mongoose.model<IProject>('Project', ProjectSchema);
const Area: Model<IArea> = mongoose.model<IArea>('Area', AreaSchema);
const Resource: Model<IResource> = mongoose.model<IResource>('Resource', ResourceSchema);
const Todo: Model<ITodo> = mongoose.model<ITodo>('Todo', TodoSchema);

export {
  IUser,
  IProject,
  IArea,
  IResource,
  ITodo,
  User,
  Project,
  Area,
  Resource,
  Todo
};

