import { Controller, Post, Get, Param, Body, Redirect } from '@nestjs/common';
import { ShortUrlService } from './short-url.service';

@Controller('short-urls')
export class ShortUrlController {
  constructor(private readonly shortUrlService: ShortUrlService) {}

  @Post()
  async createShortURL(@Body('longUrl') longUrl: string): Promise<string> {
    const shortUrl = await this.shortUrlService.createShortUrl(longUrl);

    return shortUrl.shortCode;
  }

  @Get(':shortCode')
  @Redirect()
  async redirectShortURL(
    @Param('shortCode') shortCode: string,
  ): Promise<{ url: string }> {
    const longUrl = await this.shortUrlService.getLongURL(shortCode);

    return { url: longUrl };
  }

  @Get()
  async getAll() {
    return this.shortUrlService.getAll();
  }
}
