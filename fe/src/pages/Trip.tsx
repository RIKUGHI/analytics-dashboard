import { FC, useRef, useState } from "react";
import { FaX } from "react-icons/fa6";
import { IMainLayout, MainLayout, MapView } from "../components";
import { Trip, useFetchTrips } from "../hooks";

const TripPage: FC<Pick<IMainLayout, "onOpenMenu">> = ({ onOpenMenu }) => {
  const inputStartDateRef = useRef<HTMLInputElement>(null);
  const inputEndDateRef = useRef<HTMLInputElement>(null);
  const inputStartFareAmountRef = useRef<HTMLInputElement>(null);
  const inputEndFareAmountRef = useRef<HTMLInputElement>(null);
  const inputStartDistanceRef = useRef<HTMLInputElement>(null);
  const inputEndDistanceRef = useRef<HTMLInputElement>(null);
  const inputSelectRef = useRef<HTMLSelectElement>(null);

  const { data, isLoading, refetch } = useFetchTrips({
    start_date: "",
    end_date: "",
    start_fare_amount: "",
    end_fare_amount: "",
    start_distance: "",
    end_distance: "",
    payment_type: "",
  });
  const [selectedTrip, setSelectedTrip] = useState<null | Trip>(null);

  const onFilter = () => {
    refetch({
      start_date: inputStartDateRef.current?.value || "",
      end_date: inputEndDateRef.current?.value || "",
      start_fare_amount: inputStartFareAmountRef.current?.value || "",
      end_fare_amount: inputEndFareAmountRef.current?.value || "",
      start_distance: inputStartDistanceRef.current?.value || "",
      end_distance: inputEndDistanceRef.current?.value || "",
      payment_type: inputSelectRef.current?.value || "",
    });
  };

  return (
    <MainLayout title="Trip" onOpenMenu={onOpenMenu}>
      <div className="mb-2">
        <h5>Filter</h5>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <div className="flex flex-col">
            <label>Waktu Pertama</label>
            <input ref={inputStartDateRef} type="datetime-local" />
          </div>
          <div className="flex flex-col">
            <label>Waktu Kedua</label>
            <input ref={inputEndDateRef} type="datetime-local" />
          </div>
          <div className="flex flex-col">
            <label>Jumlah Tarif Pertama</label>
            <input ref={inputStartFareAmountRef} type="number" />
          </div>
          <div className="flex flex-col">
            <label>Jumlah Tarif Kedua</label>
            <input ref={inputEndFareAmountRef} type="number" />
          </div>
          <div className="flex flex-col">
            <label>Jarak Pertama</label>
            <input ref={inputStartDistanceRef} type="number" />
          </div>
          <div className="flex flex-col">
            <label>Jarak Kedua</label>
            <input ref={inputEndDistanceRef} type="number" />
          </div>
          <div className="flex flex-col">
            <label>Pembayaran</label>
            <select ref={inputSelectRef}>
              <option value=""></option>
              <option value="CRD">Credit card</option>
              <option value="CSH">Cash</option>
              <option value="NOC">No charge</option>
              <option value="DIS">Dispute</option>
              <option value="UNK">Unknown</option>
            </select>
          </div>
          <button
            className="bg-orange-600 text-white rounded-md"
            onClick={onFilter}
          >
            Filter
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        {isLoading ? (
          <span>loading</span>
        ) : data.length === 0 ? (
          <span>kosong</span>
        ) : (
          data.map((d, i) => (
            <div
              key={i}
              className="bg-orange-600 p-2 rounded-md text-white flex flex-col cursor-pointer"
              onClick={() => setSelectedTrip(d)}
            >
              <span>
                {d.vendor_id} - {d.dropoff_datetime} - {d.payment_type}
              </span>
              <span>
                titik akhir - ${d.fare_amount} - {d.trip_distance}
              </span>
            </div>
          ))
        )}
      </div>
      {selectedTrip && (
        <div className="fixed top-0 right-0 bottom-0 left-0 flex flex-col md:flex-row justify-center pt-10">
          <MapView data={selectedTrip} />
          <div className="bg-white flex flex-col p-2">
            <button className="w-10 h-10" onClick={() => setSelectedTrip(null)}>
              <FaX size={25} />
            </button>
            <span>Jumlah Tarif: ${selectedTrip.fare_amount}</span>
            <span>Jarak Perjalanan: {selectedTrip.trip_distance}mil</span>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default TripPage;
