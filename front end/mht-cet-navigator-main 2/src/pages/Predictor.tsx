
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PredictorForm from '@/components/PredictorForm';

const Predictor = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto py-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              College <span className="gradient-text">Predictor</span>
            </h1>
            <p className="text-lg opacity-70 max-w-2xl mx-auto">
              Get accurate predictions for MHT-CET college admissions based on your scores, preferences, and demographics.
            </p>
          </div>
          
          <PredictorForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Predictor;
