import fs from 'fs';
import path from 'path';
import csvParser from 'csv-parser';

export interface College {
  college_code: string;
  name: string;
  region: string;
  district: string;
  originalDistrict?: string; // Optional for backward compatibility
  status: string;
  autonomy_status: string;
  minority_status: string;
  home_university: string;
}

// New interface for district-based college data
export interface DistrictCollege {
  college_code: string;
  name: string;
  district: string;
  originalDistrict: string;
}

let cachedColleges: College[] | null = null;

// Load college details data for district-based filtering
const collegeDetailsPath = path.join(__dirname, '../../college_details.csv');
const collegeDetails = new Map<string, DistrictCollege>();

// Load college details from CSV
function loadCollegeDetails() {
  const csvData = fs.readFileSync(collegeDetailsPath, 'utf-8');
  const lines = csvData.split('\n');
  
  for (let i = 1; i < lines.length; i++) { // Skip header
    const line = lines[i].trim();
    if (!line) continue;
    
    const columns = line.split(',');
    if (columns.length >= 4) {
      const collegeCode = columns[0];
      const instituteName = columns[1];
      const district = columns[3];
      
      // Group Mumbai City, Mumbai Suburban, and Thane as "Mumbai Metropolitan"
      let mappedDistrict = district;
      if (district === 'Mumbai City' || district === 'Mumbai Suburban' || district === 'Thane') {
        mappedDistrict = 'Mumbai Metropolitan';
      }
      
      collegeDetails.set(collegeCode, {
        college_code: collegeCode,
        name: instituteName,
        district: mappedDistrict,
        originalDistrict: district
      });
    }
  }
}

// Load college details on module import
loadCollegeDetails();

function parseCollegeRow(row: any): College {
  return {
    college_code: String(row['college_code']),
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

export function getAvailableDistricts(): string[] {
  const districts = new Set<string>();
  
  for (const college of collegeDetails.values()) {
    districts.add(college.district);
  }
  
  return Array.from(districts).sort();
}

export function getCollegesByDistrict(district: string): DistrictCollege[] {
  const colleges: DistrictCollege[] = [];
  
  for (const college of collegeDetails.values()) {
    if (college.district === district) {
      colleges.push(college);
    }
  }
  
  return colleges;
} 