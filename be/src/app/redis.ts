require('dotenv').config()
import { createClient } from 'redis';

const redisClient = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT || '0')
  }
});

export default redisClient