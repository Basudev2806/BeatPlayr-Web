
import React from 'react';
import PageLayout from '@/components/PageLayout';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';

const faqData = [
  {
    question: "What is BeatPlayr?",
    answer: "BeatPlayr is an offline music player application for Android devices. It allows you to play your locally stored music files without needing an internet connection, providing an ad-free and uninterrupted listening experience."
  },
  {
    question: "Is BeatPlayr free to use?",
    answer: "Yes, BeatPlayr is planned to be a free application. We aim to provide a high-quality offline music listening experience to all Android users."
  },
  {
    question: "When will BeatPlayr be available on the Google Play Store?",
    answer: "We are working hard to launch BeatPlayr on the Google Play Store soon! You can sign up for notifications on our Download page to be among the first to know when it's live."
  },
  {
    question: "Does BeatPlayr collect my personal data or track my listening habits?",
    answer: "No, BeatPlayr is designed with privacy in mind. As an offline player, it does not collect your personal music files, listening habits, or other sensitive personal data. Please refer to our Privacy Policy for more details."
  },
  {
    question: "What audio formats does BeatPlayr support?",
    answer: "BeatPlayr aims to support a wide range of common audio formats, including MP3, AAC, FLAC, WAV, and OGG. We are continuously working to expand format compatibility."
  },
  {
    question: "Can I create playlists in BeatPlayr?",
    answer: "Yes, playlist creation and management will be a core feature of BeatPlayr, allowing you to organize your music library to your liking."
  },
  {
    question: "Will BeatPlayr have an equalizer?",
    answer: "We are considering an equalizer feature for a future update to allow users to customize their audio output. Stay tuned for updates!"
  },
  {
    question: "How can I report a bug or suggest a feature?",
    answer: "We appreciate your feedback! You can report bugs through the 'Report a Bug' page and suggest new features via the 'Suggest a Feature' page. Links are available in the website footer."
  },
  {
    question: "Does BeatPlayr require an internet connection to work?",
    answer: "No, the primary feature of BeatPlayr is its offline capability. Once you have your music files on your Android device, you do not need an internet connection to play them using BeatPlayr."
  },
  {
    question: "Will there be versions for iOS or other platforms?",
    answer: "Currently, BeatPlayr is being developed exclusively for Android. We may consider other platforms in the future based on demand and resources."
  }
];

const FAQPage = () => {
  return (
    <PageLayout title="Frequently Asked Questions">
      <div className="text-center mb-12">
        <HelpCircle className="h-16 w-16 text-indigo-400 mx-auto mb-4" />
        <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
          Have questions about BeatPlayr? We've compiled answers to some common inquiries below. If you don't find what you're looking for, feel free to <a href="/contact" className="gradient-text font-semibold">contact us</a>.
        </p>
      </div>
      
      <motion.div 
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Accordion type="single" collapsible className="w-full">
          {faqData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <AccordionItem value={`item-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </motion.div>
    </PageLayout>
  );
};

export default FAQPage;
