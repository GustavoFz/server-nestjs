import { forwardRef, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth/auth.service';
import { ResponseDto } from 'src/dto/response.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TokenService {

  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService
  ) { }

  async save(hash: string, userId: number) {

    const token = await this.prisma.token.findFirst({
      where: {
        userId
      }
    })

    if (token) {
      await this.prisma.token.update({
        where: {
          id: token.id
        },
        data: {
          hash
        }
      })
    } else {
      await this.prisma.token.create({
        data: {
          userId,
          hash
        }
      })
    }


  }

  async refreshToken(oldToken: string) {
    const token = await this.prisma.token.findFirst({
      where: {
        hash: oldToken
      }
    })

    if (token) {
      const user = await this.prisma.user.findUnique({
        where: {
          id: token.userId
        }
      });

      return this.authService.login(user)

    } else {
      return <ResponseDto>{ statusCode: HttpStatus.UNAUTHORIZED, message: "Invalid token" }
    }
  }
}
