import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import CollegeInsightsSection from '@/components/CollegeInsightsSection';
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
        <section className="py-16 bg-gradient-to-b from-background to-accent/10 relative overflow-hidden">
          {/* Cool animated SVG background */}
          <svg className="absolute inset-0 w-full h-full z-0 animate-float" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg" style={{pointerEvents: 'none'}}>
            <circle cx="150" cy="120" r="60" fill="url(#grad1)" fillOpacity="0.18">
              <animate attributeName="cy" values="120;180;120" dur="8s" repeatCount="indefinite" />
            </circle>
            <rect x="600" y="60" width="90" height="90" rx="30" fill="url(#grad2)" fillOpacity="0.13">
              <animate attributeName="y" values="60;120;60" dur="10s" repeatCount="indefinite" />
            </rect>
            <ellipse cx="400" cy="350" rx="70" ry="30" fill="url(#grad3)" fillOpacity="0.10">
              <animate attributeName="cx" values="400;500;400" dur="12s" repeatCount="indefinite" />
            </ellipse>
            <defs>
              <linearGradient id="grad1" x1="90" y1="60" x2="210" y2="180" gradientUnits="userSpaceOnUse">
                <stop stopColor="#D6536D" />
                <stop offset="1" stopColor="#F7B801" />
              </linearGradient>
              <linearGradient id="grad2" x1="600" y1="60" x2="690" y2="150" gradientUnits="userSpaceOnUse">
                <stop stopColor="#3B82F6" />
                <stop offset="1" stopColor="#F7B801" />
              </linearGradient>
              <linearGradient id="grad3" x1="330" y1="350" x2="470" y2="380" gradientUnits="userSpaceOnUse">
                <stop stopColor="#A78BFA" />
                <stop offset="1" stopColor="#F7B801" />
              </linearGradient>
            </defs>
          </svg>
          <div className="container mx-auto text-center relative z-10">
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
                className="h-56 max-h-56 min-h-[180px] p-6 flex flex-col items-center gap-4 card-hover overflow-hidden"
              >
                <Link to="/predictor">
                  <Search className="h-10 w-10 text-primary" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">College Predictor</h3>
                    <p className="text-sm opacity-70 break-words whitespace-normal text-ellipsis overflow-hidden">Get personalized college recommendations based on your scores and preferences</p>
                  </div>
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline" 
                className="h-56 max-h-56 min-h-[180px] p-6 flex flex-col items-center gap-4 card-hover overflow-hidden"
              >
                <Link to="/colleges">
                  <GraduationCap className="h-10 w-10 text-primary" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Top Colleges</h3>
                    <p className="text-sm opacity-70 break-words whitespace-normal text-ellipsis overflow-hidden">Explore top engineering colleges in Pune, Mumbai and across Maharashtra</p>
                  </div>
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline" 
                className="h-56 max-h-56 min-h-[180px] p-6 flex flex-col items-center gap-4 card-hover overflow-hidden"
              >
                <Link to="/resources">
                  <BookOpen className="h-10 w-10 text-primary" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Resources</h3>
                    <p className="text-sm opacity-70 break-words whitespace-normal text-ellipsis overflow-hidden">Access MHT-CET study materials, past papers, and admission guidance</p>
                  </div>
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-8">
              <Button 
                asChild
                variant="outline" 
                className="h-56 max-h-56 min-h-[180px] p-6 flex flex-col items-center gap-4 card-hover overflow-hidden"
              >
                <Link to="/insights">
                  <BarChart className="h-10 w-10 text-primary" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">College Insights</h3>
                    <p className="text-sm opacity-70 break-words whitespace-normal text-ellipsis overflow-hidden">Get insider knowledge about college culture, faculty, and facilities</p>
                  </div>
                </Link>
              </Button>
              <Button 
                variant="outline" 
                className="h-56 max-h-56 min-h-[180px] p-6 flex flex-col items-center gap-4 card-hover relative"
              >
                <div className="absolute -top-2 -right-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
                  Premium
                </div>
                <MessageSquare className="h-10 w-10 text-primary" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Chat with Seniors</h3>
                  <p className="text-sm opacity-70 text-foreground break-words whitespace-normal text-ellipsis overflow-hidden">Connect with current students and alumni from your target colleges</p>
                </div>
              </Button>
            </div>
          </div>
        </section>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-neutral to-neutral/20 opacity-50"></div>
          <FeaturesSection />
        </div>
        <CollegeInsightsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
