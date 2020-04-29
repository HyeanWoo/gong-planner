import { Date } from './Date';
import { TableItem } from './TableItem';
import dayjs from 'dayjs';

export class StudyRecord {
  date: Date;
  timeTable?: Array<TableItem>;

  public constructor() {
    this.date = dayjs();
  }
}
