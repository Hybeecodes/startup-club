import { Injectable, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './user.interface';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel('User')
        private readonly userModel: Model<User>) {}

    async findOne(username: string): Promise<User | undefined> {
        return await this.userModel.findOne({username});
    }

    async create(postData): Promise<User | undefined> {
        // check if user exists
        const user = await this.userModel.findOne({
            $or: [
                { username: postData.username},
                { email: postData.email}
            ]
        });
        if(user) {
            throw new ConflictException('User exists already');
        }
        let newUser = new this.userModel(postData);
        newUser = await newUser.save();
        if(!newUser) {
            throw new InternalServerErrorException('Unable to Create New User');
        }
        return newUser;
    }
}
