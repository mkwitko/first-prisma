import { PartialType } from '@nestjs/mapped-types';
import { CreateNewsDto } from './create-news.dto';

export class UpdateNewsDto extends PartialType(CreateNewsDto) {
  id?: number;
  title: string;
  date: string;
  text: string;
  img_path: string;
  created_at: Date;
  updated_at?: Date;
}
