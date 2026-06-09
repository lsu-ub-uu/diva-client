const timestampedConsoles = new WeakSet<object>();

const consoleMethods = [
  'error',
  'warn',
  'info',
  'debug',
  'trace',
  'log',
] as const;

type ConsoleMethodName = (typeof consoleMethods)[number];
type TimestampedConsole = Pick<Console, ConsoleMethodName>;

export const installTimestampedConsole = (
  consoleObject: TimestampedConsole = console,
  getTimestamp: () => string = () => new Date().toISOString(),
) => {
  if (timestampedConsoles.has(consoleObject)) {
    return;
  }

  consoleMethods.forEach((methodName) => {
    const originalMethod = consoleObject[methodName].bind(consoleObject);
    const level = methodName.toUpperCase();

    consoleObject[methodName] = ((...args: unknown[]) => {
      originalMethod(`[${getTimestamp()}]`, `[${level}]`, ...args);
    }) as TimestampedConsole[ConsoleMethodName];
  });

  timestampedConsoles.add(consoleObject);
};
