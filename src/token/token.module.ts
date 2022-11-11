import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserModule } from 'src/user/user.module';
import { TokenController } from './token.controller';
import { TokenService } from './token.service';

@Module({
  imports: [forwardRef(() => AuthModule), UserModule],
  controllers: [TokenController],
  providers: [TokenService, PrismaService, AuthService],
  exports: [TokenService]
})
export class TokenModule { }
