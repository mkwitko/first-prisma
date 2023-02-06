export class CreateNewsDto {
  id?: number;
  title: string;
  date: string;
  text: string;
  img_path: string;
  created_at: Date;
  updated_at?: Date;
}
