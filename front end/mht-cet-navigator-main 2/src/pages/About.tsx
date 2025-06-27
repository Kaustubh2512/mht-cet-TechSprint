import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const About = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-grow container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-4">About Us</h1>
      <p className="text-lg mb-6 max-w-2xl">
        Welcome to AI College Buddy! We are Team XLR8, a group of passionate engineering students who faced the same confusion that thousands of MHT-CET aspirants go through every year—What colleges can I get? What were the actual cutoffs? How should I fill my preference list?
      </p>
      <p className="text-lg mb-6 max-w-2xl">
        What started as our first hackathon project soon turned into a mission. We realized this wasn't just a coding challenge—it was a real problem we had faced ourselves just a year ago during admissions. So, we decided to build the solution we wished we had.
      </p>
      <p className="text-lg mb-6 max-w-2xl">
        Our goal is to make the MHT-CET admission process simpler, smarter, and more transparent using real data and AI-powered insights. Whether you're figuring out your chances or building a solid preference list, AI College Buddy is here to help.
      </p>
      <p className="text-lg max-w-2xl">
        Built by students, for students—with <span role="img" aria-label="heart">❤️</span>, we hope this platform makes your college journey smoother and more confident.
      </p>
    </main>
    <Footer />
  </div>
);

export default About; 