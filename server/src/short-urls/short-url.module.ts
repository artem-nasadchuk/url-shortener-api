import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortUrlController } from './short-url.controller';
import { ShortUrlService } from './short-url.service';
import { ShortUrl } from './short-url.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShortUrl])],
  controllers: [ShortUrlController],
  providers: [ShortUrlService],
})
export class ShortUrlModule {}
