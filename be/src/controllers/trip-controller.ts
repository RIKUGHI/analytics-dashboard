import { NextFunction, Request, Response } from "express";
import TripService from "../services/trip-service";
import { TripQuery } from "../dtos/trip-dto";


export default class TripController {
  private tripService: TripService

  constructor(
    tripService: TripService
  ) {
    this.tripService = tripService
  }

  async onList(req: Request, res: Response, next: NextFunction) {
    const query: TripQuery = req.query as TripQuery
    
    res.status(200).json({
      data: await this.tripService.list(query)
    })
  }
}