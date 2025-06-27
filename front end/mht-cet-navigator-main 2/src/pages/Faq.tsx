import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Faq = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-grow container mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-primary" />
            Frequently Asked Questions
          </CardTitle>
          <CardDescription>Common questions about MHT-CET and engineering admissions</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is MHT-CET?</AccordionTrigger>
              <AccordionContent>
                MHT-CET (Maharashtra Common Entrance Test) is a state-level entrance examination conducted by the State Common Entrance Test Cell, Maharashtra. It's the primary entrance exam for admission to engineering and pharmacy courses in colleges across Maharashtra.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How is the MHT-CET score calculated?</AccordionTrigger>
              <AccordionContent>
                MHT-CET score is calculated based on the number of correct and incorrect answers. Each correct answer fetches 2 marks, while there's no negative marking. The total marks are then converted to percentile based on your performance relative to other candidates.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>What are CAP rounds?</AccordionTrigger>
              <AccordionContent>
                CAP (Centralized Admission Process) rounds are the official admission rounds conducted by DTE Maharashtra after the MHT-CET results. Usually, there are 3 CAP rounds where students can fill their college preferences, and seats are allocated based on merit ranks, category reservations, and preferences.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>How does Home University quota work?</AccordionTrigger>
              <AccordionContent>
                The Home University quota reserves 70% of seats in a college for students who have completed their qualifying examination (HSC/12th) from the same university area. The remaining 30% seats fall under Other Than Home University (OTHU) quota, available to students from other university areas within Maharashtra.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>What documents are required for MHT-CET counseling?</AccordionTrigger>
              <AccordionContent>
                Documents required include MHT-CET scorecard, 10th and 12th marksheets, domicile certificate, category certificate (if applicable), income certificate (if applicable), Aadhaar card, passport-sized photographs, and other certificates as specified in the official notification.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>How can I check which college I can get with my percentile?</AccordionTrigger>
              <AccordionContent>
                You can use our AI College Predictor tool to get personalized college predictions based on your percentile, category, gender, and other factors. Alternatively, you can check the previous year's cutoff data available on the DTE Maharashtra website.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </main>
    <Footer />
  </div>
);

export default Faq; 