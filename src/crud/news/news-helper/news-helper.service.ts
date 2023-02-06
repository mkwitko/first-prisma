import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Scrapper } from 'src/providers/scrapper/scrapper';
import { CreateNewsDto } from '../dto/create-news.dto';

@Injectable()
export class NewsHelperService {
  constructor(private Prisma: PrismaService, private scrapper: Scrapper) {}

  public async news_to_add(pages = 2) {
    const news = await this.scrap_news(pages);
    const newsFound = await this.check_existance(news);

    // News to Add
    return news.filter((e) => !newsFound.find((a) => e.title === a.title));
  }

  private async scrap_news(pages) {
    // Scrapped News
    return await this.scrapper.scrap(pages);
  }

  private async check_existance(news: CreateNewsDto[]) {
    const titles = news.map((e) => {
      return e.title;
    });
    const found = await this.Prisma.news.findMany({
      where: {
        title: { in: [...titles] },
      },
      select: {
        title: true,
        date: true,
        text: true,
        img_path: true,
      },
    });
    return found;
  }
}
