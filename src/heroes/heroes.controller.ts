import { Controller, Get, Param, Req } from '@nestjs/common';
import { ExtendedRequest } from 'src/type/extended-request.type';
import { HeroesService } from './heroes.service';

@Controller('heroes')
export class HeroesController {
  constructor(private readonly heroesService: HeroesService) {}

  @Get('')
  public fetchAllHeroes(@Req() req: ExtendedRequest) {
    if (req.authenticated) {
      return this.heroesService.fetchAllHeroesIncludeProfile();
    }
    return this.heroesService.fetchAllHeroesWithoutProfile();
  }

  @Get(':heroId')
  public fetchHero(
    @Req() req: ExtendedRequest,
    @Param('heroId') heroId: string,
  ) {
    if (req.authenticated) {
      return this.heroesService.fetchHeroIncludeProfile(heroId);
    }
    return this.heroesService.fetchHeroWithoutProfile(heroId);
  }
}
