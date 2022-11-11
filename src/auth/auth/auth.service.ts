import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ResponseDto } from 'src/dto/response.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { TokenService } from 'src/token/token.service';
import { LoginUserDto } from 'src/user/dto/login-user.dto';

@Injectable()
export class AuthService {

    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
        private tokenService: TokenService,
    ) { }
    // add dto to data
    async login(data: LoginUserDto) {

        if (!data.email) {
            return <ResponseDto>{ statusCode: HttpStatus.BAD_REQUEST, message: 'Missing data in the request' }
        }
        const user = await this.validateCredentials(data.email, data.password);

        const payload = {
            email: user.email,
            name: user.name
        }

        const token = this.jwtService.sign(payload)

        this.tokenService.save(token, user.id)

        return { access_token: token }
    };

    async validateCredentials(email: string, pass: string) {
        const user = await this.prisma.user.findUnique({
            where: { email }
        })

        if (!user) {
            throw new UnauthorizedException('User or Password is invalid');
        }

        const isPasswordMatch = await (bcrypt.compare(pass, user.password))

        if (!isPasswordMatch) {
            throw new UnauthorizedException('User or Password is invalid');
        }

        const { password, ...rest } = user

        return rest;
    }
}
