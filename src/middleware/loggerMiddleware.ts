import path from 'path';
import { Request, Response, NextFunction } from 'express';
import chalk from 'chalk';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

const colors: Record<Method, (_: string) => string> = {
  GET: chalk.green,
  POST: chalk.yellow,
  PUT: chalk.blue,
  DELETE: chalk.redBright,
};

const logger = (req: Request, res: Response, next: NextFunction) => {
  const method = req.method as Method;
  console.log(
    colors[method](
      `${req.method}\t${path.join(__dirname, '..', '..', req.url)}`
    )
  );
  next();
};

export default logger;
