import fs from 'fs';
import path from 'path';
import csvParser from 'csv-parser';

export interface College {
  college_code: string;
  name: string;
  region: string;
  district: string;
  status: string;
  autonomy_status: string;
  minority_status: string;
  home_university: string;
}

let cachedColleges: College[] | null = null;

function parseCollegeRow(row: any): College {
  return {
    college_code: row['college_code'],
    name: row['Institute Name'],
    region: row['Region'],
    district: row['District'],
    status: row['Status'],
    autonomy_status: row['Autonomy Status'],
    minority_status: row['Minority Status'],
    home_university: row['Home University'],
  };
}

export function getAllColleges(): Promise<College[]> {
  if (cachedColleges) return Promise.resolve(cachedColleges);
  return new Promise((resolve, reject) => {
    const filePath = path.resolve(__dirname, '../../college_details.csv');
    const results: College[] = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (row) => {
        results.push(parseCollegeRow(row));
      })
      .on('end', () => {
        cachedColleges = results;
        resolve(results);
      })
      .on('error', (err) => {
        reject(err);
      });
  });
}

export async function findCollegeByCodeOrName(query: string): Promise<College | undefined> {
  const colleges = await getAllColleges();
  return colleges.find(
    (c) =>
      c.college_code === query ||
      c.name.toLowerCase().includes(query.toLowerCase())
  );
} 