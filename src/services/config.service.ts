import { IConfigService } from '../interfaces/config.service.interface';
import { DotenvConfigOutput, config } from 'dotenv';
import { ILogger } from '../interfaces/logger.interface';
import { TYPES } from '../types/types';
import { inject, injectable } from 'inversify';

@injectable()
export class ConfigService implements IConfigService {
  private config: DotenvConfigOutput;

  constructor(@inject(TYPES.ILogger) private logger: ILogger) {
    const result: DotenvConfigOutput = config();
    if (result.error) {
      this.logger.error('error reading .env file');
    } else {
      this.logger.log('config from .env loaded');
      this.config = result.parsed as DotenvConfigOutput;
    }
  }

  get(key: string): string {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.config[key];
  }
}
