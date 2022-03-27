import { IPostDocument } from "../interfaces/post.interface";
import mongoose, { Schema } from "mongoose";

const PostSchema: Schema = new Schema({
  id: { type: String },
  created_at: { type: Date },
  page: {
    title: { type: String },
    description: { type: String },
    tags: [{ type: String }],
  },
  user: {
    id: { type: String },
    created_at: { type: Date },
  },
});

export default mongoose.model<IPostDocument>("Posts", PostSchema);
