import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Privacy = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-grow container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-lg max-w-2xl mb-6">We respect your privacy. Your data is never sold or shared with third parties. All information is used solely to provide you with personalized college recommendations and improve our services.</p>
      <p className="text-lg max-w-2xl">If you have any questions about our privacy practices, please contact us at <a href="mailto:aicollegebuddy@gmail.com" className="text-primary underline">aicollegebuddy@gmail.com</a>.</p>
    </main>
    <Footer />
  </div>
);

export default Privacy; 