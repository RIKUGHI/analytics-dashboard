import axios from "axios";
import redisClient from "../app/redis";
import { CreateSummaryReportDto } from "../dtos/dashboard-dto";
import { Count, SummaryReport, SummaryReportData } from "../types/global";
import DBService from "./db-service";

export default class ReportService {
  private dbService: DBService

  constructor(dbService: DBService) {
    this.dbService = dbService
  }

  async list(): Promise<SummaryReport[]> {
    return this.dbService.getRecords('report')
  }

  async register(dto: CreateSummaryReportDto): Promise<string> {
    const id = new Date().getTime()
    const data: SummaryReport = {
      id,
      startDate: `${dto.start_date}:00`,
      endDate: `${dto.end_date}:00`,
      createdAt: new Date().toLocaleString("id"),
      finishedAt: '',
      message: 'pending',
      data: [
        {
          hourMinute: '11:30', 
          total: '0',
          detail: []
        }
      ]
    }

    this.dbService.addRecord('report', data)

    await redisClient.rPush('jobQueue', JSON.stringify(data))
    
    return 'Data berhasil ditambahkan dan sedang diproses'
  }

  async generate(data: SummaryReport) {
    this.dbService.updateRecord('report', (summaryReport) => {
      return summaryReport.id === data.id
    }, {message: "running"})
    
    try {
      const response = await axios.get<{
        dropoff_datetime: string,
        vendor_id: string,
        count: string
      }[]>('https://data.cityofnewyork.us/resource/gkne-dk5s.json', {
        params: {
          $query: `SELECT dropoff_datetime, vendor_id, count(*) where dropoff_datetime between '${data.startDate}' and '${data.endDate}' group by vendor_id, dropoff_datetime order by dropoff_datetime asc`,
        },
      })
      
      const result = response.data.reduce(
        (
          group: SummaryReportData[],
          current
        ) => {
          const detail = {
            name: current.vendor_id,
            total: current.count,
          };

          const rawTime = current.dropoff_datetime.split("T")[1];
          const hourMinute = rawTime.substring(0, 5);

          const duplicatedGroupIndex = group.findIndex(
            (d) => d.hourMinute === hourMinute
          );

          if (duplicatedGroupIndex == -1) {
            group = group.concat({
              hourMinute,
              total: detail.total,
              detail: [detail],
            });
          } else {
            group[duplicatedGroupIndex].total = (
              Number(group[duplicatedGroupIndex].total) + Number(detail.total)
            ).toString();

            const duplicatedGroupDetailIndex = group[duplicatedGroupIndex].detail.findIndex(d => d.name === detail.name)

            if (duplicatedGroupDetailIndex == -1) {
              group[duplicatedGroupIndex].detail =
                  group[duplicatedGroupIndex].detail.concat(detail);
            } else {
              group[duplicatedGroupIndex].detail[duplicatedGroupDetailIndex].total = (Number(group[duplicatedGroupIndex].detail[duplicatedGroupDetailIndex].total) + Number(detail.total)).toString()
            }

          }

          return group;
        },
        []
      );
      

      // const queries = [
      //   {
      //     vendor_id: 'CMT',
      //     query: `SELECT count(*) WHERE vendor_id='CMT' and dropoff_datetime between '${data.startDate}' and '${data.endDate}'`,
      //   },
      //   {
      //     vendor_id: 'VTS',
      //     query: `SELECT count(*) WHERE vendor_id='VTS' and dropoff_datetime between '${data.startDate}' and '${data.endDate}'`,
      //   },
      //   {
      //     vendor_id: 'DDS',
      //     query: `SELECT count(*) WHERE vendor_id='DDS' and dropoff_datetime between '${data.startDate}' and '${data.endDate}'`,
      //   },
      // ];
      // const [cmtRes, vtsRes, ddsRes] = await Promise.all(
      //   queries.map(query =>
      //     axios.get<Count>('https://data.cityofnewyork.us/resource/gkne-dk5s.json', {
      //       params: {
      //         $query: query.query,
      //       },
      //     })
      //   )
      // );
  
      this.dbService.updateRecord('report', (summaryReport) => {
        return summaryReport.id === data.id
      }, {
        finishedAt: new Date().toLocaleString("id"),
        message: "finished",
        data: result
      })
      
    } catch (error) {
      this.dbService.updateRecord('report', (summaryReport) => {
        return summaryReport.id === data.id
      }, {
        finishedAt: new Date().toLocaleString("id"),
        message: "error: " + error,
      })
    }
  }
}