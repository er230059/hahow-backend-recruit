import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HahowService } from './hahow/hahow.service';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  controllers: [],
  providers: [HahowService],
})
export class AppModule {}
