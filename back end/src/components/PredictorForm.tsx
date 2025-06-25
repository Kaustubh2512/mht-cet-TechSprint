
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const PredictorForm = () => {
  return (
    <section className="py-16" id="predictor">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            AI College <span className="gradient-text">Predictor</span>
          </h2>
          <p className="text-lg opacity-70 max-w-xl mx-auto">
            Enter your details below to get personalized college predictions based on your MHT-CET performance.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Card className="border border-neutral/10 shadow-lg">
            <CardHeader>
              <CardTitle>College Predictor</CardTitle>
              <CardDescription>
                Our AI algorithm will analyze your details to predict the best colleges for you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="marks" className="w-full">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="marks">MHT-CET Marks</TabsTrigger>
                  <TabsTrigger value="percentile">Percentile</TabsTrigger>
                  <TabsTrigger value="rank">Rank</TabsTrigger>
                </TabsList>
                
                <TabsContent value="marks" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="marks">MHT-CET Marks (Out of 200)</Label>
                      <Input id="marks" type="number" placeholder="Enter your marks" />
                    </div>
                    <div className="space-y-2">
                      <Label>Branch Preference</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select branch" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cs">Computer Science</SelectItem>
                          <SelectItem value="it">Information Technology</SelectItem>
                          <SelectItem value="entc">Electronics & Telecom</SelectItem>
                          <SelectItem value="mech">Mechanical Engineering</SelectItem>
                          <SelectItem value="civil">Civil Engineering</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="percentile" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="percentile">MHT-CET Percentile</Label>
                      <Input id="percentile" type="number" placeholder="Enter your percentile" />
                    </div>
                    <div className="space-y-2">
                      <Label>Branch Preference</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select branch" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cs">Computer Science</SelectItem>
                          <SelectItem value="it">Information Technology</SelectItem>
                          <SelectItem value="entc">Electronics & Telecom</SelectItem>
                          <SelectItem value="mech">Mechanical Engineering</SelectItem>
                          <SelectItem value="civil">Civil Engineering</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="rank" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="rank">MHT-CET Rank</Label>
                      <Input id="rank" type="number" placeholder="Enter your rank" />
                    </div>
                    <div className="space-y-2">
                      <Label>Branch Preference</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select branch" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cs">Computer Science</SelectItem>
                          <SelectItem value="it">Information Technology</SelectItem>
                          <SelectItem value="entc">Electronics & Telecom</SelectItem>
                          <SelectItem value="mech">Mechanical Engineering</SelectItem>
                          <SelectItem value="civil">Civil Engineering</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="obc">OBC</SelectItem>
                        <SelectItem value="sc">SC</SelectItem>
                        <SelectItem value="st">ST</SelectItem>
                        <SelectItem value="ews">EWS</SelectItem>
                        <SelectItem value="vjnt">VJNT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <Label>Home University</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select university" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mumbai">Mumbai University</SelectItem>
                        <SelectItem value="pune">Pune University</SelectItem>
                        <SelectItem value="nagpur">Nagpur University</SelectItem>
                        <SelectItem value="aurangabad">Aurangabad University</SelectItem>
                        <SelectItem value="amravati">Amravati University</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Domicile</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select domicile" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mh">Maharashtra</SelectItem>
                        <SelectItem value="non-mh">Non-Maharashtra</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2 mt-4">
                  <Label>Admission Round</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select round" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cap1">CAP Round I</SelectItem>
                      <SelectItem value="cap2">CAP Round II</SelectItem>
                      <SelectItem value="cap3">CAP Round III</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button className="w-full mt-6 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity py-6 text-lg">
                  Predict My Colleges
                </Button>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PredictorForm;
