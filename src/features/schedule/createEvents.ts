import { ISchedule } from "../../types/schedule";

const nameColorMap: Record<string, string> = {};

const getColorForName = (name: string): string => {
  if (!nameColorMap[name]) {
    const colors = ["#FDA4AF", "#93C5FD", "#A3E635", "#FBBF24"];
    const color = colors[Object.keys(nameColorMap).length % colors.length];
    nameColorMap[name] = color;
  }
  return nameColorMap[name];
};

export const createEvents = () => {
  const today = new Date();
  const monday = new Date(today.setDate(today.getDate() - today.getDay() + 1));

  const events: ISchedule[] = [
    {
      id: "1",
      title: "김알바",
      start: new Date(monday.setHours(9, 0, 0)),
      end: new Date(monday.setHours(10, 30, 0)),
      color: getColorForName("김알바"),
    },
    {
      id: "2",
      title: "이알바",
      start: new Date(monday.setHours(11, 0, 0)),
      end: new Date(monday.setHours(12, 30, 0)),
      color: getColorForName("이알바"),
    },
  ];

  return events;
};
