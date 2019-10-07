import * as mongoose from 'mongoose';
export interface User extends mongoose.Document {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    profile_pic: string;
}