import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { HahowService } from 'src/hahow/hahow.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly hahowService: HahowService) {}

  public async use(req: Request, res: Response, next: Function) {
    const name = req.header('Name');
    const password = req.header('Password');

    if (name === undefined && password === undefined) {
      req['authenticated'] = false;
    } else {
      try {
        await this.hahowService.auth(name, password);
        req['authenticated'] = true;
      } catch {
        res.status(401).end();
        return;
      }
    }

    next();
  }
}
