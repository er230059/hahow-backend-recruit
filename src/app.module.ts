import { HttpModule, MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HahowService } from './hahow/hahow.service';
import { HeroesController } from './heroes/heroes.controller';
import { HeroesService } from './heroes/heroes.service';
import { AuthMiddleware } from './middleware/auth.middleware';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  controllers: [HeroesController],
  providers: [HahowService, HeroesService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('heroes');
  }
}
