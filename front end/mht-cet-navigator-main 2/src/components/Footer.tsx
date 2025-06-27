import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-neutral-800 text-foreground py-3 border-t border-neutral-300 dark:border-neutral-700">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {/* Logo & Description */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <span className="text-neutral font-bold text-lg">A</span>
              </div>
              <h2 className="text-lg font-bold">AI College Buddy</h2>
            </div>
            <p className="text-neutral-300 text-base max-w-xs text-center md:text-left">
              Your one-stop solution for MHT-CET college predictions and engineering admissions guidance in Maharashtra.
            </p>
          </div>

          {/* Quick Links - Split into 2 columns, without Home */}
          <div className="flex flex-col items-center">
            <h3 className="font-semibold mb-1 text-xl">Quick Links</h3>
            <div className="flex flex-row gap-12">
              <ul className="space-y-1 text-center text-lg">
                <li><Link to="/" className="text-neutral-300 hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/about" className="text-neutral-300 hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/predictor" className="text-neutral-300 hover:text-white transition-colors">College Predictor</Link></li>
                <li><Link to="/resources" className="text-neutral-300 hover:text-white transition-colors">Resources</Link></li>
              </ul>
              <ul className="space-y-1 text-center text-lg">
                <li><Link to="/colleges" className="text-neutral-300 hover:text-white transition-colors">Top Colleges</Link></li>
                <li><Link to="/insights" className="text-neutral-300 hover:text-white transition-colors">Insights</Link></li>
                <li><Link to="/contact" className="text-neutral-300 hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link to="/faq" className="text-neutral-300 hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>
          </div>

          {/* Contact Us */}
          <div className="flex flex-col items-center md:items-end">
            <h3 className="text-sm font-semibold mb-1">Contact Us</h3>
            <ul className="space-y-1 text-neutral-300 text-center md:text-right text-sm">
              <li className="flex items-center gap-1 justify-center md:justify-end">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                <a href="mailto:aicollegebuddy@gmail.com" className="hover:underline">aicollegebuddy@gmail.com</a>
              </li>
              <li className="flex items-center gap-1 justify-center md:justify-end">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <span>Pune, Maharashtra, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright, Student Note, and Policies in a single row */}
        <div className="border-t border-neutral-700 mt-2 pt-2 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-neutral-400 text-sm">© {new Date().getFullYear()} Team XLR8. All rights reserved.</p>
          <div className="text-neutral-400 text-sm text-center md:text-center">
            <span>By the student, for the student, with love <span role="img" aria-label="heart">❤️</span></span>
          </div>
          <div className="flex gap-2 mt-1 md:mt-0">
            <Link to="/privacy" className="text-neutral-400 text-sm hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-neutral-400 text-sm hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="text-neutral-400 text-sm hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
