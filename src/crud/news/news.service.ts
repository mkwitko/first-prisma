import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { NewsHelperService } from './news-helper/news-helper.service';

@Injectable()
export class NewsService {
  constructor(
    private Prisma: PrismaService,
    private newsHelper: NewsHelperService,
  ) {}

  async create(createNewsDto: CreateNewsDto) {
    const newsExist = await this.Prisma.news.findFirst({
      where: {
        title: createNewsDto.title,
      },
    });

    if (newsExist) {
      throw new Error('Essa notícia já existe');
    } else {
      this.Prisma.news.create({
        data: createNewsDto,
      });
    }
  }

  findAll() {
    return this.Prisma.news.findMany({
      orderBy: [
        {
          date: 'desc',
        },
        {
          id: 'desc',
        },
      ],
    });
  }

  findOne(id: number) {
    return this.Prisma.news.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateNewsDto: UpdateNewsDto) {
    await this.Prisma.news.findUniqueOrThrow({
      where: {
        id,
      },
    });

    return await this.Prisma.news.update({
      data: updateNewsDto,
      where: {
        id,
      },
    });
  }

  remove(id: number) {
    this.Prisma.news.findUniqueOrThrow({
      where: {
        id,
      },
    });
    return this.Prisma.news.delete({
      where: {
        id,
      },
    });
  }

  @Cron(CronExpression.EVERY_10_HOURS)
  async scrap() {
    const newsToAdd = await this.newsHelper.news_to_add(2);
    let result;
    if (newsToAdd.length > 0) {
      // Add The Difference
      result = await this.Prisma.news.createMany({
        data: newsToAdd,
      });
    } else {
      result = 'No News Found';
    }
    console.log(result);
    return result;
  }
}
