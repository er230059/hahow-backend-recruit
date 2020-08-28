import { Test, TestingModule } from '@nestjs/testing';
import * as httpMocks from 'node-mocks-http';
import { ExtendedRequest } from '../type/extended-request.type';
import { HeroesController } from './heroes.controller';
import { HeroesService } from './heroes.service';

describe('HeroesService', () => {
  let heroesController: HeroesController;
  const mockHeroesService = {
    fetchAllHeroesWithoutProfile: jest.fn(),
    fetchAllHeroesIncludeProfile: jest.fn(),
    fetchHeroWithoutProfile: jest.fn(),
    fetchHeroIncludeProfile: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HeroesController],
      providers: [
        {
          provide: HeroesService,
          useValue: mockHeroesService,
        },
      ],
    }).compile();

    heroesController = module.get<HeroesController>(HeroesController);
  });

  it('fetchAllHeroes with authenticated is true', async () => {
    const request: ExtendedRequest = httpMocks.createRequest({
      authenticated: true,
    });
    mockHeroesService.fetchAllHeroesIncludeProfile.mockResolvedValueOnce([
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

    const result = await heroesController.fetchAllHeroes(request);

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

  it('fetchAllHeroes with authenticated is false', async () => {
    const request: ExtendedRequest = httpMocks.createRequest({
      authenticated: false,
    });
    mockHeroesService.fetchAllHeroesWithoutProfile.mockResolvedValueOnce([
      {
        id: '1',
        name: 'name',
        image: 'image',
      },
    ]);

    const result = await heroesController.fetchAllHeroes(request);

    expect(result).toEqual([
      {
        id: '1',
        name: 'name',
        image: 'image',
      },
    ]);
  });

  it('fetchHero with authenticated is true', async () => {
    const request: ExtendedRequest = httpMocks.createRequest({
      authenticated: true,
    });
    mockHeroesService.fetchHeroIncludeProfile.mockResolvedValueOnce({
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

    const result = await heroesController.fetchHero(request, '1');

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

  it('fetchHero with authenticated is false', async () => {
    const request: ExtendedRequest = httpMocks.createRequest({
      authenticated: false,
    });
    mockHeroesService.fetchHeroWithoutProfile.mockResolvedValueOnce({
      id: '1',
      name: 'name',
      image: 'image',
    });

    const result = await heroesController.fetchHero(request, '1');

    expect(result).toEqual({
      id: '1',
      name: 'name',
      image: 'image',
    });
  });
});
