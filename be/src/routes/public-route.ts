import express, { NextFunction, Request, Response } from 'express'
import { DashboardController, TripController } from '../controllers'
import { DBService, ReportService } from '../services'
import TripService from '../services/trip-service'

const dbService = new DBService()
const dashboardService = new ReportService(dbService)
const tripService = new TripService()

const dashboardController = new DashboardController(dashboardService)
const tripController = new TripController(tripService)

const publicRouter = express.Router()

publicRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    "Hello": "World"
  })
})
publicRouter.get('/api/report', dashboardController.onList.bind(dashboardController))
publicRouter.post('/api/report', dashboardController.onCreate.bind(dashboardController))
publicRouter.get('/api/trips', tripController.onList.bind(tripController))

export default publicRouter