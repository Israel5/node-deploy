import { Request, Response, NextFunction } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import AppError from '@shared/errors/AppError';

import Redis from 'ioredis';
import cacheConfig from '@config/cache';

const redisClient = new Redis(cacheConfig.config.redis);

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'ratelimit',
  points: Number(process.env.NUMBER_OF_REQUESTS) || 10,
  duration: Number(process.env.IN_SECONDS) || 1,
});

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    // const limiterConsumer = request.user.id ? request.user.id : request.ip;
    const limiterConsumer = request.ip;
    await limiter.consume(limiterConsumer);

    return next();
  } catch (error) {
    throw new AppError('Too Many Requests', 429);
  }
}
