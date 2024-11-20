import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export type Trip = {
  vendor_id: string
  pickup_datetime: string
  dropoff_datetime: string
  passenger_count: string
  trip_distance: string
  pickup_longitude: string
  pickup_latitude: string
  store_and_fwd_flag: string
  dropoff_longitude: string
  dropoff_latitude: string
  payment_type: string
  fare_amount: string
  mta_tax: string
  tip_amount: string
  tolls_amount: string
  total_amount: string
  imp_surcharge: string
  rate_code: string
}

export type Count ={count: string}[]

export type SummaryReportData = {
  hourMinute: string
  total: string
  detail: {
    name: string
    total: string
  }[]
}

export type SummaryReport = {
  id: number
  startDate: string;
  endDate: string;
  createdAt: string
  finishedAt: string
  message: string
  data: SummaryReportData[]
}

export type Trip = {
  vendor_id: string;
  pickup_datetime: string;
  dropoff_datetime: string;
  passenger_count: string;
  trip_distance: string;
  pickup_longitude: string;
  pickup_latitude: string;
  store_and_fwd_flag: string;
  dropoff_longitude: string;
  dropoff_latitude: string;
  payment_type: string;
  fare_amount: string;
  mta_tax: string;
  tip_amount: string;
  tolls_amount: string;
  total_amount: string;
  imp_surcharge: string;
  rate_code: string;
};