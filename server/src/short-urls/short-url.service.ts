import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as shortid from 'shortid';
import { ShortUrl } from './short-url.entity';

@Injectable()
export class ShortUrlService {
  constructor(
    @InjectRepository(ShortUrl)
    private shortUrlRepository: Repository<ShortUrl>,
  ) {}

  async createShortUrl(longUrl: string): Promise<ShortUrl> {
    const existingShortUrl = await this.shortUrlRepository.findOne({
      where: { longUrl },
    });

    if (existingShortUrl) {
      throw new ConflictException('Short URL already exists');
    }

    const shortCode = shortid.generate();
    const shortUrl = this.shortUrlRepository.create({ longUrl, shortCode });

    return this.shortUrlRepository.save(shortUrl);
  }

  async getLongURL(shortCode: string): Promise<string> {
    const shortURL = await this.shortUrlRepository.findOne({
      where: { shortCode },
    });

    if (!shortURL) {
      throw new NotFoundException('Short URL not found');
    }

    return shortURL.longUrl;
  }

  async getAll(): Promise<ShortUrl[]> {
    const shortUrls = await this.shortUrlRepository.find();

    return shortUrls;
  }
}
