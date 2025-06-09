import React, { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { Send, Mail, MessageSquare, User, AlertCircle, CheckCircle } from 'lucide-react';

// Environment variable for API URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const formItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      type: 'spring',
      stiffness: 100,
      damping: 12
    }
  })
};

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const updateField = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form before submitting
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before submitting.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Make API call to your backend
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        })
      });

      if (response.ok) {
        const result = await response.json();
        
        // Reset form on success
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        
        toast({
          title: "Message Sent Successfully!",
          description: "Thank you for your message. We'll get back to you soon!",
          variant: "default",
        });
      } else {
        // Handle HTTP errors
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Server error: ${response.status}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      
      toast({
        title: "Failed to Send Message",
        description: error.message.includes('fetch') 
          ? "Unable to connect to server. Please check if the server is running."
          : error.message || "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout title="Contact Us">
      <div className="max-w-4xl mx-auto">
        <p className="mb-8 text-center text-lg">
          Have questions, feedback, or need support? We'd love to hear from you! Fill out the form below or email us directly at{' '}
          <a href="mailto:support@beatplayr.online" className="gradient-text font-semibold hover:underline">
            support@beatplayr.online
          </a>.
        </p>
        
        {/* Contact Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 text-center">
            <Mail className="h-8 w-8 text-indigo-400 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Email Support</h3>
            <p className="text-sm text-gray-400">support@beatplayr.online</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 text-center">
            <MessageSquare className="h-8 w-8 text-indigo-400 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Quick Response</h3>
            <p className="text-sm text-gray-400">Usually within 24 hours</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 text-center">
            <CheckCircle className="h-8 w-8 text-indigo-400 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Support Available</h3>
            <p className="text-sm text-gray-400">7 days a week</p>
          </div>
        </div>
        
        <motion.form 
          onSubmit={handleSubmit} 
          className="space-y-6 max-w-2xl mx-auto bg-white/5 backdrop-blur-sm rounded-lg p-8"
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={formItemVariants} custom={0} className="grid w-full items-center gap-1.5">
            <Label htmlFor="name" className="flex items-center text-sm font-medium">
              <User className="h-4 w-4 mr-2 text-indigo-400"/>Your Name
            </Label>
            <Input 
              type="text" 
              id="name" 
              placeholder="John Doe" 
              value={formData.name} 
              onChange={(e) => updateField('name', e.target.value)} 
              required 
              className="bg-white/10 border-white/20 focus:border-indigo-400"
            />
          </motion.div>
          
          <motion.div variants={formItemVariants} custom={1} className="grid w-full items-center gap-1.5">
            <Label htmlFor="email" className="flex items-center text-sm font-medium">
              <Mail className="h-4 w-4 mr-2 text-indigo-400"/>Email Address
            </Label>
            <Input 
              type="email" 
              id="email" 
              placeholder="you@example.com" 
              value={formData.email} 
              onChange={(e) => updateField('email', e.target.value)} 
              required 
              className="bg-white/10 border-white/20 focus:border-indigo-400"
            />
          </motion.div>
          
          <motion.div variants={formItemVariants} custom={2} className="grid w-full items-center gap-1.5">
            <Label htmlFor="subject" className="flex items-center text-sm font-medium">
              <MessageSquare className="h-4 w-4 mr-2 text-indigo-400"/>Subject
            </Label>
            <Input 
              type="text" 
              id="subject" 
              placeholder="How can we help you?" 
              value={formData.subject} 
              onChange={(e) => updateField('subject', e.target.value)} 
              required 
              className="bg-white/10 border-white/20 focus:border-indigo-400"
            />
          </motion.div>
          
          <motion.div variants={formItemVariants} custom={3} className="grid w-full gap-1.5">
            <Label htmlFor="message" className="flex items-center text-sm font-medium">
              <MessageSquare className="h-4 w-4 mr-2 text-indigo-400"/>Your Message
            </Label>
            <Textarea 
              placeholder="Tell us more about your question or feedback..." 
              id="message" 
              value={formData.message} 
              onChange={(e) => updateField('message', e.target.value)} 
              required 
              rows={6} 
              className="bg-white/10 border-white/20 focus:border-indigo-400 resize-none"
            />
          </motion.div>
          
          <motion.div variants={formItemVariants} custom={4} className="flex justify-center pt-4">
            <Button 
              type="submit" 
              size="lg" 
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 w-full md:w-auto min-w-[200px] transition-all duration-200" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" /> Send Message
                </>
              )}
            </Button>
          </motion.div>
          
          {isSubmitting && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-sm text-gray-400"
            >
              Please wait while we process your message...
            </motion.div>
          )}
        </motion.form>
      </div>
    </PageLayout>
  );
};

export default ContactUsPage;