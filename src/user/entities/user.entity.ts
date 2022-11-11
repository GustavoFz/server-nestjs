import { Prisma } from "@prisma/client";

export class User implements Prisma.UserUncheckedCreateInput {
    id?: number;
    name: string;
    lastname: string;
    password: string;
    email: string;
    profile: string;
    updated_at?: string | Date;
    created_at?: string | Date;
    Token?: Prisma.TokenUncheckedCreateNestedManyWithoutUserInput;

}