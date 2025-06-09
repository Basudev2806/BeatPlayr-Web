
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Headphones, PlayCircle } from 'lucide-react';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden hero-pattern">
      <div className="absolute inset-0 gradient-bg opacity-60 z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(129,140,248,0.15),transparent_60%)]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6"
            variants={itemVariants}
          >
            Your Music, Your Rules with <span className="gradient-text">BeatPlayr</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Enjoy your favorite tracks offline, anytime, anywhere. The ultimate ad-free music experience for Android.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4 mb-12"
            variants={itemVariants}
          >
            <Button size="lg" className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-base">
              Download from Play Store
              <PlayCircle className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-base">
              Learn More
              <Headphones className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-12"
            variants={itemVariants}
          >
            <div className="flex items-center">
              <Headphones className="h-5 w-5 text-indigo-400 mr-2" />
              <span className="text-sm text-foreground/80">Ad-free listening</span>
            </div>
            <div className="flex items-center">
              <PlayCircle className="h-5 w-5 text-indigo-400 mr-2" />
              <span className="text-sm text-foreground/80">Available on Android</span>
            </div>
            <div className="flex items-center">
              <ArrowRight className="h-5 w-5 text-indigo-400 mr-2" />
              <span className="text-sm text-foreground/80">Coming soon to Play Store</span>
            </div>
          </motion.div>
          
          <motion.div 
            className="relative mx-auto max-w-3xl rounded-xl shadow-2xl shadow-indigo-500/30 border border-white/10 overflow-hidden aspect-video"
            variants={itemVariants}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-600/10 z-0"></div>
            <img  class="w-full h-full object-cover relative z-10 rounded-xl" alt="BeatPlayr app interface on an Android phone" src="https://images.unsplash.com/photo-1548094891-c4ba474efd16" />
          </motion.div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default Hero;
