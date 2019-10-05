import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    username: String,
    email: String,
    password: String,
    profile_pic: String
}, {
    timestamps: true
});