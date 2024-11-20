import axios from "axios";
import { useEffect, useState } from "react"
import shared from "./shared";

export type SummaryReportData = {
  hourMinute: string
  total: string
  detail: {
    name: string
    total: string
  }[]
}

export type SummaryReport = {
  id: number;
  startDate: string;
  endDate: string;
  createdAt: string;
  finishedAt: string;
  message: string;
  data: SummaryReportData[]
};

interface UseFetchReporIt {
  data: SummaryReport[]
  refetch: () => void
}

const useFetchReport = (): UseFetchReporIt => {
  const [data, setData] = useState<SummaryReport[]>([])

  const loadData = () => {
    axios
    .get<{ data: SummaryReport[] }>(shared.API_URL + "report", {})
    .then((response) => {
      setData(response.data.data);
    })
    .catch((error) => {
      console.error("Terjadi kesalahan saat mengambil data:", error);
    });
  }

  useEffect(() => {
    loadData()
  }, [])

  const refetch = () => loadData()

  return { data, refetch }
}

export default useFetchReport