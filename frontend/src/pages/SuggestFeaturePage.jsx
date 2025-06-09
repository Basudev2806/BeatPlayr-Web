import React, { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { Lightbulb, MessageSquare, Send, User, Mail, AlertCircle, CheckCircle } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/';

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

// API service with enhanced error handling
const featureService = {
  async submitFeature(data) {
    try {
      const response = await fetch(`${API_BASE_URL}/feature-request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Parse response
      const result = await response.json();
      
      if (!response.ok) {
        // Handle different error status codes
        if (response.status === 429) {
          throw new Error('Too many submissions. Please wait before trying again.');
        } else if (response.status >= 500) {
          throw new Error('Server error. Please try again later.');
        } else {
          throw new Error(result.message || 'Failed to submit feature request');
        }
      }
      
      return result;
    } catch (error) {
      // Handle network errors
      if (error.name === 'TypeError' || error.message.includes('fetch')) {
        throw new Error('Network error. Please check your connection and try again.');
      }
      throw error;
    }
  }
};

const SuggestFeaturePage = () => {
  const [featureTitle, setFeatureTitle] = useState('');
  const [featureDescription, setFeatureDescription] = useState('');
  const [problemSolved, setProblemSolved] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submissionId, setSubmissionId] = useState('');
  const { toast } = useToast();

  // Form validation
  const validateForm = () => {
    const errors = [];
    
    if (!featureTitle.trim()) {
      errors.push('Feature title is required');
    } else if (featureTitle.length > 100) {
      errors.push('Feature title must be less than 100 characters');
    }
    
    if (!featureDescription.trim()) {
      errors.push('Feature description is required');
    } else if (featureDescription.length > 1000) {
      errors.push('Feature description must be less than 1000 characters');
    }
    
    if (problemSolved.length > 500) {
      errors.push('Problem description must be less than 500 characters');
    }
    
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push('Please enter a valid email address');
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      toast({
        title: "Validation Error",
        description: validationErrors.join('. '),
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      const requestData = {
        featureTitle: featureTitle.trim(),
        featureDescription: featureDescription.trim(),
        problemSolved: problemSolved.trim(),
        email: email.trim() || undefined // Don't send empty string
      };

      console.log('Submitting feature request:', requestData);
      
      const result = await featureService.submitFeature(requestData);
      
      console.log('Submission successful:', result);
      
      // Success handling
      setSubmitSuccess(true);
      setSubmissionId(result.submissionId || 'N/A');
      
      toast({
        title: "Feature Suggestion Submitted!",
        description: `Thank you for your idea! We'll review it carefully. ${result.submissionId ? `Submission ID: ${result.submissionId}` : ''}`,
        variant: "default",
      });

      // Reset form after a short delay to show success state
      setTimeout(() => {
        setFeatureTitle('');
        setFeatureDescription('');
        setProblemSolved('');
        setEmail('');
        setSubmitSuccess(false);
        setSubmissionId('');
      }, 3000);

    } catch (error) {
      console.error('Feature submission error:', error);
      
      toast({
        title: "Submission Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout title="Suggest a Feature">
      <p className="mb-8 text-center text-lg text-gray-600">
        Got a brilliant idea for BeatPlayr? We're all ears! Describe your feature suggestion below and help us shape the future of the app.
      </p>
      
      {submitSuccess && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3 max-w-2xl mx-auto"
        >
          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
          <div>
            <p className="text-green-800 font-medium">Success!</p>
            <p className="text-green-700 text-sm">
              Your feature suggestion has been submitted successfully.
              {submissionId && ` Reference ID: ${submissionId}`}
            </p>
          </div>
        </motion.div>
      )}

      <motion.form 
        onSubmit={handleSubmit} 
        className="space-y-6 max-w-2xl mx-auto"
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={formItemVariants} custom={0} className="grid w-full items-center gap-1.5">
          <Label htmlFor="featureTitle" className="flex items-center">
            <Lightbulb className="h-4 w-4 mr-2 text-indigo-400"/>
            Feature Title *
          </Label>
          <Input 
            type="text" 
            id="featureTitle" 
            placeholder="e.g., Sleep Timer, Equalizer Presets" 
            value={featureTitle} 
            onChange={(e) => setFeatureTitle(e.target.value)} 
            required 
            maxLength={100}
            className={featureTitle.length > 90 ? 'border-yellow-300' : ''}
          />
          <div className="text-sm text-gray-500 flex justify-between">
            <span>{featureTitle.length}/100 characters</span>
            {featureTitle.length > 90 && (
              <span className="text-yellow-600 flex items-center">
                <AlertCircle className="h-3 w-3 mr-1" />
                Approaching limit
              </span>
            )}
          </div>
        </motion.div>

        <motion.div variants={formItemVariants} custom={1} className="grid w-full gap-1.5">
          <Label htmlFor="featureDescription" className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-2 text-indigo-400"/>
            Describe your idea *
          </Label>
          <Textarea 
            placeholder="How would this feature work? What would it do? Be as detailed as possible to help us understand your vision." 
            id="featureDescription" 
            value={featureDescription} 
            onChange={(e) => setFeatureDescription(e.target.value)} 
            required 
            rows={6}
            maxLength={1000}
            className={featureDescription.length > 900 ? 'border-yellow-300' : ''}
          />
          <div className="text-sm text-gray-500 flex justify-between">
            <span>{featureDescription.length}/1000 characters</span>
            {featureDescription.length > 900 && (
              <span className="text-yellow-600 flex items-center">
                <AlertCircle className="h-3 w-3 mr-1" />
                Approaching limit
              </span>
            )}
          </div>
        </motion.div>

        <motion.div variants={formItemVariants} custom={2} className="grid w-full gap-1.5">
          <Label htmlFor="problemSolved" className="flex items-center">
            <User className="h-4 w-4 mr-2 text-indigo-400"/>
            What problem does this solve or how does it improve the app?
          </Label>
          <Textarea 
            placeholder="e.g., Helps users fall asleep to music, allows for better audio customization, improves accessibility..." 
            id="problemSolved" 
            value={problemSolved} 
            onChange={(e) => setProblemSolved(e.target.value)} 
            rows={4}
            maxLength={500}
            className={problemSolved.length > 450 ? 'border-yellow-300' : ''}
          />
          <div className="text-sm text-gray-500 flex justify-between">
            <span>{problemSolved.length}/500 characters</span>
            {problemSolved.length > 450 && (
              <span className="text-yellow-600 flex items-center">
                <AlertCircle className="h-3 w-3 mr-1" />
                Approaching limit
              </span>
            )}
          </div>
        </motion.div>

        <motion.div variants={formItemVariants} custom={3} className="grid w-full items-center gap-1.5">
          <Label htmlFor="email" className="flex items-center">
            <Mail className="h-4 w-4 mr-2 text-indigo-400"/>
            Your Email (Optional)
          </Label>
          <Input 
            type="email" 
            id="email" 
            placeholder="your.email@example.com" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <p className="text-xs text-gray-500">
            We'll only use this to follow up on your suggestion if needed. We won't spam you!
          </p>
        </motion.div>

        <motion.div variants={formItemVariants} custom={4} className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            type="submit" 
            size="lg" 
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200" 
            disabled={isSubmitting || submitSuccess}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Submitting...
              </>
            ) : submitSuccess ? (
              <>
                <CheckCircle className="mr-2 h-4 w-4" /> 
                Submitted Successfully!
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" /> 
                Submit Suggestion
              </>
            )}
          </Button>
          
        </motion.div>

      </motion.form>
    </PageLayout>
  );
};

export default SuggestFeaturePage;