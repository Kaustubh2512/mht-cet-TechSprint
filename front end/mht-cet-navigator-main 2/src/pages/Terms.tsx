import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Terms = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-grow container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
      <p className="text-lg max-w-2xl mb-6">By using AI College Buddy, you agree to use the platform for personal, non-commercial purposes only. We strive for accuracy, but cannot guarantee the completeness or correctness of all information. Use at your own discretion.</p>
      <p className="text-lg max-w-2xl">For questions about these terms, contact us at <a href="mailto:aicollegebuddy@gmail.com" className="text-primary underline">aicollegebuddy@gmail.com</a>.</p>
    </main>
    <Footer />
  </div>
);

export default Terms; 