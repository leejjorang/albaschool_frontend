import { IGetSchedule, ISchedule } from "../../types/schedule";

const nameColorMap: Record<string, string> = {};

const getColorForName = (name: string): string => {
  if (!nameColorMap[name]) {
    const colors = ["#FDA4AF", "#93C5FD", "#A3E635", "#FBBF24"];
    const color = colors[Object.keys(nameColorMap).length % colors.length];
    nameColorMap[name] = color;
  }
  return nameColorMap[name];
};

export const createEvents = (schedules: IGetSchedule[],  type: 'mine' | 'store' = 'store') => {
  const today = new Date();
  const monday = new Date(today.setDate(today.getDate() - today.getDay() + 1));

  const events: ISchedule[] = schedules.map(schedule => {
    const scheduleDate = new Date(monday);
    scheduleDate.setDate(monday.getDate() + (schedule.dayOfWeek - 1));
    
    const start = new Date(scheduleDate);
    start.setHours(
      parseInt(schedule.startTime.split(':')[0]),
      parseInt(schedule.startTime.split(':')[1]),
      0
    );

    const end = new Date(scheduleDate);
    end.setHours(
      parseInt(schedule.endTime.split(':')[0]), 
      parseInt(schedule.endTime.split(':')[1]),
      0
    );

    return {
      id: schedule.id,
      title: type === 'mine' ? schedule.title : schedule.name,
      start: start,
      end: end,
      color: getColorForName(type === 'mine' ? schedule.title : schedule.name)
    };
  });

  return events;
};


