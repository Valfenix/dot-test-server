import { Document } from "mongoose";

export interface IPost {
  id: string;
  created_at: Date;
  page: {
    title: string;
    description: string;
    tags: Array<string>;
  };
  user: {
    id: string;
    created_at: Date;
  };
}
export interface IPostDocument extends Document, Omit<IPost, "id"> {}
