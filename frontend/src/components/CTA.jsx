
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { DownloadCloud, PlayCircle } from 'lucide-react';

const CTA = () => {
  return (
    <section id="cta" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 gradient-bg opacity-40 z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.25),transparent_60%)]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2 
            className="text-3xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Ready to <span className="gradient-text">Elevate</span> Your Offline Listening?
          </motion.h2>
          
          <motion.p 
            className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Download BeatPlayr for Android and rediscover your music library, ad-free and offline. Coming soon to the Play Store!
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button size="lg" className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-base">
              Notify Me on Launch
              <DownloadCloud className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
          
          <motion.p 
            className="text-sm text-foreground/60 mt-4 flex items-center justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <PlayCircle className="h-4 w-4 mr-1.5 text-indigo-400" />
            Available soon on Google Play Store.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
