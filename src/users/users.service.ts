import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './user.interface';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    async findOne(username: string): Promise<User | undefined> {
        return await this.userModel.findOne({username});
    }
}
