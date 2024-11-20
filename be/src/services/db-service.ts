import fs from 'fs';
import path from 'path';
import { logger } from '../app/logger';
import { SummaryReport } from '../types/global';

// I assume this is a database and why JSON is used for simplicity.
export default class DBService {
  private dbPath: string

  constructor() {
    this.dbPath = path.resolve(__dirname, '../storages/report.json');
    this.initializeDB()
  }

  private initializeDB() {    
    const dirPath = path.dirname(this.dbPath); 

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    if (!fs.existsSync(this.dbPath)) {
      const initialData = { report: [] };
      fs.writeFileSync(this.dbPath, JSON.stringify(initialData, null, 2), 'utf-8');
      logger.info('Database file created successfully.');
    }
  }

  private read() {
    const data = fs.readFileSync(this.dbPath, 'utf-8');
    return JSON.parse(data);
  }
  
  private write(data: object) {
    fs.writeFileSync(this.dbPath, JSON.stringify(data, null, 2), 'utf-8'); // Beautify with 2-space indentation
  }
  
  public getRecords(collection: 'report'): SummaryReport[] {
    const db = this.read();
    return db[collection] || [];
  }
  
  public addRecord(collection: 'report', record: SummaryReport) {
    record
    const db = this.read();
    if (!db[collection]) {
      db[collection] = [];
    }
    db[collection].push(record);
    this.write(db);
    logger.info("Record added successfully!")
  }
  
  public updateRecord(
    collection: 'report',
    condition: (record: SummaryReport) => boolean,
    updateData: Partial<SummaryReport>
  ) {
    const db = this.read();
    if (!db[collection]) return;
    db[collection] = db[collection].map((record: any) =>
      condition(record) ? { ...record, ...updateData } : record
    );
    this.write(db);
    logger.info('Record(s) updated successfully!');
  }
}