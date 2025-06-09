
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import TermsOfServicePage from '@/pages/TermsOfServicePage';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
import CookiePolicyPage from '@/pages/CookiePolicyPage';
import ContactUsPage from '@/pages/ContactUsPage';
import ReportBugPage from '@/pages/ReportBugPage';
import SuggestFeaturePage from '@/pages/SuggestFeaturePage';
import TestimonialsPage from '@/pages/TestimonialsPage';
import DownloadPage from '@/pages/DownloadPage';
import FAQPage from '@/pages/FAQPage';
import ScrollToTop from '@/components/ScrollToTop';


function App() {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/cookie-policy" element={<CookiePolicyPage />} />
            <Route path="/contact" element={<ContactUsPage />} />
            <Route path="/report-bug" element={<ReportBugPage />} />
            <Route path="/suggest-feature" element={<SuggestFeaturePage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/download" element={<DownloadPage />} />
            <Route path="/faq" element={<FAQPage />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
