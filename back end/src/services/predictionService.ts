import { spawn } from 'child_process';
import path from 'path';

interface PredictionInput {
  preferred_branch: string;
  category: string;
  percentile: number;
  mht_cet_score?: number;
}

interface CollegePrediction {
  college_name: string;
  probability: number;
}

interface PredictionResponse {
  status: 'success' | 'error';
  predictions?: CollegePrediction[];
  message?: string;
}

export class PredictionService {
  private pythonScriptPath: string;

  constructor() {
    this.pythonScriptPath = path.join(__dirname, 'prediction.py');
  }

  async predictColleges(input: PredictionInput): Promise<PredictionResponse> {
    return new Promise((resolve, reject) => {
      const pythonProcess = spawn('python3', [this.pythonScriptPath]);
      let result = '';
      let error = '';

      pythonProcess.stdout.on('data', (data) => {
        result += data.toString();
      });

      pythonProcess.stderr.on('data', (data) => {
        error += data.toString();
      });

      pythonProcess.on('close', (code) => {
        if (code !== 0) {
          reject(new Error(`Python process exited with code ${code}: ${error}`));
          return;
        }

        try {
          const predictionResult = JSON.parse(result);
          resolve(predictionResult);
        } catch (e) {
          reject(new Error(`Failed to parse prediction result: ${e}`));
        }
      });

      // Send input data to Python script
      pythonProcess.stdin.write(JSON.stringify(input));
      pythonProcess.stdin.end();
    });
  }
} 