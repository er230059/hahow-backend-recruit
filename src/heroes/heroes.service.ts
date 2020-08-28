import { HttpException, Injectable } from '@nestjs/common';
import { HahowService } from '../hahow/hahow.service';

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
    return this.hahowService.getHero(heroId).catch(err => {
      if (err.response?.status === 404) {
        throw new HttpException('heroId not exist', 404);
      }
      throw err;
    });
  }

  public async fetchHeroIncludeProfile(heroId: string) {
    const hero = await this.hahowService.getHero(heroId).catch(err => {
      if (err.response?.status === 404) {
        throw new HttpException('heroId not exist', 404);
      }
      throw err;
    });
    const profile = await this.hahowService.getProfileOfHero(heroId);
    return { ...hero, profile };
  }
}
