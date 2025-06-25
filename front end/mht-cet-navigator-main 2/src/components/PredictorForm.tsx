import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import axios from 'axios';

interface CollegePrediction {
  collegeName: string;
  branch: string;
  location: string;
  collegeType: string;
  probability: number;
  cutoff: number;
  category: string;
}

interface BranchGroupsResponse {
  standardized_branch_ids: string[];
}

interface PredictionResponse {
  success: boolean;
  data?: CollegePrediction[];
  message?: string;
}

const PredictorForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [predictionResults, setPredictionResults] = useState<CollegePrediction[]>([]);
  const [branchGroups, setBranchGroups] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    percentile: '',
    standardized_branch_id: '',
    category: '',
    gender: ''
  });

  useEffect(() => {
    // Fetch standardized branch groups from backend
    axios.get<BranchGroupsResponse>('http://localhost:5001/api/branches/standardized')
      .then(res => setBranchGroups(res.data.standardized_branch_ids || []))
      .catch(() => setBranchGroups([]));
  }, []);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get the token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        toast({
          title: 'Error',
          description: 'Please login to use the predictor',
          variant: 'destructive'
        });
        setLoading(false);
        return;
      }

      // Make prediction request
      const response = await axios.post<PredictionResponse>(
        'http://localhost:5001/api/prediction/predict',
        {
          standardized_branch_id: formData.standardized_branch_id,
          percentile: parseFloat(formData.percentile),
          category: formData.category,
          gender: formData.gender
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success && response.data.data) {
        setPredictionResults(response.data.data);
        toast({
          title: 'Success',
          description: 'Prediction completed successfully!',
        });
      } else {
        throw new Error(response.data.message || 'Prediction failed');
      }
    } catch (error) {
      console.error('Prediction error:', error);
      toast({
        title: 'Error',
        description: 'Failed to get prediction. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>College Predictor</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="percentile">Percentile</label>
            <Input
              id="percentile"
              type="number"
              value={formData.percentile}
              onChange={(e) => handleChange('percentile', e.target.value)}
              required
              min={0}
              max={100}
              step={0.01}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="standardized_branch_id">Branch Group</label>
            <Select
              value={formData.standardized_branch_id}
              onValueChange={(value) => handleChange('standardized_branch_id', value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select branch group" />
              </SelectTrigger>
              <SelectContent>
                {branchGroups.map(group => (
                  <SelectItem key={group} value={group}>{group}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="category">Category</label>
            <Select
              value={formData.category}
              onValueChange={(value) => handleChange('category', value)}
              required
              name="category"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="General">General</SelectItem>
                <SelectItem value="OBC">OBC</SelectItem>
                <SelectItem value="SC">SC</SelectItem>
                <SelectItem value="ST">ST</SelectItem>
                <SelectItem value="VJ">VJ</SelectItem>
                <SelectItem value="NT">NT</SelectItem>
                <SelectItem value="SEBC">SEBC</SelectItem>
                <SelectItem value="EWS">EWS</SelectItem>
                <SelectItem value="TFWS">TFWS</SelectItem>
                <SelectItem value="ORPHAN">ORPHAN</SelectItem>
                {/* Add more as needed */}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="gender">Gender</label>
            <Select
              value={formData.gender}
              onValueChange={(value) => handleChange('gender', value)}
              required
              name="gender"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? 'Predicting...' : 'Predict Colleges'}
          </Button>
        </form>

        {predictionResults.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Prediction Results</h3>
            <div className="space-y-2">
              {predictionResults.map((result, idx) => (
                <div key={idx} className="p-3 bg-gray-100 rounded">
                  <p><b>College:</b> {result.collegeName}</p>
                  <p><b>Branch:</b> {result.branch}</p>
                  <p><b>Type:</b> {result.collegeType}</p>
                  <p><b>Category:</b> {result.category}</p>
                  <p><b>Cutoff Percentile:</b> {result.cutoff}</p>
                  {/* Add more fields as needed */}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PredictorForm;
