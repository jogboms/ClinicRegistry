export interface DiaryModel {
  month_name: string;
  month: number;
  year: number;
  day: number;
  created: Date;
  date: Date;
  content: string;
  exists?: boolean;
}
