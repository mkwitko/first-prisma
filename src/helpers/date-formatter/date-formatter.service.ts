import { Injectable } from '@nestjs/common';

@Injectable()
export class DateFormatterService {
  convert_to_date(who: string) {
    let [dia, mes, ano] = who.split(/[\/: ]/).map((v) => parseInt(v));
    return new Date(ano, mes - 1, dia);
  }
}
