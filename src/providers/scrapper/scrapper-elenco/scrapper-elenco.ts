import { Injectable } from '@nestjs/common';
const pup = require('puppeteer');

const url = 'https://www.juventude.com.br/blog';
const mainSection = '#squadSub';

@Injectable()
export class ScrapperElenco {
  constructor() {}

  private async nav(page) {
    await page.goto(url);
    await page.waitForSelector(mainSection);
  }

  private async collect(page) {
    const data = await page.$$eval('.squad__carousel__infos', (el) =>
      el.map((e) => e.href),
    );
    return data;
  }

  private async scrapper(page, data, crud) {
    for (const each of data) {
      await page.goto(each);

      const name = await page.$eval(
        '.squad__carousel__name',
        (e) => e.innerText,
      );
      const posicao = await page.$eval(
        '.squad__carousel__position',
        (e) => e.innerText,
      );
      crud.push({
        name,
        posicao,
      });
    }
  }

  async scrap() {
    const crud = [];

    const browser = await pup.launch({ headless: true });
    const page = await browser.newPage();

    let count = 0;
    await this.nav(page);
    const data = await this.collect(page);
    await this.scrapper(page, data, crud);
    count++;

    await browser.close();
    return crud;
  }
}
