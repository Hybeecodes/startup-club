import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { Promotion } from './promotion.interface';
import { CreatePromotionDto } from 'src/DTOs/CreatePromotionDto';

@Injectable()
export class PromotionsService {
    constructor(
        @InjectModel('Promotion')
        private readonly promotionModel: Model<Promotion>
    ) {}

    async new(postData: CreatePromotionDto) {
        const promotion = new this.promotionModel(postData);
        if(!await promotion.save()) {
            throw new InternalServerErrorException('Unable to save new Promotion');
        }
        return promotion;
    }
}
