import { Module } from '@nestjs/common';
import { TrendsService } from './trends.service';
import { TrendsController } from './trends.controller';
import { TrendSchema } from './entities/trend.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { TrendsRepository } from './trends.repository';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Trend', schema: TrendSchema }]),
    UserModule,
  ],
  controllers: [TrendsController],
  providers: [TrendsService, TrendsRepository, UserService],
  exports: [TrendsRepository],
})
export class TrendsModule {}
