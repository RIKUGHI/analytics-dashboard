import { logger } from "./app/logger";
import redisClient from "./app/redis";
import { DBService, ReportService } from "./services";
import { SummaryReport } from "./types/global";

redisClient.on('error', (err) => {
  logger.error('🚀 Redis error: ', err)
});

redisClient.connect();

async function processJobs() {
  const dbService = new DBService()
  const reportService = new ReportService(dbService)

  while (true) {
    const job = await redisClient.blPop('jobQueue', 0);
    if (job) {
      const data: SummaryReport = JSON.parse(job.element);
      reportService.generate(data)
    }
  }
}

processJobs()