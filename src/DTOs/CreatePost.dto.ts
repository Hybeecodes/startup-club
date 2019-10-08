import { IsNotEmpty, IsString } from 'class-validator';
export class CreatePostDto {

    @IsNotEmpty()
    @IsString()
    public title: string;

    @IsNotEmpty()
    @IsString()
    public body: string;

}