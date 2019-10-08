import { Document } from "mongoose";
export interface Post extends Document {
     title: string;
     body: string;
     author: string;
}