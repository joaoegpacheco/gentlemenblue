const EVENT_DATE = new Date("2026-11-07T11:00:00-03:00");

export type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export function getCountdownSnapshot(): TimeLeft {
  const diff = EVENT_DATE.getTime() - Date.now();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}
