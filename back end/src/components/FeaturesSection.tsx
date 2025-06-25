
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const FeaturesSection = () => {
  const features = [
    {
      title: "AI-Powered College Prediction",
      description: "Our advanced algorithm analyzes your scores, preferences, and historical data to predict the best colleges for your profile.",
      icon: (
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
        </div>
      )
    },
    {
      title: "Score to Percentile Converter",
      description: "Quickly convert between marks, percentiles, and ranks to understand where you stand in the competition.",
      icon: (
        <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>
        </div>
      )
    },
    {
      title: "Personalized College List",
      description: "Get a tailored list of colleges based on your preferences for location, branch, and more.",
      icon: (
        <div className="w-12 h-12 rounded-lg bg-tertiary/10 flex items-center justify-center text-tertiary">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10H3"/><path d="M21 6H3"/><path d="M21 14H3"/><path d="M21 18H3"/></svg>
        </div>
      )
    },
    {
      title: "Admission Round Planning",
      description: "Plan your CAP rounds effectively with insights on which colleges to target in each phase.",
      icon: (
        <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent-foreground">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 7v6h-6"/><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"/></svg>
        </div>
      )
    },
    {
      title: "Category & Gender Specific Results",
      description: "Get predictions considering your category and gender for more accurate seat allotment predictions.",
      icon: (
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        </div>
      )
    },
    {
      title: "University Preference Filter",
      description: "Filter results based on your home university and get domicile-specific college recommendations.",
      icon: (
        <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z"/><path d="M20 11V9a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><path d="M22 2 2 22"/></svg>
        </div>
      )
    }
  ];

  return (
    <section className="py-16 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-neutral to-neutral/20 opacity-50"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Smart Features for <span className="gradient-text">Smart Students</span>
          </h2>
          <p className="text-lg opacity-70 max-w-xl mx-auto">
            Our platform is built with cutting-edge tools to help you make informed decisions about your engineering future.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="card-hover border border-neutral/10">
              <CardHeader>
                <div className="flex items-start gap-4">
                  {feature.icon}
                  <div>
                    <CardTitle>{feature.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
