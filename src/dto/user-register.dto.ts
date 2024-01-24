/* eslint-disable */
import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
  @IsEmail({}, { message: 'wrong email' })
  email: string;

  @IsString({ message: 'enter pasword' })
  password: string;

  @IsString({ message: 'enter name' })
  name: string;
}
