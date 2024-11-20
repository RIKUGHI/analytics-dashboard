import { NextFunction, Request, Response } from "express";
import { CreateSummaryReportDto } from "../dtos/dashboard-dto";
import { ReportService } from "../services";


export default class DashboardController {
  private reportService: ReportService

  constructor(
    reportService: ReportService
  ) {
    this.reportService = reportService
  }

  async onList(req: Request, res: Response, next: NextFunction) {
    res.status(200).json({
      data: await this.reportService.list()
    })
  }

  async onCreate(req: Request, res: Response, next: NextFunction) {
    try {
      const dto: CreateSummaryReportDto = req.body as CreateSummaryReportDto

      const result = await this.reportService.register(dto)

      res.status(200).json({
        data: result
      })
    } catch (err) {
      next(err)
    }
  }
}