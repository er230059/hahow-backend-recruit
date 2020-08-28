import { HttpModule, HttpService } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { Observable, of } from 'rxjs';
import { HahowService } from './hahow.service';

describe('HahowService', () => {
  let hahowService: HahowService;
  let httpService: HttpService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule, HttpModule],
      providers: [HahowService],
    }).compile();

    hahowService = module.get<HahowService>(HahowService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('listHeros', async () => {
    jest.spyOn(httpService, 'get').mockImplementationOnce(() =>
      of({
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
        data: [
          {
            id: '1',
            name: 'name',
            image: 'image',
          },
        ],
      }),
    );

    const result = await hahowService.listHeros();

    expect(result).toEqual([
      {
        id: '1',
        name: 'name',
        image: 'image',
      },
    ]);
  });

  it('getHero', async () => {
    jest.spyOn(httpService, 'get').mockImplementationOnce(() =>
      of({
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
        data: {
          id: '1',
          name: 'name',
          image: 'image',
        },
      }),
    );

    const result = await hahowService.getHero('1');

    expect(result).toEqual({
      id: '1',
      name: 'name',
      image: 'image',
    });
  });

  it('getProfileOfHero', async () => {
    jest.spyOn(httpService, 'get').mockImplementationOnce(() =>
      of({
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
        data: {
          str: 1,
          int: 2,
          agi: 3,
          luk: 4,
        },
      }),
    );

    const result = await hahowService.getProfileOfHero('1');

    expect(result).toEqual({
      str: 1,
      int: 2,
      agi: 3,
      luk: 4,
    });
  });

  it('auth by correctly name and passowrd', async () => {
    jest.spyOn(httpService, 'post').mockImplementationOnce(() =>
      of({
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
        data: {},
      }),
    );

    await hahowService.auth('name', 'password');
  });

  it('auth by correctly incorrectly name and passowrd', async () => {
    const error = {
      response: {
        status: 401,
        statusText: 'Unauthorized',
        headers: {},
        config: {},
        data: {},
      },
    };
    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(
        () => new Observable(observer => observer.error(error)),
      );

    const result = hahowService.auth('incorrectlyName', 'incorrectlyPassword');

    await expect(result).rejects.toEqual(error);
  });
});
