import { FC, useRef, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { IMainLayout, MainLayout, SimpleTooltip } from "../components";
import {
  SummaryReport,
  SummaryReportData,
  useCreateReport,
  useFetchReport,
} from "../hooks";

const Report: FC<Pick<IMainLayout, "onOpenMenu">> = ({ onOpenMenu }) => {
  const inputStartDateRef = useRef<HTMLInputElement>(null);
  const inputEndDateRef = useRef<HTMLInputElement>(null);

  const { data, refetch } = useFetchReport();
  const { mutate } = useCreateReport({
    onResult(result) {
      console.log(result);
      refetch();
    },
  });

  const [selectedData, setSelectedData] = useState<SummaryReport | null>(null);

  const onGenerate = () => {
    if (
      !inputStartDateRef.current ||
      !inputEndDateRef.current ||
      inputStartDateRef.current.value === "" ||
      inputEndDateRef.current.value === ""
    ) {
      return;
    }

    mutate({
      start_date: inputStartDateRef.current.value,
      end_date: inputEndDateRef.current.value,
    });
  };

  return (
    <MainLayout title="Report" onOpenMenu={onOpenMenu}>
      <div className="mb-2 flex space-x-2">
        <input ref={inputStartDateRef} type="datetime-local" name="" id="" />
        <input ref={inputEndDateRef} type="datetime-local" name="" id="" />
        <button onClick={onGenerate}>generate</button>
      </div>
      <div className="mb-2 flex flex-col">
        <span className="text-sm">
          Generate hanya untuk durasi 1 hari yang sama.
        </span>
        <span className="text-sm">
          Contoh: 01/01/2014, 10:00 - 01/01/2014, 10:30
        </span>
      </div>
      {selectedData && (
        <div className="p-2 bg-white rounded-md flex flex-col mb-2">
          <strong className="text-orange-600">
            Data {selectedData.startDate} - {selectedData.endDate}
          </strong>
          <ResponsiveContainer width="100%" height={500}>
            <AreaChart
              data={selectedData.data}
              margin={{ top: 25, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="blue-600" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ea580c" stopOpacity={1} />
                  <stop offset="95%" stopColor="#ffffff" stopOpacity={1} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <YAxis tickFormatter={(value) => value} stroke="#000000" />
              <XAxis
                dataKey="hourMinute"
                height={60}
                interval={0}
                stroke="#000000"
                tick={({ x, y, payload }) => (
                  <g transform={`translate(${x},${y})`}>
                    <text
                      x={0}
                      y={0}
                      dy={16}
                      textAnchor="end"
                      fill="#000000"
                      transform="rotate(-35)"
                      className="text-xs"
                    >
                      {payload.value}
                    </text>
                  </g>
                )}
              />
              <Tooltip
                wrapperStyle={{ outlineWidth: 0 }}
                content={({ active, payload, label }) => {
                  if (active && payload && payload[0] && payload[0].value) {
                    const { total, detail } = payload[0]
                      .payload as SummaryReportData;

                    return (
                      <SimpleTooltip
                        label={label}
                        data={[
                          {
                            name: "Total Trip",
                            value: total,
                          },
                          ...detail.map((d) => ({
                            name: d.name,
                            value: d.total,
                          })),
                        ]}
                      />
                    );
                  }
                  return null;
                }}
              />
              <Area
                dataKey="total"
                stroke="#ea580c"
                fillOpacity={1}
                fill="url(#blue-600)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
      <div className="flex flex-col gap-y-2">
        {data.length === 0 ? (
          <span>kosong</span>
        ) : (
          data.map((d, i) => (
            <div
              key={i}
              className="bg-orange-600 p-2 rounded-md text-white flex flex-col cursor-pointer"
              onClick={() => setSelectedData(d)}
            >
              <span>
                id: {d.id} - {d.message}
              </span>
              <span>
                {d.startDate} - {d.endDate}
              </span>
            </div>
          ))
        )}
      </div>
    </MainLayout>
  );
};

export default Report;
