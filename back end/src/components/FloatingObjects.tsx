
import React from 'react';
import { Book, Compass, Pencil, GraduationCap, Calculator, FileText } from 'lucide-react';

const FloatingObjects = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* College Building Icon */}
      <div className="absolute top-1/4 left-1/6 w-16 h-16 bg-tertiary rounded-lg animate-float opacity-70">
        <div className="w-full h-2/3 bg-tertiary relative top-0 rounded-t-lg">
          <div className="absolute bottom-0 left-1/4 w-1/2 h-1/3 bg-neutral rounded-t-md"></div>
        </div>
        <div className="w-full h-1/3 bg-tertiary/80 relative bottom-0 rounded-b-lg"></div>
      </div>
      
      {/* Book Icon */}
      <div className="absolute top-1/3 right-1/5 w-12 h-14 animate-bounce-gentle opacity-80">
        <Book className="w-full h-full text-secondary" />
      </div>
      
      {/* Compass */}
      <div className="absolute bottom-1/3 left-1/4 animate-float opacity-80" style={{ animationDelay: '1.2s' }}>
        <Compass className="w-10 h-10 text-primary" />
      </div>
      
      {/* Pencil */}
      <div className="absolute top-2/5 right-1/4 animate-bounce-gentle opacity-80" style={{ animationDelay: '0.7s' }}>
        <Pencil className="w-10 h-10 text-tertiary" />
      </div>
      
      {/* Graduation Cap */}
      <div className="absolute bottom-1/4 left-1/3 animate-float opacity-80" style={{ animationDelay: '1s' }}>
        <GraduationCap className="w-12 h-12 text-secondary" />
      </div>
      
      {/* Document Icon */}
      <div className="absolute top-2/3 right-1/4 animate-bounce-gentle opacity-80" style={{ animationDelay: '0.5s' }}>
        <FileText className="w-10 h-10 text-accent" />
      </div>
      
      {/* Calculator Icon */}
      <div className="absolute top-1/6 right-1/3 animate-float opacity-80" style={{ animationDelay: '1.5s' }}>
        <Calculator className="w-10 h-10 text-primary" />
      </div>
      
      {/* Circular Decorative Elements */}
      <div className="absolute top-1/2 left-1/6 w-6 h-6 bg-primary/30 rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/6 w-8 h-8 bg-secondary/30 rounded-full animate-pulse" style={{ animationDelay: '0.7s' }}></div>
      <div className="absolute top-1/3 left-1/2 w-4 h-4 bg-tertiary/30 rounded-full animate-pulse" style={{ animationDelay: '1.2s' }}></div>
    </div>
  );
};

export default FloatingObjects;
