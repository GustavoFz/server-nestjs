import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { TokenModule } from 'src/token/token.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtStrategyService } from './jwt-strategy/jwt-strategy.service';

@Module({
  imports: [
    TokenModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: {
        expiresIn: '60s'
      }
    })
  ],
  providers: [AuthService, PrismaService, JwtStrategyService],
  controllers: [AuthController],
  exports: [AuthService, JwtModule]
})
export class AuthModule { }
