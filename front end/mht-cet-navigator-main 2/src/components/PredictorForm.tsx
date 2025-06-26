import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import axios from 'axios';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Download } from 'lucide-react';

interface CollegePrediction {
  collegeName: string;
  branch: string;
  location: string;
  collegeType: string;
  probability: number;
  cutoff: number;
  category: string;
  seatType?: string;
  rank?: number;
}

interface BranchGroupsResponse {
  standardized_branch_ids: string[];
}

interface PredictionResponse {
  success: boolean;
  data?: CollegePrediction[];
  message?: string;
}

const REGION_OPTIONS = [
  { label: "Amravati", value: "Amravati" },
  { label: "Chhatrapati Sambhaji Nagar", value: "Aurangabad" },
  { label: "Mumbai", value: "Mumbai" },
  { label: "Nagpur", value: "Nagpur" },
  { label: "Nashik", value: "Nashik" },
  { label: "Pune", value: "Pune" }
];
//district options for cet
const DISTRICT_OPTIONS = [
  "Ahmednagar", "Akola", "Amravati", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Chhatrapati Sambhajinagar", "Dharashiv", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded", "Nandurbar", "Nashik", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"
];

// Update custom toggle switch styles for a smaller, elegant look
const toggleStyles = {
  container: 'flex items-center justify-center mb-4',
  label: 'font-medium mr-3',
  switch: 'relative inline-flex h-8 w-28 rounded-full bg-gray-100 border border-gray-300 transition-colors duration-300 focus:outline-none shadow-sm',
  slider: 'absolute left-0 top-0 h-8 w-14 rounded-full bg-primary/90 shadow transform transition-transform duration-300',
  option: 'absolute top-0 h-8 w-14 flex items-center justify-center font-semibold text-base transition-colors duration-300 select-none',
  cet: 'left-0',
  jee: 'right-0',
};

const PredictorForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [predictionResults, setPredictionResults] = useState<CollegePrediction[]>([]);
  const [branchGroups, setBranchGroups] = useState<string[]>([]);
  const [selectedBranches, setSelectedBranches] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    percentile: '',
    standardized_branch_id: '',
    category: '',
    gender: '',
    region: '',
    district: ''
  });
  const [examType, setExamType] = useState<'CET' | 'JEE'>('CET');
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [predictionCount, setPredictionCount] = useState(() => {
    return parseInt(localStorage.getItem('predictionCount') || '0', 10);
  });

  useEffect(() => {
    // Fetch standardized branch groups from backend
    axios.get<BranchGroupsResponse>('https://mht-cet-navigator.onrender.com/api/branches/standardized')
      .then(res => {
        setBranchGroups(res.data.standardized_branch_ids || []);
        console.log('Fetched branchGroups:', res.data.standardized_branch_ids);
      })
      .catch((err) => {
        setBranchGroups([]);
        console.error('Error fetching branchGroups:', err);
      });
  }, []);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddBranch = (branch: string) => {
    if (!selectedBranches.includes(branch)) {
      setSelectedBranches(prev => [...prev, branch]);
    }
  };

  const handleRemoveBranch = (idx: number) => {
    setSelectedBranches(prev => prev.filter((_, i) => i !== idx));
  };

  const moveBranch = (from: number, to: number) => {
    if (to < 0 || to >= selectedBranches.length) return;
    const updated = [...selectedBranches];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    setSelectedBranches(updated);
  };

  const validateForm = () => {
    if (!formData.percentile) return 'Percentile is required';
    if (!formData.region) return 'Region is required';
    if (selectedBranches.length === 0) return 'At least one branch group must be selected';
    if (examType === 'CET') {
      if (!formData.category) return 'Category is required';
      if (!formData.gender) return 'Gender is required';
      if (!formData.district) return 'District is required';
    }
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const validationError = validateForm();
    if (validationError) {
      toast({
        title: 'Error',
        description: validationError,
        variant: 'destructive',
      });
      setLoading(false);
      return;
    }

    // Prediction limit logic
    const token = localStorage.getItem('token');
    if (!token && predictionCount >= 5) {
      setShowLoginDialog(true);
      setLoading(false);
      return;
    }

    try {
      let response;
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      if (examType === 'CET') {
        // Make CET prediction request
        response = await axios.post<PredictionResponse>(
          'https://mht-cet-navigator.onrender.com/api/prediction/predict',
          {
            standardized_branch_ids: selectedBranches,
            percentile: parseFloat(formData.percentile),
            category: formData.category,
            gender: formData.gender,
            region: formData.region,
            district: formData.district
          },
          {
            headers
          }
        );
      } else {
        // Make JEE prediction request
        response = await axios.post<PredictionResponse>(
          'https://mht-cet-navigator.onrender.com/api/prediction/predict-jee',
          {
            standardized_branch_ids: selectedBranches,
            percentile: parseFloat(formData.percentile),
            region: formData.region
          },
          {
            headers
          }
        );
      }

      if (response.data.success && response.data.data) {
        setPredictionResults(response.data.data);
        toast({
          title: 'Success',
          description: 'Prediction completed successfully!',
        });
        // Increment prediction count for guests
        if (!token) {
          const newCount = predictionCount + 1;
          setPredictionCount(newCount);
          localStorage.setItem('predictionCount', newCount.toString());
        }
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

  function downloadCSV(results: CollegePrediction[]) {
    if (!results.length) return;
    // Only include the columns: collegeName, branch, cutoff, category, seatType, rank
    const headers = [
      'collegeName',
      'branch',
      'cutoff',
      'category',
      'seatType',
      'rank'
    ];
    const csvRows = [
      headers.join(','),
      ...results.map(row => headers.map(h => JSON.stringify((row as any)[h] ?? '')).join(','))
    ];
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'prediction_results.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enjoying predictions?</DialogTitle>
            <DialogDescription>
              Login or sign up to get unlimited predictions and save your results!
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-4">
            <Button onClick={() => {
              setShowLoginDialog(false);
              window.dispatchEvent(new Event('open-login-modal'));
            }}>Login / Sign Up</Button>
            <Button variant="outline" onClick={() => setShowLoginDialog(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>College Predictor</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Cool CET/JEE Toggle */}
          <div className={toggleStyles.container}>
            <span className={toggleStyles.label}>Exam:</span>
            <button
              type="button"
              className={toggleStyles.switch}
              aria-label="Toggle CET/JEE"
              onClick={() => setExamType(examType === 'CET' ? 'JEE' : 'CET')}
            >
              <span
                className={toggleStyles.slider}
                style={{ transform: examType === 'CET' ? 'translateX(0)' : 'translateX(100%)' }}
              />
              <span
                className={toggleStyles.option + ' ' + toggleStyles.cet}
                style={{ color: examType === 'CET' ? '#fff' : '#333' }}
              >CET</span>
              <span
                className={toggleStyles.option + ' ' + toggleStyles.jee}
                style={{ color: examType === 'JEE' ? '#fff' : '#333' }}
              >JEE</span>
            </button>
          </div>
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
              <label htmlFor="standardized_branch_id">Branch Groups (Priority Order)</label>
              <Select
                onValueChange={handleAddBranch}
                disabled={branchGroups.filter(group => !selectedBranches.includes(group)).length === 0}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Add branch group" />
                </SelectTrigger>
                <SelectContent>
                  {branchGroups.filter(group => !selectedBranches.includes(group)).length === 0 ? (
                    <div className="px-3 py-2 text-muted-foreground">No more branch groups to add</div>
                  ) : (
                    branchGroups.filter(group => !selectedBranches.includes(group)).map(group => (
                      <SelectItem key={group} value={group}>{group}</SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              {selectedBranches.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {selectedBranches.map((branch, idx) => (
                    <li key={branch} className="flex items-center gap-2 bg-muted text-foreground rounded px-2 py-1">
                      <span className="font-medium">{idx + 1}.</span>
                      <span>{branch}</span>
                      <Button type="button" size="sm" variant="ghost" onClick={() => moveBranch(idx, idx - 1)} disabled={idx === 0}>&uarr;</Button>
                      <Button type="button" size="sm" variant="ghost" onClick={() => moveBranch(idx, idx + 1)} disabled={idx === selectedBranches.length - 1}>&darr;</Button>
                      <Button type="button" size="sm" variant="destructive" onClick={() => handleRemoveBranch(idx)}>Remove</Button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="region">Region</label>
              <Select
                value={formData.region}
                onValueChange={(value) => handleChange('region', value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  {REGION_OPTIONS.map(region => (
                    <SelectItem key={region.value} value={region.value}>{region.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* CET-only fields */}
            {examType === 'CET' && (
              <>
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

                <div className="space-y-2">
                  <label htmlFor="district">District</label>
                  <Select
                    value={formData.district}
                    onValueChange={(value) => handleChange('district', value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select district" />
                    </SelectTrigger>
                    <SelectContent>
                      {DISTRICT_OPTIONS.map(district => (
                        <SelectItem key={district} value={district}>{district}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            <div className="flex justify-center">
              <Button type="submit" disabled={loading}>
                {loading ? (examType === 'CET' ? 'Predicting (CET)...' : 'Predicting (JEE)...') : 'Predict Colleges'}
              </Button>
            </div>
          </form>

          {predictionResults.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Prediction Results</h3>
              <Button
                className="mb-2 px-3 py-1 h-8 text-sm flex items-center gap-2"
                variant="outline"
                onClick={() => downloadCSV(predictionResults)}
                style={{ minWidth: 'unset', width: 'auto' }}
              >
                <Download size={16} className="mr-1" />
                Download
              </Button>
              <div className="space-y-2">
                {predictionResults.map((result, idx) => (
                  <div key={idx} className="p-3 bg-card text-card-foreground rounded">
                    <p><b>Branch:</b> {result.branch}</p>
                    <p><b>College:</b> {result.collegeName}</p>
                    {examType === 'CET' && <p><b>Category:</b> {result.category}</p>}
                    <p><b>Cutoff Percentile:</b> {result.cutoff}</p>
                    {result.rank !== undefined && <p><b>Rank:</b> {result.rank}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default PredictorForm;
