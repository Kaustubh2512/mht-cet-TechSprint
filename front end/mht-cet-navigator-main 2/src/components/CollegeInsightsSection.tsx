
import React from 'react';
import { Button } from "@/components/ui/button";
import { MessageCircle, Eye, Award, Users } from 'lucide-react';

const CollegeInsightsSection = () => {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
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
            <Button variant="outline" className="w-full">Connect Now</Button>
          </div>
          
          <div className="glass-card p-6 rounded-xl card-hover">
            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
              <Eye className="text-secondary w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Hidden College Insights</h3>
            <p className="opacity-80 mb-4">
              Discover the things they don't tell you in brochures: from best hangout spots to professors to seek out, and opportunities that aren't well-advertised.
            </p>
            <Button variant="outline" className="w-full">Explore Insights</Button>
          </div>
          
          <div className="glass-card p-6 rounded-xl card-hover">
            <div className="w-12 h-12 rounded-full bg-tertiary/10 flex items-center justify-center mb-4">
              <Award className="text-tertiary w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Success Stories</h3>
            <p className="opacity-80 mb-4">
              Read success stories from alumni of different colleges. Learn about their journeys, careers, and how their college experience shaped their future.
            </p>
            <Button variant="outline" className="w-full">Read Stories</Button>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <Users className="text-primary w-5 h-5" />
            <span className="text-lg font-medium">Join our community of 5,000+ students and seniors</span>
          </div>
          <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity px-8 py-6 text-lg">
            Get College Insights
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CollegeInsightsSection;
