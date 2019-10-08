import { Document } from "mongoose";
export interface PostInterface extends Document {
     title: string;
     body: string;
     author: string;
}