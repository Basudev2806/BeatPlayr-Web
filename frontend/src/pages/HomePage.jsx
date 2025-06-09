
import React from 'react';
import Hero from '@/components/Hero';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const HomePage = () => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Hero />
      <Testimonials />
      <CTA />
    </motion.div>
  );
};

export default HomePage;
