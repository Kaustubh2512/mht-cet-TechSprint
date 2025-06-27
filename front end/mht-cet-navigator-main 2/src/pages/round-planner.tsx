import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const RoundPlanner = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center py-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Admission Round Planner</h1>
        <p className="text-lg opacity-70 mb-8 text-center max-w-xl">
          This tool will help you plan your CAP rounds and preferences for better admission outcomes.<br />
          <span className="font-semibold text-primary">Coming Soon!</span>
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default RoundPlanner; 