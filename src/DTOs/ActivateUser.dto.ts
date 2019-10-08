import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class ActivateUserDto {


    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    token: string;
}