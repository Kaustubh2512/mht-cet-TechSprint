
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CtaSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-tertiary/20"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-primary/10 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-16 h-16 rounded-full bg-secondary/10 animate-pulse"></div>
      <div className="absolute top-1/2 left-1/3 w-12 h-12 rounded-full bg-tertiary/10 animate-pulse"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center bg-white/70 backdrop-blur-sm p-10 rounded-2xl shadow-lg">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Find Your <span className="gradient-text">Dream College?</span>
          </h2>
          <p className="text-lg mb-8">
            Don't leave your engineering future to chance. Use our AI-powered predictor to find the perfect college that matches your scores and preferences.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity px-8 py-6 text-lg">
              <Link to="/predictor">Try College Predictor Now</Link>
            </Button>
            <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10 px-8 py-6 text-lg">
              <Link to="/resources">Explore Resources</Link>
            </Button>
          </div>
          <p className="text-sm mt-6 text-black font-medium">
            Join thousands of students who made informed decisions about their engineering careers with MHT-CET Navigator.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
