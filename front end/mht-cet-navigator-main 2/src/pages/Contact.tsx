import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLocation } from 'react-router-dom';

const Contact = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const prefillMessage = query.get('message') || '';
  const [form, setForm] = useState({ name: '', email: '', mobile: '', message: prefillMessage });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (prefillMessage) {
      setForm((prev) => ({ ...prev, message: prefillMessage }));
    }
    // eslint-disable-next-line
  }, [prefillMessage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('https://formspree.io/f/xyzjlzeq', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        setSubmitted(true);
      } else {
        setError('Something went wrong. Please try again later.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto py-12">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg mb-8 max-w-2xl">
          Have questions, feedback, or need help? Fill out the form below and we'll get back to you! You can also email us directly at <a href="mailto:aicollegebuddy@gmail.com" className="text-primary underline">aicollegebuddy@gmail.com</a>.
        </p>
        {submitted ? (
          <div className="text-green-600 text-lg font-semibold">Thank you for reaching out! We'll get back to you soon.</div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-lg space-y-6">
            <div>
              <label htmlFor="name" className="block font-medium mb-1">Name</label>
              <input type="text" id="name" name="name" value={form.name} onChange={handleChange} required className="w-full px-3 py-2 border rounded bg-background text-foreground placeholder:text-muted-foreground" placeholder="Your Name" />
            </div>
            <div>
              <label htmlFor="email" className="block font-medium mb-1">Email</label>
              <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required className="w-full px-3 py-2 border rounded bg-background text-foreground placeholder:text-muted-foreground" placeholder="Your Email" />
            </div>
            <div>
              <label htmlFor="mobile" className="block font-medium mb-1">Mobile Number</label>
              <input type="tel" id="mobile" name="mobile" value={form.mobile} onChange={handleChange} required className="w-full px-3 py-2 border rounded bg-background text-foreground placeholder:text-muted-foreground" placeholder="Your Mobile Number" />
            </div>
            <div>
              <label htmlFor="message" className="block font-medium mb-1">Message</label>
              <textarea id="message" name="message" value={form.message} onChange={handleChange} required className="w-full px-3 py-2 border rounded min-h-[120px] bg-background text-foreground placeholder:text-muted-foreground" placeholder="Your Message" />
            </div>
            {error && <div className="text-red-600 text-sm">{error}</div>}
            <button type="submit" className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 transition">Send Message</button>
          </form>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Contact; 