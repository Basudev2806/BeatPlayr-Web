
import React from 'react';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeInOut" } },
};

const PageLayout = ({ title, children }) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32"
    >
      <div className="relative pt-16 pb-16 md:pt-20 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-10 z-0"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(129,140,248,0.1),transparent_40%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(129,140,248,0.1),transparent_40%)]"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.h1 
            className="text-4xl md:text-5xl font-extrabold tracking-tight mb-12 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="gradient-text">{title}</span>
          </motion.h1>
          
          <motion.div 
            className="prose prose-invert prose-lg max-w-none bg-secondary/30 backdrop-blur-sm p-6 md:p-10 rounded-xl border border-white/10 shadow-xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {children}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default PageLayout;
