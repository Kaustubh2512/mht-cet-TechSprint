import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Cookies = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-grow container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
      <p className="text-lg max-w-2xl mb-6">We use cookies to enhance your experience and analyze site usage. You can control cookies through your browser settings. By using our site, you consent to our use of cookies.</p>
      <p className="text-lg max-w-2xl">For more information, contact us at <a href="mailto:aicollegebuddy@gmail.com" className="text-primary underline">aicollegebuddy@gmail.com</a>.</p>
    </main>
    <Footer />
  </div>
);

export default Cookies; 