import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { DonateModule } from './donate/donate.module';
import { MulterModule } from '@nestjs/platform-express'
import { AuthModule } from './auth/auth.module'
import { RoomContentModule } from './room-content/room-content.module'
import { TokenModule } from './token/token.module'
import { UniqueRoleModule } from './unique-role/unique-role.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),
    MulterModule.register({ dest: './static' }),
    DonateModule,
    AuthModule,
    RoomContentModule,
    TokenModule,
    UniqueRoleModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
