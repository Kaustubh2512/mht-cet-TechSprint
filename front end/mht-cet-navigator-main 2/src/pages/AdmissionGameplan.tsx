import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowLeft, ChevronDown, ChevronRight, FileText, Search, ClipboardList, Target, Check } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AdmissionGameplan = () => {
  const [openSections, setOpenSections] = useState<number[]>([0]); // Start with first section open

  const toggleSection = (index: number) => {
    setOpenSections(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const admissionSteps = [
    {
      id: 0,
      title: "📝 Online Registration",
      subtitle: "28 June – 8 July 2025",
      icon: FileText,
      progress: 25,
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Step-by-Step Process</h4>
            <ol className="list-decimal list-inside space-y-2 text-foreground/90">
              <li>Go to <a href="https://mahacet.org" className="text-primary underline font-medium" target="_blank" rel="noopener noreferrer">https://mahacet.org</a></li>
              <li>Click "New Registration" and enter your basic details</li>
              <li>Create a password & verify your mobile/email</li>
              <li>Fill in personal, academic & CET/JEE/NEET score details</li>
              <li>Upload scanned documents (photo, sign, marksheets, category, etc.)</li>
              <li>Choose E-Scrutiny or Physical Verification</li>
              <li>Submit and print your application receipt</li>
            </ol>
          </div>
        </div>
      )
    },
    {
      id: 1,
      title: "🔍 E-Scrutiny vs Physical Verification",
      subtitle: "Choose Your Verification Method",
      icon: Search,
      progress: 50,
      content: (
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="min-w-[600px] w-full border border-border rounded-lg text-sm bg-card">
              <thead className="bg-primary/10 dark:bg-secondary/20">
                <tr>
                  <th className="p-3 border-b border-border text-left">Feature</th>
                  <th className="p-3 border-b border-border text-left">E-Scrutiny</th>
                  <th className="p-3 border-b border-border text-left">Physical Scrutiny</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border-b border-border font-medium">Document upload</td>
                  <td className="p-3 border-b border-border">Online only</td>
                  <td className="p-3 border-b border-border">Online + Visit FC</td>
                </tr>
                <tr>
                  <td className="p-3 border-b border-border font-medium">Need to visit centre?</td>
                  <td className="p-3 border-b border-border">❌ No</td>
                  <td className="p-3 border-b border-border">✅ Yes</td>
                </tr>
                <tr>
                  <td className="p-3 border-b border-border font-medium">Status update</td>
                  <td className="p-3 border-b border-border">In your login</td>
                  <td className="p-3 border-b border-border">Issued at FC</td>
                </tr>
                <tr>
                  <td className="p-3 border-b border-border font-medium">If error</td>
                  <td className="p-3 border-b border-border">You'll be notified to re-upload</td>
                  <td className="p-3 border-b border-border">Told at the centre</td>
                </tr>
                <tr>
                  <td className="p-3 border-b border-border font-medium">Best for</td>
                  <td className="p-3 border-b border-border">Outstation candidates</td>
                  <td className="p-3 border-b border-border">Local & urgent cases</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
            <p className="text-foreground/80 italic">
              💡 Choose E-Scrutiny if you want a fully online process. Physical is safer if your documents need explanation or correction.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "🧾 Option Form Filling",
      subtitle: "After Final Merit List",
      icon: ClipboardList,
      progress: 75,
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Form Filling Steps</h4>
            <ol className="list-decimal list-inside space-y-2 text-foreground/90">
              <li>Log in to your CET account</li>
              <li>Click "CAP Option Form"</li>
              <li>Select your course + branch preferences (eg. IT, Mech, etc.)</li>
              <li>Arrange colleges in your priority order</li>
              <li>Double-check cutoffs and category-wise eligibility</li>
              <li>Submit and lock your choices</li>
              <li>Download and save the confirmation</li>
            </ol>
          </div>
          <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
            <p className="text-foreground/90 font-medium">✅ You can update your options in each round before locking.</p>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "🎯 CAP Rounds & Allotment",
      subtitle: "Rounds I–IV Process",
      icon: Target,
      progress: 100,
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Round Process</h4>
            <p className="text-foreground/90 mb-3">
              <strong>Round Begins:</strong> Based on your merit + options + seat availability
            </p>
            <p className="text-foreground/90 mb-4">
              <strong>Provisional Allotment displayed</strong> (eg. you get "College X – IT")
            </p>
            
            <div className="mb-4">
              <h5 className="font-semibold text-lg mb-2">You must:</h5>
              <ul className="list-disc list-inside space-y-1 text-foreground/90">
                <li><strong>Accept</strong> → Pay seat acceptance fee</li>
                <li><strong>Freeze / Float / Slide</strong> options</li>
                <li><strong>Reporting:</strong> Go to college or participate in next round</li>
              </ul>
            </div>
          </div>
          
          <div className="p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
            <p className="text-foreground/90">
              <strong>Next Rounds:</strong> Same process repeats for Rounds II–IV
            </p>
            <p className="text-foreground/90 mt-1">
              <strong>Final CAP Round is binding.</strong> After that, admission shifts to Institute-Level (Non-CAP) rounds.
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-10 max-w-4xl">
        <Link to="/" className="inline-flex items-center text-primary mb-6 hover:underline">
          <ArrowLeft className="mr-2 h-5 w-5" /> Back to Home
        </Link>
        <h1 className="text-3xl font-bold mb-4 text-primary">Your Admission Gameplan</h1>
        <p className="mb-6 text-lg text-foreground/80">Follow this checklist to make sure you don&apos;t miss any important step in your MHT-CET engineering admission journey:</p>

        {/* Detailed Admission Steps Section */}
        <section className="mt-4 space-y-10">
          {/* 1. Documents Required */}
          <div>
            <h2 className="text-2xl font-bold text-primary flex items-center gap-2 mb-4"> 1. Documents Required for CET Registration & Admission</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">🗂 For All Candidates</h3>
                <ul className="list-disc list-inside space-y-1 text-foreground/90">
                  <li>Recent passport-size photograph</li>
                  <li>Signature scan</li>
                  <li>Class 10 mark sheet (SSC)</li>
                  <li>Class 12 mark sheet (HSC or equivalent)</li>
                  <li>Domicile Certificate (if applicable)</li>
                  <li>MHT-CET / JEE / NEET Scorecard</li>
                  <li>Nationality Certificate or Birth Certificate</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">📄 For Reservation Claims</h3>
                <ul className="list-disc list-inside space-y-1 text-foreground/90">
                  <li>Caste Certificate (SC, ST, VJ/DT-NT(A), NT(B), NT(C), NT(D), OBC, SBC, SEBC)</li>
                  <li>Caste/Tribe Validity Certificate</li>
                  <li>Non-Creamy Layer Certificate (valid till 31st March 2026)</li>
                  <li>EWS Certificate (<a href="https://drive.google.com/file/d/1_YtWSaUGmUvKouI2f5GPr7K-xV0JK9By/view?usp=drive_link" className="text-primary underline" target="_blank" rel="noopener noreferrer">Proforma V format only</a>)</li>
                  <li>Income Certificate (for TFWS and EWS candidates)</li>
                  <li>Disability Certificate (if applicable; ≥40% disability)</li>
                  <li>Orphan Certificate (if applicable)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">🌍 Other Categories</h3>
                <ul className="list-disc list-inside space-y-1 text-foreground/90">
                  <li>Defence Category: <a href="https://drive.google.com/file/d/1_YtWSaUGmUvKouI2f5GPr7K-xV0JK9By/view?usp=drive_link" className="text-primary underline" target="_blank" rel="noopener noreferrer">Proforma C, D, or E</a></li>
                  <li>J&K & Ladakh Migrants: Migration/Displacement certificate</li>
                  <li>NRI/OCI/PIO/Gulf candidates: Passport + Equivalency Certificates</li>
                </ul>
              </div>
            </div>
            
            {/* Funny Document Organization Note */}
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="flex items-start gap-3">
                <span className="text-2xl">📁</span>
                <div>
                  <h4 className="font-semibold text-lg mb-2 text-blue-800 dark:text-blue-200">💡 Pro Tip: Get Your Documents Organized!</h4>
                  <ul className="space-y-1 text-blue-700 dark:text-blue-300">
                    <li>• Create a digital folder 📂 with ALL documents in JPG or PDF format</li>
                    <li>• Keep files under 1MB each (the site is picky about file sizes! 😅)</li>
                    <li>• Make 2 sets of xerox copies (because Murphy's Law loves admission season)</li>
                    <li>• Name files clearly: "Photo_Me.jpg", "Signature_Me.jpg", etc.</li>
                  </ul>
                  <p className="mt-2 text-sm text-blue-600 dark:text-blue-400 italic">
                    Trust us, future you will thank present you for this organization! 🎯
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Accordion Style Admission Steps */}
          <div>
            <h2 className="text-2xl font-bold text-primary flex items-center gap-2 mb-6">🚀 2. Your Admission Journey (Click to Expand)</h2>
            <div className="space-y-4">
              {admissionSteps.map((step, index) => {
                const IconComponent = step.icon;
                const isOpen = openSections.includes(step.id);
                
                return (
                  <div key={step.id} className="border border-border rounded-lg overflow-hidden bg-card shadow-sm hover:shadow-md transition-shadow">
                    <button
                      onClick={() => toggleSection(step.id)}
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                          <p className="text-sm text-foreground/70">{step.subtitle}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-300"
                              style={{ width: `${step.progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-foreground/60">{step.progress}%</span>
                        </div>
                        {isOpen ? (
                          <ChevronDown className="w-5 h-5 text-foreground/60" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-foreground/60" />
                        )}
                      </div>
                    </button>
                    
                    {isOpen && (
                      <div className="px-6 pb-6 border-t border-border bg-muted/20">
                        {step.content}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. Steps in the Admission Process */}
          <div>
            <h2 className="text-2xl font-bold text-primary flex items-center gap-2 mb-4"> 6. Steps in the Admission Process (Simplified)</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">🖥️ Pre-Admission (Online Only)</h3>
                <ul className="list-disc list-inside space-y-1 text-foreground/90">
                  <li>Register on <a href="https://mahacet.org" className="text-primary underline" target="_blank" rel="noopener noreferrer">https://mahacet.org</a></li>
                  <li>Upload all required documents</li>
                  <li>Choose Document Verification Mode:
                    <ul className="ml-6 list-[circle]">
                      <li>E-Scrutiny (online check)</li>
                      <li>Physical Scrutiny (visit FC in person)</li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">📋 Application Confirmation</h3>
                <ul className="list-disc list-inside space-y-1 text-foreground/90">
                  <li>Application confirmed by Scrutiny Centre or E-Scrutiny Centre</li>
                  <li>Print Acknowledgment Receipt</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 4. Key CAP Steps */}
          <div>
            <h2 className="text-2xl font-bold text-primary flex items-center gap-2 mb-4"> 7. Key CAP (Centralised Admission Process) Steps</h2>
            <ul className="list-decimal list-inside space-y-1 text-foreground/90">
              <li>Fill and confirm option form for college preferences</li>
              <li>Check Provisional Merit List</li>
              <li>Raise grievances (if any)</li>
              <li>View Final Merit List</li>
              <li>Participate in CAP Rounds I–IV</li>
              <li>Self-confirm allotted seat by paying fees online</li>
              <li>Report to allotted college</li>
            </ul>
          </div>

          {/* 5. Important Dates Table */}
          <div>
            <h2 className="text-2xl font-bold text-primary flex items-center gap-2 mb-4"> 8. Important Dates (AY 2025–26)</h2>
            <div className="overflow-x-auto">
              <table className="min-w-[340px] w-full border border-border rounded-lg text-sm bg-card">
                <thead className="bg-primary/10 dark:bg-secondary/20">
                  <tr>
                    <th className="p-2 border-b border-border text-left">Event</th>
                    <th className="p-2 border-b border-border text-left">Start</th>
                    <th className="p-2 border-b border-border text-left">End</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border-b border-border">Online Registration</td>
                    <td className="p-2 border-b border-border">28 June 2025</td>
                    <td className="p-2 border-b border-border">8 July 2025 (5:00 PM)</td>
                  </tr>
                  <tr>
                    <td className="p-2 border-b border-border">Document Verification</td>
                    <td className="p-2 border-b border-border">30 June 2025</td>
                    <td className="p-2 border-b border-border">9 July 2025 (5:00 PM)</td>
                  </tr>
                  <tr>
                    <td className="p-2 border-b border-border">Provisional Merit List</td>
                    <td className="p-2 border-b border-border">12 July 2025</td>
                    <td className="p-2 border-b border-border">—</td>
                  </tr>
                  <tr>
                    <td className="p-2 border-b border-border">Grievance Submission</td>
                    <td className="p-2 border-b border-border">13 July 2025</td>
                    <td className="p-2 border-b border-border">15 July 2025 (5:00 PM)</td>
                  </tr>
                  <tr>
                    <td className="p-2 border-b border-border">Final Merit List</td>
                    <td className="p-2 border-b border-border">17 July 2025</td>
                    <td className="p-2 border-b border-border">—</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AdmissionGameplan; 