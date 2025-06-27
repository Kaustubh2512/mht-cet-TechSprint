import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Faq = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-grow container mx-auto py-6 md:py-12 px-2 sm:px-4">
      <Card className="w-full max-w-full md:max-w-2xl md:mx-auto mb-4">
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="flex items-center gap-2 text-xl md:text-2xl">
            <HelpCircle className="h-5 w-5 md:h-6 md:w-6 text-primary" />
            Frequently Asked Questions
          </CardTitle>
          <CardDescription className="text-sm md:text-base">Common questions about MHT-CET and engineering admissions</CardDescription>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-base md:text-lg py-3 md:py-4">What is MHT-CET?</AccordionTrigger>
              <AccordionContent>
                MHT-CET (Maharashtra Common Entrance Test) is a state-level entrance examination conducted by the State Common Entrance Test Cell, Maharashtra. It's the primary entrance exam for admission to engineering and pharmacy courses in colleges across Maharashtra.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-base md:text-lg py-3 md:py-4">How is the MHT-CET score calculated?</AccordionTrigger>
              <AccordionContent>
                MHT-CET score is calculated based on the number of correct and incorrect answers. Each correct answer fetches 2 marks, while there's no negative marking. The total marks are then converted to percentile based on your performance relative to other candidates.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-base md:text-lg py-3 md:py-4">What are CAP rounds?</AccordionTrigger>
              <AccordionContent>
                CAP (Centralized Admission Process) rounds are the official admission rounds conducted by DTE Maharashtra after the MHT-CET results. Usually, there are 3 CAP rounds where students can fill their college preferences, and seats are allocated based on merit ranks, category reservations, and preferences.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-base md:text-lg py-3 md:py-4">How does Home University quota work?</AccordionTrigger>
              <AccordionContent>
                The Home University quota reserves 70% of seats in a college for students who have completed their qualifying examination (HSC/12th) from the same university area. The remaining 30% seats fall under Other Than Home University (OTHU) quota, available to students from other university areas within Maharashtra.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger className="text-base md:text-lg py-3 md:py-4">What documents are required for MHT-CET counseling?</AccordionTrigger>
              <AccordionContent>
                Documents required include MHT-CET scorecard, 10th and 12th marksheets, domicile certificate, category certificate (if applicable), income certificate (if applicable), Aadhaar card, passport-sized photographs, and other certificates as specified in the official notification.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger className="text-base md:text-lg py-3 md:py-4">How can I check which college I can get with my percentile?</AccordionTrigger>
              <AccordionContent>
                You can use our AI College Predictor tool to get personalized college predictions based on your percentile, category, gender, and other factors. Alternatively, you can check the previous year's cutoff data available on the DTE Maharashtra website.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-7">
              <AccordionTrigger className="text-base md:text-lg py-3 md:py-4">How does the college predictor work?</AccordionTrigger>
              <AccordionContent>
                Our tool uses your MHT-CET percentile or rank to compare with previous years' cutoff data and predict colleges you are likely to get, based on your category, seat type, and region. The more details you provide, the more tailored your prediction will be.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-8">
              <AccordionTrigger className="text-base md:text-lg py-3 md:py-4">What data is the prediction based on?</AccordionTrigger>
              <AccordionContent>
                We use official DTE (Directorate of Technical Education) data from previous years' MHT-CET CAP rounds. This data is cleaned and structured for accuracy to provide the best possible predictions.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-9">
              <AccordionTrigger className="text-base md:text-lg py-3 md:py-4">How accurate is the prediction?</AccordionTrigger>
              <AccordionContent>
                Predictions are based on historical trends and are meant to be helpful estimates, not guarantees. Actual cutoffs can change each year depending on the number of applicants, their preferences, and the exam's difficulty level.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-10">
              <AccordionTrigger className="text-base md:text-lg py-3 md:py-4">Can I generate a preference list for CAP rounds?</AccordionTrigger>
              <AccordionContent>
                Yes! After using the predictor, you can export a suggested preference list as a PDF or Excel file. You can then rearrange this list based on your own priorities, such as location, branch, or college reputation.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-11">
              <AccordionTrigger className="text-base md:text-lg py-3 md:py-4">Can I predict based on JEE rank instead of MHT-CET?</AccordionTrigger>
              <AccordionContent>
                Yes, we also provide predictions based on your JEE Main score or rank. Just select the JEE option in the predictor and enter your details to see eligible colleges.
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