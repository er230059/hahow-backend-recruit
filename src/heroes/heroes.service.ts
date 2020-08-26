import { Injectable } from '@nestjs/common';
import { HahowService } from 'src/hahow/hahow.service';

@Injectable()
export class HeroesService {
  constructor(private readonly hahowService: HahowService) {}

  public fetchAllHeroesWithoutProfile() {
    return this.hahowService.listHeros();
  }

  public async fetchAllHeroesIncludeProfile() {
    const heros = await this.hahowService.listHeros();
    return await Promise.all(
      heros.map(async hero => {
        const profile = await this.hahowService.getProfileOfHero(hero.id);
        return { ...hero, profile };
      }),
    );
  }

  public fetchHeroWithoutProfile(heroId: string) {
    return this.hahowService.getHero(heroId);
  }

  public async fetchHeroIncludeProfile(heroId: string) {
    const hero = await this.hahowService.getHero(heroId);
    const profile = await this.hahowService.getProfileOfHero(heroId);
    return { ...hero, profile };
  }
}