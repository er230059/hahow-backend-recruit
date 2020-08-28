import { HttpService, Injectable, Logger } from '@nestjs/common';
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

  public async getHero(
    heroId: string,
  ): Promise<{ id: string; name: string; image: string }> {
    const data = await this.httpService
      .get(`${this.hahowHost}/heroes/${heroId}`)
      .toPromise()
      .then(response => response.data);

    // This api sometime return abnormal result: { "code": 1000, "message": "Backend error" }
    if (data.code) {
      Logger.log(`getHero error: ${JSON.stringify(data)}`, 'HahowService');
      throw new Error('Hahow API error');
    }

    return data;
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
