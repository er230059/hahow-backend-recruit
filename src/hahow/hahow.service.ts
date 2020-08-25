import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HahowService {
  private hahowHost: string;
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.hahowHost = this.configService.get('HAHOW_HOST');
  }

  public listHeros(): Promise<{ id: string; name: string; image: string }[]> {
    return this.httpService
      .get(`${this.hahowHost}/heroes`)
      .toPromise()
      .then(response => response.data);
  }

  public getHero(
    heroId: string,
  ): Promise<{ id: string; name: string; image: string }> {
    return this.httpService
      .get(`${this.hahowHost}/heroes/${heroId}`)
      .toPromise()
      .then(response => response.data);
  }

  public getProfileOfHero(
    heroId: string,
  ): Promise<{ str: number; int: number; agi: number; luk: number }> {
    return this.httpService
      .get(`${this.hahowHost}/heroes/${heroId}/profile`)
      .toPromise()
      .then(response => response.data);
  }

  public async auth(name: string, password: string): Promise<void> {
    await this.httpService
      .post(`${this.hahowHost}/auth`, { name, password })
      .toPromise();
  }
}
