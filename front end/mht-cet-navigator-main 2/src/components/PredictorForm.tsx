import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import axios from 'axios';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Download, FileText } from 'lucide-react';
import { API_ENDPOINTS } from '../lib/api';
import jsPDF from 'jspdf';

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

const DISTRICT_OPTIONS = [
  { value: "Ahmednagar", label: "Ahilyanagar" },
  { value: "Akola", label: "Akola" },
  { value: "Amravati", label: "Amravati" },
  { value: "Beed", label: "Beed" },
  { value: "Bhandara", label: "Bhandara" },
  { value: "Buldhana", label: "Buldhana" },
  { value: "Chandrapur", label: "Chandrapur" },
  { value: "Chhatrapati Sambhajinagar", label: "Chhatrapati Sambhajinagar" },
  { value: "Dharashiv", label: "Dharashiv" },
  { value: "Dhule", label: "Dhule" },
  { value: "Gadchiroli", label: "Gadchiroli" },
  { value: "Gondia", label: "Gondia" },
  { value: "Hingoli", label: "Hingoli" },
  { value: "Jalgaon", label: "Jalgaon" },
  { value: "Jalna", label: "Jalna" },
  { value: "Kolhapur", label: "Kolhapur" },
  { value: "Latur", label: "Latur" },
  { value: "Mumbai Metropolitan", label: "Mumbai Metropolitan" },
  { value: "Nagpur", label: "Nagpur" },
  { value: "Nanded", label: "Nanded" },
  { value: "Nandurbar", label: "Nandurbar" },
  { value: "Nashik", label: "Nashik" },
  { value: "Palghar", label: "Palghar" },
  { value: "Parbhani", label: "Parbhani" },
  { value: "Pune", label: "Pune" },
  { value: "Raigad", label: "Raigad" },
  { value: "Ratnagiri", label: "Ratnagiri" },
  { value: "Sangli", label: "Sangli" },
  { value: "Satara", label: "Satara" },
  { value: "Sindhudurg", label: "Sindhudurg" },
  { value: "Solapur", label: "Solapur" },
  { value: "Wardha", label: "Wardha" },
  { value: "Washim", label: "Washim" },
  { value: "Yavatmal", label: "Yavatmal" }
];

// Separate options for Class 12th district (includes individual Mumbai districts)
const CLASS12_DISTRICT_OPTIONS = [
  { value: "Ahmednagar", label: "Ahilyanagar" },
  { value: "Akola", label: "Akola" },
  { value: "Amravati", label: "Amravati" },
  { value: "Beed", label: "Beed" },
  { value: "Bhandara", label: "Bhandara" },
  { value: "Buldhana", label: "Buldhana" },
  { value: "Chandrapur", label: "Chandrapur" },
  { value: "Chhatrapati Sambhajinagar", label: "Chhatrapati Sambhajinagar" },
  { value: "Dharashiv", label: "Dharashiv" },
  { value: "Dhule", label: "Dhule" },
  { value: "Gadchiroli", label: "Gadchiroli" },
  { value: "Gondia", label: "Gondia" },
  { value: "Hingoli", label: "Hingoli" },
  { value: "Jalgaon", label: "Jalgaon" },
  { value: "Jalna", label: "Jalna" },
  { value: "Kolhapur", label: "Kolhapur" },
  { value: "Latur", label: "Latur" },
  { value: "Mumbai City", label: "Mumbai City" },
  { value: "Mumbai Suburban", label: "Mumbai Suburban" },
  { value: "Nagpur", label: "Nagpur" },
  { value: "Nanded", label: "Nanded" },
  { value: "Nandurbar", label: "Nandurbar" },
  { value: "Nashik", label: "Nashik" },
  { value: "Palghar", label: "Palghar" },
  { value: "Parbhani", label: "Parbhani" },
  { value: "Pune", label: "Pune" },
  { value: "Raigad", label: "Raigad" },
  { value: "Ratnagiri", label: "Ratnagiri" },
  { value: "Sangli", label: "Sangli" },
  { value: "Satara", label: "Satara" },
  { value: "Sindhudurg", label: "Sindhudurg" },
  { value: "Solapur", label: "Solapur" },
  { value: "Thane", label: "Thane" },
  { value: "Wardha", label: "Wardha" },
  { value: "Washim", label: "Washim" },
  { value: "Yavatmal", label: "Yavatmal" }
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

// Branch group display name mapping
const BRANCH_DISPLAY_NAME_MAP: Record<string, string> = {
  'CS special': 'CS (AI/DS/ML/IOT/Cyber)',
  'Mechanical/Auto/mechatronix Engineering': 'Mechanical/Automobile Engineering',
};

// Custom branch group order (most popular/demanding at top, less popular at bottom, 'Other' always last)
const BRANCH_ORDER = [
  'Computer Engineering',
  'CS special',
  'Information Technology',
  'Electronics and Telecommunication Engineering',
  'Artificial Intelligence and Data Science/Machine learning',
  'Mechanical/Auto/mechatronix Engineering',
  'Electrical Engineering',
  'Electrical/Electronics +CS',
  'Instrumentation/production Engineering',
  'Civil Engineering',
  'Chemical Engineering',
  'Automation and Robotics',
  'Food Technology',
  'Bio Medical Engineering',
  'Textile Engineering',
  'Other',
];

function sortBranchGroupsCustom(a: string, b: string) {
  const idxA = BRANCH_ORDER.indexOf(a);
  const idxB = BRANCH_ORDER.indexOf(b);
  // If not found, put at end before 'Other'
  const maxIdx = BRANCH_ORDER.length - 1;
  return (idxA === -1 ? maxIdx : idxA) - (idxB === -1 ? maxIdx : idxB);
}

function getBranchDisplayName(group: string) {
  return BRANCH_DISPLAY_NAME_MAP[group] || group;
}

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
    college_district: '',
    district: ''
  });
  const [examType, setExamType] = useState<'CET' | 'JEE'>('CET');
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [predictionCount, setPredictionCount] = useState(() => {
    return parseInt(localStorage.getItem('predictionCount') || '0', 10);
  });
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  useEffect(() => {
    // Fetch standardized branch groups from backend
    axios.get<BranchGroupsResponse>(API_ENDPOINTS.BRANCHES)
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
    if (!formData.college_district) return 'College District is required';
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
          API_ENDPOINTS.PREDICT,
          {
            standardized_branch_ids: selectedBranches,
            percentile: parseFloat(formData.percentile),
            category: formData.category,
            gender: formData.gender,
            college_district: formData.college_district,
            district: formData.district
          },
          {
            headers
          }
        );
      } else {
        // Make JEE prediction request
        response = await axios.post<PredictionResponse>(
          API_ENDPOINTS.PREDICT_JEE,
          {
            standardized_branch_ids: selectedBranches,
            percentile: parseFloat(formData.percentile),
            region: formData.college_district
          },
          {
            headers
          }
        );
      }

      if (response.data.success && response.data.data) {
        setPredictionResults(response.data.data);
        
        if (response.data.data.length === 0) {
          toast({
            title: 'No Results Found',
            description: 'No colleges found for your combination. Try adjusting your percentile, branch selection, or region.',
            variant: 'destructive'
          });
        } else {
          toast({
            title: 'Success',
            description: 'Prediction completed successfully!',
          });
          setShowDisclaimer(true);
        }
        
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

  function downloadPDF(results: CollegePrediction[]) {
    if (!results.length) return;
    
    // Create new PDF document
    const doc = new jsPDF();
    
    // Set initial position
    let yPos = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - (2 * margin);
    
    // Add XLR8 logo
    try {
      // Load and add the XLR8 logo
      const logoUrl = '/xlr8-logo.png';
      doc.addImage(logoUrl, 'PNG', margin, yPos, 30, 30);
      yPos += 35; // Space after logo
    } catch (error) {
      console.log('Logo not loaded, continuing without it');
      yPos += 10;
    }
    
    // Add header with website colors
    doc.setFontSize(24);
    doc.setTextColor(228, 61, 18); // Primary color #E43D12
    doc.text('AI College Buddy', pageWidth / 2, yPos, { align: 'center' });
    
    yPos += 10;
    doc.setFontSize(14);
    doc.setTextColor(214, 83, 109); // Secondary color #D6536D
    doc.text('MHT-CET Navigator - College Prediction Results', pageWidth / 2, yPos, { align: 'center' });
    
    yPos += 20;
    
    // Add summary section with accent color
    doc.setFontSize(16);
    doc.setTextColor(228, 61, 18); // Primary color
    doc.text('Prediction Summary', margin, yPos);
    
    yPos += 10;
    doc.setFontSize(10);
    doc.setTextColor(26, 26, 26); // Dark text #1A1A1A
    
    const summaryData = [
      `Total Colleges Found: ${results.length}`,
      `Exam Type: ${examType}`,
      `Your Percentile: ${formData.percentile}%`,
      `Selected Branches: ${selectedBranches.join(', ')}`,
      `Generated on: ${new Date().toLocaleDateString('en-IN')}`
    ];
    
    summaryData.forEach(line => {
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(line, margin, yPos);
      yPos += 6;
    });
    
    yPos += 10;
    
    // Add college results
    doc.setFontSize(16);
    doc.setTextColor(228, 61, 18); // Primary color
    doc.text('College Predictions', margin, yPos);
    
    yPos += 10;
    
    results.forEach((result, index) => {
      // Check if we need a new page
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }
      
      // College name with primary color
      doc.setFontSize(12);
      doc.setTextColor(228, 61, 18); // Primary color
      doc.setFont(undefined, 'bold');
      doc.text(`${index + 1}. ${result.collegeName}`, margin, yPos);
      
      yPos += 8;
      
      // College details with dark text
      doc.setFontSize(10);
      doc.setTextColor(26, 26, 26); // Dark text
      doc.setFont(undefined, 'normal');
      
      const details = [
        `Branch: ${result.branch}`,
        examType === 'CET' ? `Category: ${result.category}` : null,
        `Cutoff Percentile: ${result.cutoff}%`,
        result.rank !== undefined ? `Rank: ${result.rank}` : null,
        result.seatType ? `Seat Type: ${result.seatType}` : null
      ].filter(Boolean);
      
      details.forEach(detail => {
        if (yPos > 250) {
          doc.addPage();
          yPos = 20;
        }
        doc.text(detail, margin + 5, yPos);
        yPos += 5;
      });
      
      yPos += 8;
      
      // Add separator line with accent color
      if (index < results.length - 1) {
        doc.setDrawColor(255, 162, 182); // Accent color #FFA2B6
        doc.line(margin, yPos, pageWidth - margin, yPos);
        yPos += 5;
      }
    });
    
    // Add footer with tertiary color
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    
    yPos += 10;
    doc.setFontSize(8);
    doc.setTextColor(239, 177, 29); // Tertiary color #EFB11D
    doc.text('Generated by AI College Buddy - Your trusted MHT-CET navigation partner', pageWidth / 2, yPos, { align: 'center' });
    yPos += 5;
    doc.text('For more information, visit: https://aicollegebuddy.vercel.app', pageWidth / 2, yPos, { align: 'center' });
    yPos += 5;
    doc.text('This results are based on previous year data, check the latest information on the official website', pageWidth / 2, yPos, { align: 'center' });
    
    // Save the PDF
    doc.save('college_prediction_results.pdf');
    
    // Show success message
    toast({
      title: 'PDF Downloaded',
      description: 'Your college prediction results have been saved as PDF.',
    });
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
      <Dialog open={showDisclaimer} onOpenChange={setShowDisclaimer}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Disclaimer</DialogTitle>
            <DialogDescription>
              These resultsare based on previous year data. Actual cutoffs and college availability may change each year. Please use this as a guide to understand your options, but always refer to the latest official information and order your college preferences accordingly.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end mt-4">
            <Button onClick={() => setShowDisclaimer(false)}>OK</Button>
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
                  {(() => {
                    // Filter out already selected
                    const available = branchGroups.filter(group => !selectedBranches.includes(group));
                    // Sort by custom order
                    const sorted = available.sort(sortBranchGroupsCustom);
                    return sorted.length === 0 ? (
                      <div className="px-3 py-2 text-muted-foreground">No more branch groups to add</div>
                    ) : (
                      sorted.map(group => (
                        <SelectItem key={group} value={group}>{getBranchDisplayName(group)}</SelectItem>
                      ))
                    );
                  })()}
                </SelectContent>
              </Select>
              {selectedBranches.length > 0 && (
                <ul className="mt-2 flex flex-wrap gap-2">
                  {selectedBranches.map((branch, idx) => (
                    <li key={branch} className="flex items-center gap-1 bg-muted text-foreground rounded px-2 py-1 min-w-0 max-w-xs">
                      <span className="font-medium text-xs">{idx + 1}.</span>
                      <span className="truncate max-w-[120px] text-xs" title={getBranchDisplayName(branch)}>{getBranchDisplayName(branch)}</span>
                      <Button type="button" size="icon" variant="ghost" className="p-1 h-6 w-6" onClick={() => moveBranch(idx, idx - 1)} disabled={idx === 0} aria-label="Move up">
                        <span className="sr-only">Up</span>
                        &uarr;
                      </Button>
                      <Button type="button" size="icon" variant="ghost" className="p-1 h-6 w-6" onClick={() => moveBranch(idx, idx + 1)} disabled={idx === selectedBranches.length - 1} aria-label="Move down">
                        <span className="sr-only">Down</span>
                        &darr;
                      </Button>
                      <Button type="button" size="icon" variant="destructive" className="p-1 h-6 w-6" onClick={() => handleRemoveBranch(idx)} aria-label="Remove">
                        <span className="sr-only">Remove</span>
                        ×
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="college_district">College District</label>
              <Select
                value={formData.college_district}
                onValueChange={(value) => handleChange('college_district', value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select College District" />
                </SelectTrigger>
                <SelectContent>
                  {DISTRICT_OPTIONS.map(option => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
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
                  <label htmlFor="district">Class 12th District</label>
                  <Select
                    value={formData.district}
                    onValueChange={(value) => handleChange('district', value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Class 12 district" />
                    </SelectTrigger>
                    <SelectContent>
                      {CLASS12_DISTRICT_OPTIONS.map(option => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
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
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                <h3 className="text-lg font-semibold m-0">Prediction Results</h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    className="px-3 py-1 h-8 text-sm flex items-center gap-1"
                    variant="outline"
                    onClick={() => downloadCSV(predictionResults)}
                  >
                    <Download size={14} />
                    <span className="hidden sm:inline">Download CSV</span>
                    <span className="sm:hidden">CSV</span>
                  </Button>
                  <Button
                    className="px-3 py-1 h-8 text-sm flex items-center gap-1"
                    variant="outline"
                    onClick={() => downloadPDF(predictionResults)}
                  >
                    <FileText size={14} />
                    <span className="hidden sm:inline">Download PDF</span>
                    <span className="sm:hidden">PDF</span>
                  </Button>
                </div>
              </div>
              <div className="space-y-4">
                {predictionResults.map((result, idx) => (
                  <Card key={idx} className="hover:shadow-md transition">
                    <CardContent className="p-4">
                      <p><b>Branch:</b> {result.branch}</p>
                      <p><b>College:</b> {result.collegeName}</p>
                      {examType === 'CET' && <p><b>Category:</b> {result.category}</p>}
                      <p><b>Cutoff Percentile:</b> {result.cutoff}</p>
                      {result.rank !== undefined && <p><b>Rank:</b> {result.rank}</p>}
                    </CardContent>
                  </Card>
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
