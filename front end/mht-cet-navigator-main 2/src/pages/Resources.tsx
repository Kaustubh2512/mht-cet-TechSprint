import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Link as LinkIcon, Calculator, BookOpen, HelpCircle, Code, User, Wrench, Youtube, Globe, Home, BarChart, Calendar } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from 'react-router-dom';

const Resources = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto py-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
               <span className="gradient-text">Engineering Admission Resources</span>
            </h1>
            <p className="text-lg opacity-70 max-w-2xl mx-auto">
              Curated resources for engineering entrance exams, college admissions, skill-building, and career preparation—all in one place.
            </p>
          </div>
          
          <Tabs defaultValue="syllabus" className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="syllabus">IMPs</TabsTrigger>
              <TabsTrigger value="materials">Study Materials</TabsTrigger>
              <TabsTrigger value="tools">Helpful Tools</TabsTrigger>
            </TabsList>
            
            <TabsContent value="syllabus">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ResourceCard
                  icon={<Globe className="h-8 w-8 text-primary" />}
                  title="CET CELL WEBSITE"
                  description="Official CET CELL portal for updates, notifications, and syllabus"
                  link="https://cetcell.mahacet.org/"
                />
                <ResourceCard
                  icon={<Home className="h-8 w-8 text-primary" />}
                  title="Admission Website"
                  description="Official portal for MHT-CET engineering admissions, schedules, and notifications."
                  link="https://fe2025.mahacet.org/StaticPages/HomePage"
                />
                <ResourceCard
                  icon={<FileText className="h-8 w-8 text-primary" />}
                  title="Admission Circular"
                  description="Latest official admission circular and notices for MHT-CET engineering admissions."
                  link="https://fe2025.mahacet.org/ViewPublicDocument?MenuId=9734"
                />
                <ResourceCard
                  icon={<BarChart className="h-8 w-8 text-primary" />}
                  title="Previous Year Cutoff & Seat Matrix"
                  description="Download previous years' cutoff and seat matrix PDFs for all CAP rounds."
                  link="https://drive.google.com/drive/folders/1zwkkL6dptN6j1678p_Z44TDF1EYvoRwO?usp=drive_link"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="materials">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ResourceCard
                  icon={<Code className="h-8 w-8 text-primary" />}
                  title="Basic Programming Resources"
                  description="Curated beginner-friendly coding tutorials, notes, and practice problems for students."
                  link="https://drive.google.com/drive/folders/1mlOGJCVd9_-JID84KXjnU_TpY9vpUAH9?usp=drive_link"
                />
                <ResourceCard
                  icon={<User className="h-8 w-8 text-primary" />}
                  title="Soft Skills & Interview Prep"
                  description="Guides and resources to help you prepare for interviews, build your resume, and improve communication skills."
                  link="https://drive.google.com/drive/folders/1UGxP9voguUAoK7lCtZnSW6a8W-D7-3uC?usp=drive_link"
                />
                <ResourceCard
                  icon={<Wrench className="h-8 w-8 text-primary" />}
                  title="Core Branch Starter Pack"
                  description="Essential tools, project ideas, and foundational learning resources for Core Branch students"
                  link="https://drive.google.com/drive/folders/10RHGd5m6s_O5Agy_Gi2y5O0J0PmN1ram?usp=drive_link"
                />
                <ResourceCard
                  icon={<Youtube className="h-8 w-8 text-primary" />}
                  title="freeCodeCamp Channel"
                  description="Top YouTube channel for learning programming and tech for free."
                  link="https://www.youtube.com/@freecodecamp"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="tools">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ResourceCard
                  icon={<Calendar className="h-8 w-8 text-primary" />}
                  title="Admission Schedule"
                  description="The official admission schedule will be updated soon. Please check back later for the latest dates."
                  link="https://fe2025.mahacet.org/StaticPages/HomePage"
                />
                <ResourceCard
                  icon={<Calculator className="h-8 w-8 text-primary" />}
                  title="CAP Round Simulator"
                  description="Simulate different CAP round scenarios to plan your admissions"
                  link="/cap-simulator"
                />
                <ResourceCard
                  icon={<LinkIcon className="h-8 w-8 text-primary" />}
                  title="Admission Round Planner"
                  description="Plan your CAP rounds and preferences for better outcomes."
                  link="/round-planner"
                />
                <ResourceCard
                  icon={<BookOpen className="h-8 w-8 text-primary" />}
                  title="Scholarship Finder"
                  description="Discover scholarships for engineering students in Maharashtra and across India."
                  link="https://scholarships.gov.in/"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const ResourceCard = ({ icon, title, description, link }) => {
  const isInternal = link.startsWith('/');
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
        {isInternal ? (
          <Link 
            to={link}
            className="inline-flex items-center text-primary hover:underline"
          >
            Access Resource <LinkIcon className="ml-2 h-4 w-4" />
          </Link>
        ) : (
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center text-primary hover:underline"
          >
            Access Resource <LinkIcon className="ml-2 h-4 w-4" />
          </a>
        )}
      </CardContent>
    </Card>
  );
};

export default Resources;
