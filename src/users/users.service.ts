import { Injectable, InternalServerErrorException } from '@nestjs/common';
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
        try {
            let newUser = new this.userModel(postData);
            return await newUser.save();
        } catch (error) {
            throw new InternalServerErrorException('Unable to Create New User');
        }
    }
}
