import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { HahowService } from '../hahow/hahow.service';
import { HeroesService } from './heroes.service';

describe('HeroesService', () => {
  let heroesService: HeroesService;
  const mockHahowService = {
    listHeros: jest.fn(),
    getHero: jest.fn(),
    getProfileOfHero: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HeroesService,
        {
          provide: HahowService,
          useValue: mockHahowService,
        },
      ],
    }).compile();

    heroesService = module.get<HeroesService>(HeroesService);
  });

  it('fetchAllHeroesWithoutProfile', async () => {
    mockHahowService.listHeros.mockResolvedValueOnce([
      {
        id: '1',
        name: 'name',
        image: 'image',
      },
    ]);

    const result = await heroesService.fetchAllHeroesWithoutProfile();

    expect(result).toEqual([
      {
        id: '1',
        name: 'name',
        image: 'image',
      },
    ]);
  });

  it('fetchAllHeroesIncludeProfile', async () => {
    mockHahowService.listHeros.mockResolvedValueOnce([
      {
        id: '1',
        name: 'name',
        image: 'image',
      },
    ]);
    mockHahowService.getProfileOfHero.mockResolvedValueOnce({
      str: 1,
      int: 2,
      agi: 3,
      luk: 4,
    });

    const result = await heroesService.fetchAllHeroesIncludeProfile();

    expect(result).toEqual([
      {
        id: '1',
        name: 'name',
        image: 'image',
        profile: {
          str: 1,
          int: 2,
          agi: 3,
          luk: 4,
        },
      },
    ]);
  });

  it('fetchHeroWithoutProfile', async () => {
    mockHahowService.getHero.mockResolvedValueOnce({
      id: '1',
      name: 'name',
      image: 'image',
    });

    const result = await heroesService.fetchHeroWithoutProfile('1');

    expect(result).toEqual({
      id: '1',
      name: 'name',
      image: 'image',
    });
  });

  it('fetchHeroWithoutProfile by not exist heroId', async () => {
    mockHahowService.getHero.mockImplementation(async () => {
      throw {
        response: {
          status: 404,
          statusText: 'Not Found',
          headers: {},
          config: {},
          data: {},
        },
      };
    });

    const result = heroesService.fetchHeroWithoutProfile('1');

    await expect(result).rejects.toEqual(
      new HttpException('heroId not exist', 404),
    );
  });

  it('fetchHeroIncludeProfile', async () => {
    mockHahowService.getHero.mockResolvedValueOnce({
      id: '1',
      name: 'name',
      image: 'image',
    });
    mockHahowService.getProfileOfHero.mockResolvedValueOnce({
      str: 1,
      int: 2,
      agi: 3,
      luk: 4,
    });

    const result = await heroesService.fetchHeroIncludeProfile('1');

    expect(result).toEqual({
      id: '1',
      name: 'name',
      image: 'image',
      profile: {
        str: 1,
        int: 2,
        agi: 3,
        luk: 4,
      },
    });
  });

  it('fetchHeroIncludeProfile by not exist heroId', async () => {
    mockHahowService.getHero.mockImplementation(async () => {
      throw {
        response: {
          status: 404,
          statusText: 'Not Found',
          headers: {},
          config: {},
          data: {},
        },
      };
    });

    const result = heroesService.fetchHeroIncludeProfile('1');

    await expect(result).rejects.toEqual(
      new HttpException('heroId not exist', 404),
    );
  });
});
