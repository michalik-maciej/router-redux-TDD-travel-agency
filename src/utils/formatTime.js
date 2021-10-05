export const formatTime = (...args) => {
  if (args.length == 0) {
    return null;
  }
  if (typeof args[0] !== 'number' || args[0] < 0) {
    return null;
  }

  const result = {
    seconds: Math.floor(args[0] % 60),
    minutes: Math.floor((args[0] / 60) % 60),
    hours: Math.floor(args[0] / 3600),
  };

  for (const timeType in result) {
    result[timeType] = String(result[timeType]).padStart(2, '0');
  }

  return `${result.hours}:${result.minutes}:${result.seconds}`;
};
