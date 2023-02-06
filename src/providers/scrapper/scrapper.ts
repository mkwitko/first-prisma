import { Injectable } from '@nestjs/common';
import { DateFormatterService } from 'src/helpers/date-formatter/date-formatter.service';
import pup from 'puppeteer';

const url = 'https://www.juventude.com.br/blog';
const mainSection = '#blog';

@Injectable()
export class Scrapper {
  constructor(private dateFormatter: DateFormatterService) {}

  private async nav(page, pagination = 1) {
    await page.goto(url + '?page=' + pagination);
    await page.waitForSelector(mainSection);
  }

  private async collect_news(page) {
    const news = await page.$$eval('.blog__item > a.btnExclusive', (el) =>
      el.map((e) => e.href),
    );
    return news;
  }

  private async scrap_news(page, news, crud) {
    for (const each of news) {
      await page.goto(each);

      const title = await page.$eval('.blogDetail__title', (e) => e.innerText);
      const date = await page.$eval('.blogDetail__date', (e) => e.innerText);
      const text = await page.$$eval('.blogDetail__body > p', (elements) => {
        return elements
          .filter((element) => !element.classList.contains('text-info'))
          .map((each) => {
            return each.innerText
              ? each.innerText.replace('', '<br>').trim()
              : each.innerText;
          });
      });
      const img_path = await page.$eval(
        '.blogDetail__body > img',
        (e) => e.src,
      );
      crud.push({
        title,
        date: this.dateFormatter.convert_to_date(date),
        text: text.toString(),
        img_path,
      });
    }
  }

  async scrap(howMany = 1) {
    const crud = [];

    const browser = await pup.launch({ headless: true });
    const page = await browser.newPage();

    let count = 0;
    while (count < howMany) {
      await this.nav(page, count + 1);
      const news = await this.collect_news(page);
      await this.scrap_news(page, news, crud);
      count++;
    }

    await browser.close();
    return crud;
  }
}
