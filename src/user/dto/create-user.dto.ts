import { User } from "../entities/user.entity";


export class CreateUserDto extends User {
    name: string;
    lastname: string;
    password: string;
    email: string;
    profile: string;
}