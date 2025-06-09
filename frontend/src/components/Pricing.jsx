
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';

const Pricing = () => {
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

  const plans = [
    {
      name: 'Free',
      price: '$0',
      description: 'Perfect for individuals just getting started',
      features: [
        'Up to 50 notes',
        'Basic text formatting',
        '1 GB storage',
        'Mobile app access',
        'Export to PDF',
      ],
      limitations: [
        'No real-time collaboration',
        'No calendar integration',
        'Limited search capabilities',
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Pro',
      price: '$9.99',
      period: '/month',
      description: 'For professionals who need more power',
      features: [
        'Unlimited notes',
        'Advanced formatting',
        '10 GB storage',
        'Real-time collaboration',
        'Calendar integration',
        'Advanced search',
        'Priority support',
        'Custom templates',
      ],
      limitations: [],
      cta: 'Start Free Trial',
      popular: true,
    },
    {
      name: 'Team',
      price: '$19.99',
      period: '/user/month',
      description: 'For teams that work closely together',
      features: [
        'Everything in Pro',
        'Unlimited storage',
        'Team workspaces',
        'Admin controls',
        'Advanced permissions',
        'SSO integration',
        'Audit logs',
        'Dedicated support',
      ],
      limitations: [],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.15),transparent_50%)]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-lg text-foreground/80">
            Choose the plan that's right for you or your team.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {plans.map((plan, index) => (
            <motion.div 
              key={index} 
              className={`rounded-xl bg-secondary/50 backdrop-blur-sm border border-white/10 overflow-hidden ${
                plan.popular ? 'pricing-highlight relative z-10 md:scale-105' : ''
              }`}
              variants={itemVariants}
            >
              {plan.popular && (
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-semibold py-1 px-3 text-center">
                  MOST POPULAR
                </div>
              )}
              
              <div className="p-6 md:p-8">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-foreground/70 ml-1">{plan.period}</span>
                  )}
                </div>
                <p className="text-foreground/70 mb-6">{plan.description}</p>
                
                <Button 
                  className={`w-full mb-8 ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700' 
                      : ''
                  }`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  {plan.cta}
                </Button>
                
                <div className="space-y-4">
                  <p className="font-medium">What's included:</p>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-indigo-400 mr-2 shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {plan.limitations.length > 0 && (
                    <>
                      <p className="font-medium mt-6">Limitations:</p>
                      <ul className="space-y-3">
                        {plan.limitations.map((limitation, i) => (
                          <li key={i} className="flex items-start">
                            <X className="h-5 w-5 text-red-400 mr-2 shrink-0 mt-0.5" />
                            <span className="text-sm">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
