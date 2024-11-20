import axios from "axios"
import shared from "./shared"

interface IUseCreateReport {
  onResult: (result: string) => void
}

const useCreateReport = ({ onResult }: IUseCreateReport) => {
  const mutate = (dto: {
    start_date: string
    end_date: string
  }) => {
    axios
    .post<{ data: string }>(shared.API_URL + "report", dto)
    .then((response) => {
      onResult(response.data.data);
      
    })
    .catch((error) => {
      onResult("Terjadi kesalahan saat mengambil data: " + error);
    });
  }

  return {mutate}
}

export default useCreateReport