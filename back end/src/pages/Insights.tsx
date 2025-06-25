
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Insights = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto py-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              College <span className="gradient-text">Insights</span>
            </h1>
            <p className="text-lg opacity-70 max-w-2xl mx-auto">
              Get insider knowledge about college culture, faculty, facilities, and student life from experienced seniors.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="mb-8">
              <CardHeader className="text-center">
                <CardTitle>Featured Insight</CardTitle>
                <CardDescription>Exclusive interview with a COEP graduate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white">RK</div>
                    <div>
                      <h3 className="font-semibold">Ravi Kumar</h3>
                      <p className="text-sm opacity-70">Computer Science, Batch of 2022</p>
                    </div>
                  </div>
                  <p className="italic">
                    "The practical exposure I got at COEP was invaluable. The labs are well-equipped, and professors encourage hands-on learning. The campus placement cell is extremely active, bringing top companies. The college culture balances academics and extracurricular activities perfectly."
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Tabs defaultValue="academics" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="academics">Academics</TabsTrigger>
                <TabsTrigger value="campus">Campus Life</TabsTrigger>
                <TabsTrigger value="placements">Placements</TabsTrigger>
              </TabsList>
              
              <TabsContent value="academics" className="space-y-4">
                <InsightCard 
                  title="Faculty Excellence" 
                  content="Most top engineering colleges in Maharashtra have a mix of experienced professors and young faculty with industry experience. The teaching methodology focuses on practical applications alongside theoretical concepts."
                />
                <InsightCard 
                  title="Lab Infrastructure" 
                  content="Colleges like VJTI, COEP, and PICT invest heavily in state-of-the-art laboratories, giving students hands-on experience with the latest technologies and tools used in the industry."
                />
                <InsightCard 
                  title="Research Opportunities" 
                  content="Many colleges have active research cells where undergraduate students can participate in innovative projects, publish papers, and even apply for patents with faculty guidance."
                />
              </TabsContent>
              
              <TabsContent value="campus" className="space-y-4">
                <InsightCard 
                  title="Hostel Life" 
                  content="College hostels vary widely in their facilities. COEP has historic buildings with a vibrant community feel, while newer institutions like MIT-WPU offer modern amenities and comfortable living spaces."
                />
                <InsightCard 
                  title="Cultural Activities" 
                  content="Annual technical and cultural festivals like COEP's MindSpark, VJTI's Technovanza, and PICT's Impulse are massive events that attract participants from across the country."
                />
                <InsightCard 
                  title="Sports Facilities" 
                  content="Most engineering colleges have dedicated sports complexes, with some like COEP even having their own boating clubs. Sports tournaments are regular fixtures in the college calendar."
                />
              </TabsContent>
              
              <TabsContent value="placements" className="space-y-4">
                <InsightCard 
                  title="Placement Statistics" 
                  content="Top colleges consistently achieve 90%+ placement rates for eligible students. Computer Science and IT programs typically see the highest package offers, with average salaries ranging from 8-16 LPA depending on the college."
                />
                <InsightCard 
                  title="Recruiting Companies" 
                  content="Major recruiters include tech giants like Microsoft, Google, and Amazon, along with Indian IT majors like TCS, Infosys, and Wipro. Financial and consulting firms also recruit from top colleges."
                />
                <InsightCard 
                  title="Internship Opportunities" 
                  content="Most colleges have mandatory internship programs in the pre-final year. Placement cells help students secure internships, which often convert to pre-placement offers in the final year."
                />
              </TabsContent>
            </Tabs>
            
            <div className="text-center mt-8">
              <p className="text-lg font-medium mb-4">Want more detailed insights from seniors?</p>
              <div className="glass-card p-6 max-w-md mx-auto">
                <p className="mb-4">Login to access exclusive features:</p>
                <ul className="text-left list-disc list-inside space-y-2 mb-4">
                  <li>Chat with seniors from your target colleges</li>
                  <li>Access hidden college reviews</li>
                  <li>Read success stories and admission journeys</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const InsightCard = ({ title, content }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{content}</p>
      </CardContent>
    </Card>
  );
};

export default Insights;
