import React from 'react';
import { Button } from "@/components/ui/button";
import { MessageCircle, Eye, Award, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const CollegeInsightsSection = () => {
  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-tertiary/20 pointer-events-none z-0"></div>
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-primary/10 animate-pulse z-0"></div>
      <div className="absolute bottom-10 right-10 w-16 h-16 rounded-full bg-secondary/10 animate-pulse z-0"></div>
      <div className="absolute top-1/2 left-1/3 w-12 h-12 rounded-full bg-tertiary/10 animate-pulse z-0"></div>
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">College Insights from <span className="gradient-text">Seniors</span></h2>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            Get valuable insights about colleges from seniors who've been there. Like having a big brother or sister to guide you through your admission journey.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="glass-card p-6 rounded-xl card-hover">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <MessageCircle className="text-primary w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Chat with Seniors</h3>
            <p className="opacity-80 mb-4">
              Connect with students who are already studying in your target colleges. Ask them about campus life, professors, and opportunities.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link to="/contact?message=I%20am%20interested%20in%20premium%20features%20and%20would%20like%20to%20connect%20with%20seniors.">Connect Now</Link>
            </Button>
          </div>
          
          <div className="glass-card p-6 rounded-xl card-hover">
            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
              <Eye className="text-secondary w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Hidden College Insights</h3>
            <p className="opacity-80 mb-4">
              Discover the things they don't tell you in brochures: from best hangout spots to professors to seek out, and opportunities that aren't well-advertised.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link to="/insights">Explore Insights</Link>
            </Button>
          </div>
          
          <div className="glass-card p-6 rounded-xl card-hover">
            <div className="w-12 h-12 rounded-full bg-tertiary/10 flex items-center justify-center mb-4">
              <Award className="text-tertiary w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Success Stories</h3>
            <p className="opacity-80 mb-4">
              Read success stories from alumni of different colleges. Learn about their journeys, careers, and how their college experience shaped their future.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link to="/contact?message=I%20am%20interested%20in%20premium%20features%20and%20would%20like%20to%20connect%20with%20seniors.">Read Stories</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollegeInsightsSection;
