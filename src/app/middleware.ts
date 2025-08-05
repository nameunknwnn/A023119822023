// lib/logger.js
class Logger {
  public isDev: boolean;
  constructor() {
    this.isDev = process.env.NODE_ENV === 'development';
  }

  formatTimestamp(): string {
    return new Date().toISOString().replace('T', ' ').substring(0, 19);
  }

  formatData(data: unknown): string {
    if (typeof data === 'object' && data !== null) {
      return JSON.stringify(data, null, 0);
    }
    return String(data);
  }

  log(...args: unknown[]): void {
    if (!this.isDev) return;
    const timestamp = this.formatTimestamp();
    const formattedArgs = args.map(arg => this.formatData(arg));
    console.log(`[${timestamp}]`, ...formattedArgs);
  }

  error(...args: unknown[]): void {
    const timestamp = this.formatTimestamp();
    const formattedArgs = args.map(arg => this.formatData(arg));
    console.error(`[${timestamp}] ERROR:`, ...formattedArgs);
  }

  warn(...args: unknown[]): void {
    if (!this.isDev) return;
    const timestamp = this.formatTimestamp();
    const formattedArgs = args.map(arg => this.formatData(arg));
    console.warn(`[${timestamp}] WARN:`, ...formattedArgs);
  }

  info(...args: unknown[]): void {
    if (!this.isDev) return;
    const timestamp = this.formatTimestamp();
    const formattedArgs = args.map(arg => this.formatData(arg));
    console.info(`[${timestamp}] INFO:`, ...formattedArgs);
  }
}

// Create singleton instance
const logger = new Logger();

// Type for extending the request object
import type { NextApiRequest, NextApiResponse } from 'next';

interface LoggerRequest extends NextApiRequest {
  logger: Logger;
}

type NextHandler = () => void;

// Middleware function
export const loggerMiddleware = (
  req: LoggerRequest,
  res: NextApiResponse,
  next?: NextHandler
): Logger => {
  // Add logger to request object
  req.logger = logger;
  // Log incoming request (optional)
  logger.log(`${req.method} ${req.url}`);
  if (next) next();
  return logger;
};

// Export logger for direct use
export default logger;
  