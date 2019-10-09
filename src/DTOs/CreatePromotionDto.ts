import { IsNotEmpty, IsString } from 'class-validator';
export class CreatePromotionDto {

    @IsNotEmpty()
    @IsString()
    public postId: string;

    @IsNotEmpty()
    @IsString()
    public promoter: string;
    
    @IsNotEmpty()
    @IsString()
    public medium: string;

}