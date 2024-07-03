import { CacheModule, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { JwtStrategy } from './modules/auth/jwt.strategy';
import { CustomConfigService } from './shared/services/custom-config.service';
import { OrderModule } from './modules/order/order.module';
import { SystemConfigModule } from './modules/system_config/system_config.module';
import { UploadController } from './modules/upload/upload.controller';
import { UploadModule } from './modules/upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
    CacheModule.register({ ttl: 10_000 }),
    SharedModule,
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_URL'),
          port: configService.get('REDIS_PORT'),
          db: configService.get('REDIS_DB'),
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (customConfigService: CustomConfigService) =>
        customConfigService.typeOrmConfig,
      inject: [CustomConfigService],
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    UserModule,
    OrderModule,
    SystemConfigModule,
    UploadModule,
  ],
  providers: [JwtStrategy],
  controllers: [UploadController],
})
export class AppModule {}
