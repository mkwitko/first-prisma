import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Scrapper } from 'src/providers/scrapper/scrapper';
import { NewsHelperService } from './news-helper/news-helper.service';
import { DateFormatterService } from 'src/helpers/date-formatter/date-formatter.service';

@Module({
  controllers: [NewsController],
  providers: [
    NewsService,
    PrismaService,
    Scrapper,
    NewsHelperService,
    DateFormatterService,
  ],
})
export class NewsModule {}
