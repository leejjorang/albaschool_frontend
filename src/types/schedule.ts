export interface ISchedule {
  id: string;
  title: string;
  start: Date;
  end: Date;
  color?: string;
}

export interface IGetSchedule {
  id: string;
  title: string;
  name: string;
  content: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

export interface IPostSchedule {
  userId: string;
  content: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

export interface IPutSchedule {
  content: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}