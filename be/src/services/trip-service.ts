import axios from "axios";
import { Trip } from "../types/global";
import { TripQuery } from "../dtos/trip-dto";

export default class TripService {
  async list(query: TripQuery): Promise<Trip[]> {
    const queries: string[] = []

    if (query.start_date && query.end_date) {
      queries.push(`(dropoff_datetime between '${query.start_date}:00' and '${query.end_date}:00')`)
    }

    if (query.start_fare_amount && query.end_fare_amount) {
      queries.push(`(fare_amount between '${query.start_fare_amount}' and '${query.end_fare_amount}')`)
    }
    
    if (query.start_distance && query.end_distance) {
      queries.push(`(trip_distance between '${query.start_distance}' and '${query.end_distance}')`)
    }

    if (query.payment_type) {
      queries.push(`payment_type='${query.payment_type}'`)
    }

    
    const res = await axios.get<Trip[]>('https://data.cityofnewyork.us/resource/gkne-dk5s.json', {
      params: {
        $query: `SELECT * ${queries.length > 0 ? 'where ' + queries.map(q => q).join(' and ') : ''} limit 5`,
      },
    })
    
    return res.data
  }
}