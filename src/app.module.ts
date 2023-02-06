import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsModule } from './crud/news/news.module';
import { PrismaService } from './database/prisma/prisma.service';
import { Scrapper } from './providers/scrapper/scrapper';
import { DateFormatterService } from './helpers/date-formatter/date-formatter.service';
import { ScrapperElenco } from './providers/scrapper/scrapper-elenco/scrapper-elenco';

@Module({
  imports: [NewsModule, ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    Scrapper,
    DateFormatterService,
    ScrapperElenco,
  ],
})
export class AppModule {}
