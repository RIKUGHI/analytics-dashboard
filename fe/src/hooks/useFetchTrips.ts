import axios from "axios";
import { useEffect, useState } from "react";
import shared from "./shared";

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

interface UseFetchTrips {
  data: Trip[]
  isLoading: boolean
  refetch: (params: TripQuery) => void
}

type TripQuery = {
  start_date: string,
  end_date: string,
  start_fare_amount: string,
  end_fare_amount: string,
  start_distance: string,
  end_distance: string,
  payment_type: string
}

const useFetchTrips = (params: TripQuery): UseFetchTrips => {
  const [data, setData] = useState<Trip[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const loadData = (params: TripQuery) => {
    setIsLoading(true)
    axios
    .get<{ data: Trip[] }>(shared.API_URL + "trips", {
      params
    })
    .then((response) => {
      setData(response.data.data);
      setIsLoading(false)
    })
    .catch((error) => {
      console.error("Terjadi kesalahan saat mengambil data:", error);
      setIsLoading(false)
    });
  }

  useEffect(() => {
    loadData(params)
  }, [])

  const refetch = (params: TripQuery) => loadData(params)

  return { data, isLoading, refetch }
}

export default useFetchTrips