
import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { DownloadCloud, PlayCircle, Smartphone, Music } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const DownloadPage = () => {
  return (
    <PageLayout title="Download BeatPlayr">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Smartphone className="h-24 w-24 text-indigo-400 mx-auto mb-6" />
          <h2 className="text-3xl font-semibold mb-4 gradient-text">Get BeatPlayr for Android</h2>
          <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
            Experience your music library offline, ad-free, and with a beautiful interface. BeatPlayr is currently available for Android devices and will be launching on the Google Play Store soon!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-12"
        >
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-lg py-3 px-8"
            onClick={() => alert("Coming soon to Google Play Store!")}
          >
            <PlayCircle className="mr-3 h-6 w-6" /> Coming Soon to Google Play
          </Button>
          <p className="text-sm text-foreground/60 mt-3">
            Click the button to be notified when it's available or check back soon!
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="space-y-6 max-w-md mx-auto text-left p-6 bg-secondary/40 rounded-lg border border-white/10"
        >
          <h3 className="text-2xl font-semibold text-center gradient-text mb-4">Why Choose BeatPlayr?</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <DownloadCloud className="h-5 w-5 text-indigo-400 mr-3 shrink-0 mt-1" />
              <span><strong>True Offline Playback:</strong> Enjoy your music without needing an internet connection.</span>
            </li>
            <li className="flex items-start">
              <PlayCircle className="h-5 w-5 text-indigo-400 mr-3 shrink-0 mt-1" />
              <span><strong>Ad-Free Experience:</strong> Listen to your music without interruptions.</span>
            </li>
            <li className="flex items-start">
              <Smartphone className="h-5 w-5 text-indigo-400 mr-3 shrink-0 mt-1" />
              <span><strong>Beautiful & Intuitive UI:</strong> A clean, modern interface designed for music lovers.</span>
            </li>
             <li className="flex items-start">
              <Music className="h-5 w-5 text-indigo-400 mr-3 shrink-0 mt-1" />
              <span><strong>Lightweight & Battery Friendly:</strong> Optimized for performance and low power consumption.</span>
            </li>
          </ul>
        </motion.div>

        <motion.p 
            className="text-sm text-foreground/60 mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            For early access or beta testing opportunities, please <Link to="/contact" className="gradient-text font-semibold">contact us</Link>.
          </motion.p>

      </div>
    </PageLayout>
  );
};

export default DownloadPage;
