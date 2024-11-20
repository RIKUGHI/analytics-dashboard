require('dotenv').config()

import { logger } from "./app/logger";
import redisClient from "./app/redis";
import web from "./app/web";

redisClient.on('error', (err) => {
  logger.error('🚀 Redis error: ', err)
});

redisClient.connect();

web.listen(3000, async () => {
  logger.info('🚀 Server is listening on port: 3000')
})