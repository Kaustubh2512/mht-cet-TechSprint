import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Link as LinkIcon, Calculator, BookOpen, HelpCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Resources = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto py-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              MHT-CET <span className="gradient-text">Resources</span>
            </h1>
            <p className="text-lg opacity-70 max-w-2xl mx-auto">
              Everything you need to prepare for MHT-CET and navigate the admission process successfully.
            </p>
          </div>
          
          <Tabs defaultValue="syllabus" className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-8">
              <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
              <TabsTrigger value="materials">Study Materials</TabsTrigger>
              <TabsTrigger value="tools">Helpful Tools</TabsTrigger>
              <TabsTrigger value="faqs">FAQs</TabsTrigger>
            </TabsList>
            
            <TabsContent value="syllabus">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ResourceCard
                  icon={<FileText className="h-8 w-8 text-primary" />}
                  title="MHT-CET 2024 Syllabus"
                  description="Detailed syllabus for Physics, Chemistry and Mathematics"
                  link="https://cetcell.mahacet.org/"
                />
                <ResourceCard
                  icon={<FileText className="h-8 w-8 text-primary" />}
                  title="Important Topics"
                  description="High-weightage topics to focus on for optimal preparation"
                  link="#"
                />
                <ResourceCard
                  icon={<FileText className="h-8 w-8 text-primary" />}
                  title="Exam Pattern"
                  description="MCQ format, marking scheme, and time duration details"
                  link="#"
                />
                <ResourceCard
                  icon={<FileText className="h-8 w-8 text-primary" />}
                  title="Previous Year Analysis"
                  description="Topic-wise distribution of questions from past papers"
                  link="#"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="materials">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ResourceCard
                  icon={<BookOpen className="h-8 w-8 text-primary" />}
                  title="Free Study Materials"
                  description="Downloadable PDFs for all MHT-CET subjects"
                  link="#"
                />
                <ResourceCard
                  icon={<BookOpen className="h-8 w-8 text-primary" />}
                  title="Previous Year Papers"
                  description="Last 10 years' question papers with solutions"
                  link="#"
                />
                <ResourceCard
                  icon={<BookOpen className="h-8 w-8 text-primary" />}
                  title="Formula Sheets"
                  description="Quick reference sheets for Physics, Chemistry, and Mathematics"
                  link="#"
                />
                <ResourceCard
                  icon={<BookOpen className="h-8 w-8 text-primary" />}
                  title="Video Lectures"
                  description="Curated playlist of video resources for difficult topics"
                  link="#"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="tools">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ResourceCard
                  icon={<Calculator className="h-8 w-8 text-primary" />}
                  title="Score to Percentile Calculator"
                  description="Convert your raw score to expected percentile based on past data"
                  link="#"
                />
                <ResourceCard
                  icon={<Calculator className="h-8 w-8 text-primary" />}
                  title="CAP Round Simulator"
                  description="Simulate different CAP round scenarios to plan your admissions"
                  link="#"
                />
                <ResourceCard
                  icon={<LinkIcon className="h-8 w-8 text-primary" />}
                  title="Official MHT-CET Website"
                  description="Direct link to the official government portal for updates"
                  link="https://cetcell.mahacet.org/"
                />
                <ResourceCard
                  icon={<LinkIcon className="h-8 w-8 text-primary" />}
                  title="DTE Maharashtra"
                  description="Directorate of Technical Education website for admission info"
                  link="https://dte.maharashtra.gov.in/"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="faqs">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="h-6 w-6 text-primary" />
                    Frequently Asked Questions
                  </CardTitle>
                  <CardDescription>Common questions about MHT-CET and engineering admissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>What is MHT-CET?</AccordionTrigger>
                      <AccordionContent>
                        MHT-CET (Maharashtra Common Entrance Test) is a state-level entrance examination conducted by the State Common Entrance Test Cell, Maharashtra. It's the primary entrance exam for admission to engineering and pharmacy courses in colleges across Maharashtra.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-2">
                      <AccordionTrigger>How is the MHT-CET score calculated?</AccordionTrigger>
                      <AccordionContent>
                        MHT-CET score is calculated based on the number of correct and incorrect answers. Each correct answer fetches 2 marks, while there's no negative marking. The total marks are then converted to percentile based on your performance relative to other candidates.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-3">
                      <AccordionTrigger>What are CAP rounds?</AccordionTrigger>
                      <AccordionContent>
                        CAP (Centralized Admission Process) rounds are the official admission rounds conducted by DTE Maharashtra after the MHT-CET results. Usually, there are 3 CAP rounds where students can fill their college preferences, and seats are allocated based on merit ranks, category reservations, and preferences.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-4">
                      <AccordionTrigger>How does Home University quota work?</AccordionTrigger>
                      <AccordionContent>
                        The Home University quota reserves 70% of seats in a college for students who have completed their qualifying examination (HSC/12th) from the same university area. The remaining 30% seats fall under Other Than Home University (OTHU) quota, available to students from other university areas within Maharashtra.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-5">
                      <AccordionTrigger>What documents are required for MHT-CET counseling?</AccordionTrigger>
                      <AccordionContent>
                        Documents required include MHT-CET scorecard, 10th and 12th marksheets, domicile certificate, category certificate (if applicable), income certificate (if applicable), Aadhaar card, passport-sized photographs, and other certificates as specified in the official notification.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-6">
                      <AccordionTrigger>How can I check which college I can get with my percentile?</AccordionTrigger>
                      <AccordionContent>
                        You can use our AI College Predictor tool to get personalized college predictions based on your percentile, category, gender, and other factors. Alternatively, you can check the previous year's cutoff data available on the DTE Maharashtra website.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="mt-16">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">Our AI-Powered Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle>Score to Percentile Converter</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-black dark:text-white">Our AI model analyzes historical MHT-CET data to accurately convert your raw score to expected percentile, helping you gauge your position among other candidates.</p>
                </CardContent>
              </Card>
              
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle>Personalized College List</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-black dark:text-white">Get a tailored list of colleges based on your preferences for location, branch, facilities, and many other factors combined with your expected rank.</p>
                </CardContent>
              </Card>
              
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle>Admission Round Planning</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-black dark:text-white">Our AI assistant helps you plan your CAP rounds strategically by analyzing past cutoff trends and suggesting the best preference order for your choices.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const ResourceCard = ({ icon, title, description, link }) => {
  return (
    <Card className="card-hover">
      <CardHeader className="flex flex-row items-center gap-4">
        {icon}
        <div>
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center text-primary hover:underline"
        >
          Access Resource <LinkIcon className="ml-2 h-4 w-4" />
        </a>
      </CardContent>
    </Card>
  );
};

export default Resources;
