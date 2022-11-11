import { User } from "../entities/user.entity";

export class LoginUserDto extends User {
    email: string;
    password: string;
}