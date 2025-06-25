
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import CollegeInsightsSection from '@/components/CollegeInsightsSection';
import CtaSection from '@/components/CtaSection';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, GraduationCap, BookOpen, BarChart, MessageSquare } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        
        <section className="py-16 bg-gradient-to-b from-background to-accent/10">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Your Complete MHT-CET <span className="gradient-text">Navigator</span>
            </h2>
            <p className="text-lg opacity-70 max-w-2xl mx-auto mb-12">
              Let our AI-powered platform guide you through every stage of your engineering college journey.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Button 
                asChild
                variant="outline" 
                className="h-auto p-6 flex flex-col items-center gap-4 card-hover"
              >
                <Link to="/predictor">
                  <Search className="h-10 w-10 text-primary" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">College Predictor</h3>
                    <p className="text-sm opacity-70">Get personalized college recommendations based on your scores and preferences</p>
                  </div>
                </Link>
              </Button>
              
              <Button 
                asChild
                variant="outline" 
                className="h-auto p-6 flex flex-col items-center gap-4 card-hover"
              >
                <Link to="/colleges">
                  <GraduationCap className="h-10 w-10 text-primary" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Top Colleges</h3>
                    <p className="text-sm opacity-70">Explore top engineering colleges in Pune, Mumbai and across Maharashtra</p>
                  </div>
                </Link>
              </Button>
              
              <Button 
                asChild
                variant="outline" 
                className="h-auto p-6 flex flex-col items-center gap-4 card-hover"
              >
                <Link to="/resources">
                  <BookOpen className="h-10 w-10 text-primary" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Resources</h3>
                    <p className="text-sm opacity-70">Access MHT-CET study materials, past papers, and admission guidance</p>
                  </div>
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-8">
              <Button 
                asChild
                variant="outline" 
                className="h-auto p-6 flex flex-col items-center gap-4 card-hover"
              >
                <Link to="/insights">
                  <BarChart className="h-10 w-10 text-primary" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">College Insights</h3>
                    <p className="text-sm opacity-70">Get insider knowledge about college culture, faculty, and facilities</p>
                  </div>
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-auto p-6 flex flex-col items-center gap-4 card-hover relative"
              >
                <div className="absolute -top-2 -right-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
                  Premium
                </div>
                <MessageSquare className="h-10 w-10 text-primary" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Chat with Seniors</h3>
                  <p className="text-sm opacity-70 text-black">Connect with current students and alumni from your target colleges</p>
                </div>
              </Button>
            </div>
          </div>
        </section>
        
        <CollegeInsightsSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
