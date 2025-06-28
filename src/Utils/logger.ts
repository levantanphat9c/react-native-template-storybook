export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal';

interface LogEntry {
  timestamp: Date;
  level: LogLevel;
  message: string;
  data?: any;
  stack?: string;
  context?: string;
}

class Logger {
  private logs: LogEntry[] = [];
  private maxLogs = 500;
  private logLevel: LogLevel = __DEV__ ? 'debug' : 'warn';

  setLevel(level: LogLevel) {
    this.logLevel = level;
  }

  private shouldLog(level: LogLevel): boolean {
    const order: LogLevel[] = ['debug', 'info', 'warn', 'error', 'fatal'];
    return order.indexOf(level) >= order.indexOf(this.logLevel);
  }

  private add(entry: LogEntry) {
    this.logs.push(entry);
    if (this.logs.length > this.maxLogs)
      this.logs = this.logs.slice(-this.maxLogs);
  }

  private format(entry: LogEntry) {
    const ts = entry.timestamp.toISOString();
    const ctx = entry.context ? `[${entry.context}]` : '';
    return `${ts} [${entry.level.toUpperCase()}]${ctx} ${entry.message} ${
      entry.data ? JSON.stringify(entry.data) : ''
    }`;
  }

  debug(message: string, data?: any, context?: string) {
    if (!this.shouldLog('debug')) return;
    const entry: LogEntry = {
      timestamp: new Date(),
      level: 'debug',
      message,
      data,
      context,
    };
    this.add(entry);
    if (__DEV__) console.debug(this.format(entry));
  }

  info(message: string, data?: any, context?: string) {
    if (!this.shouldLog('info')) return;
    const entry: LogEntry = {
      timestamp: new Date(),
      level: 'info',
      message,
      data,
      context,
    };
    this.add(entry);
    if (__DEV__) console.info(this.format(entry));
  }

  warn(message: string, data?: any, context?: string) {
    if (!this.shouldLog('warn')) return;
    const entry: LogEntry = {
      timestamp: new Date(),
      level: 'warn',
      message,
      data,
      context,
    };
    this.add(entry);
    console.warn(this.format(entry));
  }

  error(message: string, error?: Error | any, context?: string) {
    if (!this.shouldLog('error')) return;
    const entry: LogEntry = {
      timestamp: new Date(),
      level: 'error',
      message,
      data:
        error && typeof error === 'object'
          ? {name: error.name, message: error.message, code: error.code}
          : error,
      stack: error?.stack,
      context,
    };
    this.add(entry);
    console.error(this.format(entry));
    if (entry.stack) console.error(entry.stack);
  }

  fatal(message: string, error?: Error | any, context?: string) {
    if (!this.shouldLog('fatal')) return;
    const entry: LogEntry = {
      timestamp: new Date(),
      level: 'fatal',
      message,
      data:
        error && typeof error === 'object'
          ? {name: error.name, message: error.message, code: error.code}
          : error,
      stack: error?.stack,
      context,
    };
    this.add(entry);
    console.error(this.format(entry));
    if (entry.stack) console.error(entry.stack);
  }

  getLogs(level?: LogLevel): LogEntry[] {
    if (level) {
      const order: LogLevel[] = ['debug', 'info', 'warn', 'error', 'fatal'];
      return this.logs.filter(
        log => order.indexOf(log.level) >= order.indexOf(level),
      );
    }
    return [...this.logs];
  }

  clear() {
    this.logs = [];
  }
}

const logger = new Logger();
export default logger;
