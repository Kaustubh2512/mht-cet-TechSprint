import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CollegeInfoCentre from '../components/CollegeInfoCentre';
import CollegeMap from '../components/CollegeMap';

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

          <CollegeInfoCentre />

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">College Locations</h2>
            <CollegeMap colleges={[...puneColleges, ...mumbaiColleges]} />
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
          {college.rank !== undefined && <p><strong>NIRF Rank:</strong> {college.rank}</p>}
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
    rank: 77,
    topBranches: ["Computer Science", "Mechanical", "Electronics"],
    avgPlacement: "12-17 LPA",
    cutoffRange: "99.99 - 97.5 percentile",
    lat: 18.5293,
    lng: 73.8565
  },
  {
    name: "Pune Institute of Computer Technology (PICT)",
    location: "Dhankawadi, Pune",
    topBranches: ["Computer Science", "IT", "Electronics"],
    avgPlacement: "10.2 LPA",
    cutoffRange: "99.8 - 95.2 percentile",
    lat: 18.4575,
    lng: 73.8508
  },
  {
    name: "Vishwakarma Institute of Technology (VIT)",
    location: "Upper Indiranagar, Pune",
    topBranches: ["Computer Science", "IT", "AI & DS"],
    avgPlacement: "9.8 LPA",
    cutoffRange: "99.7 - 93.8 percentile",
    lat: 18.4636,
    lng: 73.8682
  },
];

const mumbaiColleges = [
  {
    name: "Veermata Jijabai Technological Institute (VJTI)",
    location: "Matunga, Mumbai",
    topBranches: ["Computer Science", "Electronics", "Mechanical"],
    avgPlacement: "16.8 LPA",
    cutoffRange: "99.9 - 98.2 percentile",
    lat: 19.0222,
    lng: 72.8561
  },
  {
    name: "Sardar Patel Institute of Technology (SPIT)",
    location: "Andheri, Mumbai",
    topBranches: ["Computer Science", "IT", "Electronics"],
    avgPlacement: "14.5 LPA",
    cutoffRange: "99.7 - 96.8 percentile",
    lat: 19.1233,
    lng: 72.8361
  },
  {
    name: "K. J. Somaiya College of Engineering",
    location: "Vidyavihar, Mumbai",
    topBranches: ["Computer Science", "IT", "Chemical"],
    avgPlacement: "11.2 LPA",
    cutoffRange: "99.1 - 92.6 percentile",
    lat: 19.0732,
    lng: 72.8997
  },
];

export default Colleges;
