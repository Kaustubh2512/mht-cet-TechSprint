
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Colleges = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto py-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Top <span className="gradient-text">Colleges</span>
            </h1>
            <p className="text-lg opacity-70 max-w-2xl mx-auto">
              Explore the best engineering colleges in Maharashtra across different cities and specializations.
            </p>
          </div>
          
          <Tabs defaultValue="pune" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="pune">Pune</TabsTrigger>
              <TabsTrigger value="mumbai">Mumbai</TabsTrigger>
            </TabsList>
            
            <TabsContent value="pune">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {puneColleges.map((college) => (
                  <CollegeCard key={college.name} college={college} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="mumbai">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mumbaiColleges.map((college) => (
                  <CollegeCard key={college.name} college={college} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const CollegeCard = ({ college }) => {
  return (
    <Card className="card-hover">
      <CardHeader>
        <CardTitle>{college.name}</CardTitle>
        <CardDescription>{college.location}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p><strong>NIRF Rank:</strong> {college.rank}</p>
          <p><strong>Top Branches:</strong> {college.topBranches.join(', ')}</p>
          <p><strong>Avg. Placement:</strong> {college.avgPlacement}</p>
          <p><strong>Cutoff Range:</strong> {college.cutoffRange}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const puneColleges = [
  {
    name: "College of Engineering, Pune (COEP)",
    location: "Shivajinagar, Pune",
    rank: 4,
    topBranches: ["Computer Science", "Mechanical", "Electronics"],
    avgPlacement: "12.5 LPA",
    cutoffRange: "99.8 - 97.5 percentile"
  },
  {
    name: "Pune Institute of Computer Technology (PICT)",
    location: "Dhankawadi, Pune",
    rank: 9,
    topBranches: ["Computer Science", "IT", "Electronics"],
    avgPlacement: "10.2 LPA",
    cutoffRange: "99.5 - 95.2 percentile"
  },
  {
    name: "Vishwakarma Institute of Technology (VIT)",
    location: "Upper Indiranagar, Pune",
    rank: 12,
    topBranches: ["Computer Science", "IT", "AI & DS"],
    avgPlacement: "9.8 LPA",
    cutoffRange: "99.3 - 93.8 percentile"
  },
];

const mumbaiColleges = [
  {
    name: "Veermata Jijabai Technological Institute (VJTI)",
    location: "Matunga, Mumbai",
    rank: 2,
    topBranches: ["Computer Science", "Electronics", "Mechanical"],
    avgPlacement: "16.8 LPA",
    cutoffRange: "99.9 - 98.2 percentile"
  },
  {
    name: "Sardar Patel Institute of Technology (SPIT)",
    location: "Andheri, Mumbai",
    rank: 6,
    topBranches: ["Computer Science", "IT", "Electronics"],
    avgPlacement: "14.5 LPA",
    cutoffRange: "99.7 - 96.8 percentile"
  },
  {
    name: "K. J. Somaiya College of Engineering",
    location: "Vidyavihar, Mumbai",
    rank: 14,
    topBranches: ["Computer Science", "IT", "Chemical"],
    avgPlacement: "11.2 LPA",
    cutoffRange: "99.1 - 92.6 percentile"
  },
];

export default Colleges;
