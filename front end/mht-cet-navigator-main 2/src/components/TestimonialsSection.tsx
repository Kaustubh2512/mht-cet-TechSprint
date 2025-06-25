
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Rahul Sharma",
      college: "VJTI Mumbai",
      quote: "MHT-CET Navigator accurately predicted my college options! I got into VJTI for Computer Engineering just as the AI suggested.",
      avatar: "RS",
      rating: 5
    },
    {
      name: "Priya Patil",
      college: "COEP Pune",
      quote: "The platform made the complex admission process so much easier. I was able to plan my CAP rounds strategically and got my dream college.",
      avatar: "PP",
      rating: 5
    },
    {
      name: "Aditya Joshi",
      college: "PICT Pune",
      quote: "The percentile predictor was spot on! The college suggestions were realistic and helped me make an informed decision.",
      avatar: "AJ",
      rating: 4
    },
    {
      name: "Neha Deshmukh",
      college: "SPIT Mumbai",
      quote: "As a first-generation college student, this platform was a lifesaver. The predictions and resources guided me through the entire process.",
      avatar: "ND",
      rating: 5
    }
  ];

  return (
    <section className="py-16 bg-neutral-100">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our <span className="gradient-text">Users Say</span>
          </h2>
          <p className="text-lg opacity-70 max-w-xl mx-auto">
            Don't just take our word for it. Hear from students who successfully used MHT-CET Navigator to get into their dream colleges.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="card-hover border border-neutral/10">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.college}</p>
                    </div>
                  </div>
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#EFB11D" stroke="#EFB11D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 italic">{`"${testimonial.quote}"`}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
