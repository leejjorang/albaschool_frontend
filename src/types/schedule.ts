export interface ISchedule {
  id: string;
  title: string;
  start: Date;
  end: Date;
  color?: string;
}

export interface IScheduleApi {
  id: string;
  title: string;
  content: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}
