// src/types.ts
export interface Day {
  day: number;
  month: number;
  weekday: string;
  event?: string;
}

export interface Week {
  week: number;
  days: Day[];
}

export interface CalendarData {
  term: string;
  calendar: Week[];
  key_dates: Record<string, any>;
}
