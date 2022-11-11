import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { TokenModule } from './token/token.module';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [AuthModule, UserModule, TokenModule, BlogModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
