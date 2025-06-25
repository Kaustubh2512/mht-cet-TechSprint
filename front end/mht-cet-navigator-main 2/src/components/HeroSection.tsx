
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import FloatingObjects from './FloatingObjects';

const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center pt-10 pb-20 overflow-hidden">
      <FloatingObjects />
      
      <div className="container mx-auto grid md:grid-cols-2 gap-10 items-center relative z-10">
        <div className="flex flex-col gap-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Find Your Perfect <span className="gradient-text">Engineering College</span> with MHT-CET Navigator
          </h1>
          
          <p className="text-lg opacity-80 max-w-xl mx-auto md:mx-0">
            A smart AI-powered platform that helps MHT-CET aspirants predict their ideal college based on scores, preferences, and admission criteria.
          </p>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
            <Button asChild className="bg-gradient-to-r from-primary to-secondary text-neutral hover:opacity-90 transition-opacity px-8 py-6 text-lg">
              <Link to="/predictor">Try College Predictor</Link>
            </Button>
            <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10 px-8 py-6 text-lg">
              <Link to="/resources">Explore Resources</Link>
            </Button>
          </div>
          
          <div className="flex items-center justify-center md:justify-start gap-6 mt-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`w-10 h-10 rounded-full border-2 border-neutral bg-accent-${i % 2 ? 'foreground' : 'DEFAULT'} flex items-center justify-center`}>
                  <span className="text-xs font-bold">{i}</span>
                </div>
              ))}
            </div>
            <p className="text-sm opacity-80">Trusted by 2000+ students</p>
          </div>
        </div>
        
        <div className="relative h-[450px] w-full max-w-md mx-auto">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-tertiary/20 rounded-2xl transform rotate-3 scale-95"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-secondary/20 to-tertiary/20 rounded-2xl transform -rotate-3 scale-95"></div>
          
          <div className="relative h-full w-full glass-card rounded-2xl p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold">College Predictor</h3>
                <p className="text-sm opacity-70">Find your perfect match!</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-tertiary flex items-center justify-center">
                <span className="font-bold">AI</span>
              </div>
            </div>
            
            <div className="space-y-4 my-6">
              <div className="bg-neutral/50 p-3 rounded-lg">
                <p className="text-sm font-medium">Your CET Score</p>
                <p className="text-lg font-bold">168/200</p>
              </div>
              
              <div className="bg-neutral/50 p-3 rounded-lg">
                <p className="text-sm font-medium">Preferred Branch</p>
                <p className="text-lg font-bold">Computer Engineering</p>
              </div>
              
              <div className="bg-neutral/50 p-3 rounded-lg">
                <p className="text-sm font-medium">Predicted Colleges</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  <span className="text-xs bg-primary/20 px-2 py-1 rounded-full">VJTI Mumbai</span>
                  <span className="text-xs bg-secondary/20 px-2 py-1 rounded-full">COEP Pune</span>
                  <span className="text-xs bg-tertiary/20 px-2 py-1 rounded-full">PICT Pune</span>
                </div>
              </div>
            </div>
            
            <Button asChild className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
              <Link to="/predictor">Get Full Prediction</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
