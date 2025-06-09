import React, { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { Bug, AlertTriangle, Smartphone, Send, Mail, Monitor, AlertCircle, User } from 'lucide-react';

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

const ReportBugPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    description: '',
    steps: '',
    deviceInfo: '',
    browser: '',
    priority: 'Medium',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const updateField = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Auto-detect browser information
  const detectBrowser = () => {
    const userAgent = navigator.userAgent;
    let browser = 'Unknown';
    
    if (userAgent.includes('Chrome')) browser = 'Chrome';
    else if (userAgent.includes('Firefox')) browser = 'Firefox';
    else if (userAgent.includes('Safari')) browser = 'Safari';
    else if (userAgent.includes('Edge')) browser = 'Edge';
    
    const version = userAgent.match(/(?:Chrome|Firefox|Safari|Edge)\/(\d+\.\d+)/);
    return version ? `${browser} ${version[1]}` : browser;
  };

  // Auto-fill browser info on component mount
  React.useEffect(() => {
    if (!formData.browser) {
      updateField('browser', detectBrowser());
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields (backend only requires title, description, steps, deviceInfo)
    const requiredFields = {
      title: formData.title?.trim(),
      description: formData.description?.trim(),
      steps: formData.steps?.trim(),
      deviceInfo: formData.deviceInfo?.trim()
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([key, value]) => !value)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      console.log('Missing fields:', missingFields);
      console.log('Form data:', formData);
      toast({
        title: "Missing Information",
        description: `Please fill in all required fields: ${missingFields.join(', ')}`,
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Prepare data for API (matching backend expectations exactly)
      const bugReportData = {
        title: formData.title?.trim(),
        description: formData.description?.trim(),
        steps: formData.steps?.trim(),
        deviceInfo: formData.deviceInfo?.trim(),
        browser: formData.browser?.trim() || 'Unknown',
        priority: formData.priority || 'Medium', // Keep original case
        name: formData.name?.trim() || 'Anonymous',
        email: formData.email?.trim() || null
      };

      // Final check - ensure no required fields are empty after trimming
      if (!bugReportData.title || !bugReportData.description || !bugReportData.steps || !bugReportData.deviceInfo) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields completely.",
          variant: "destructive",
        });
        return;
      }

      console.log('Sending bug report data:', bugReportData); // Debug log

      const response = await fetch(`${API_BASE_URL}/bug-report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bugReportData)
      });

      const result = await response.json();

      if (response.ok) {
        // Reset form on success
        setFormData({
          name: '',
          title: '',
          description: '',
          steps: '',
          deviceInfo: '',
          browser: detectBrowser(), // Keep browser info
          priority: 'Medium',
          email: ''
        });
        
        toast({
          title: "Bug Report Submitted!",
          description: `Thank you for helping us improve BeatPlayr. Submission ID: ${result.submissionId}`,
          variant: "default",
        });
      } else {
        throw new Error(result.message || `Server error: ${response.status}`);
      }
    } catch (error) {
      console.error('Error submitting bug report:', error);
      
      toast({
        title: "Failed to Submit Bug Report",
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
    <PageLayout title="Report a Bug">
      <p className="mb-8 text-center text-lg">
        Encountered an issue? Please provide as much detail as possible so we can fix it. Your help is invaluable in making BeatPlayr better!
      </p>
      
      <motion.form 
        onSubmit={handleSubmit} 
        className="space-y-6 max-w-2xl mx-auto bg-white/5 backdrop-blur-sm rounded-lg p-8"
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={formItemVariants} custom={0} className="grid w-full items-center gap-1.5">
          <Label htmlFor="name" className="flex items-center text-sm font-medium">
            <User className="h-4 w-4 mr-2 text-indigo-400"/>Your Name (Optional)
          </Label>
          <Input 
            type="text" 
            id="name" 
            placeholder="John Doe" 
            value={formData.name} 
            onChange={(e) => updateField('name', e.target.value)} 
            className="bg-white/10 border-white/20 focus:border-indigo-400"
          />
        </motion.div>

        <motion.div variants={formItemVariants} custom={1} className="grid w-full items-center gap-1.5">
          <Label htmlFor="title" className="flex items-center text-sm font-medium">
            <Bug className="h-4 w-4 mr-2 text-indigo-400"/>Bug Title *
          </Label>
          <Input 
            type="text" 
            id="title" 
            placeholder="Brief description of the issue" 
            value={formData.title} 
            onChange={(e) => updateField('title', e.target.value)} 
            required 
            className="bg-white/10 border-white/20 focus:border-indigo-400"
          />
        </motion.div>

        <motion.div variants={formItemVariants} custom={2} className="grid w-full gap-1.5">
          <Label htmlFor="description" className="flex items-center text-sm font-medium">
            <Bug className="h-4 w-4 mr-2 text-indigo-400"/>Describe the Bug *
          </Label>
          <Textarea 
            placeholder="What went wrong? Be specific about what you expected vs what actually happened." 
            id="description" 
            value={formData.description} 
            onChange={(e) => updateField('description', e.target.value)} 
            required 
            rows={4}
            className="bg-white/10 border-white/20 focus:border-indigo-400 resize-none"
          />
        </motion.div>

        <motion.div variants={formItemVariants} custom={3} className="grid w-full gap-1.5">
          <Label htmlFor="steps" className="flex items-center text-sm font-medium">
            <AlertTriangle className="h-4 w-4 mr-2 text-indigo-400"/>Steps to Reproduce *
          </Label>
          <Textarea 
            placeholder={`1. Opened the app...\n2. Clicked on...\n3. The app crashed / showed an error...`}
            id="steps" 
            value={formData.steps} 
            onChange={(e) => updateField('steps', e.target.value)} 
            required 
            rows={5}
            className="bg-white/10 border-white/20 focus:border-indigo-400 resize-none"
          />
        </motion.div>

        <motion.div variants={formItemVariants} custom={4} className="grid w-full items-center gap-1.5">
          <Label htmlFor="deviceInfo" className="flex items-center text-sm font-medium">
            <Smartphone className="h-4 w-4 mr-2 text-indigo-400"/>Device Information *
          </Label>
          <Input 
            type="text" 
            id="deviceInfo" 
            placeholder="e.g., Samsung Galaxy S21, Android 12 / iPhone 13, iOS 15 / Windows 11, Desktop" 
            value={formData.deviceInfo} 
            onChange={(e) => updateField('deviceInfo', e.target.value)} 
            required 
            className="bg-white/10 border-white/20 focus:border-indigo-400"
          />
        </motion.div>

        <motion.div variants={formItemVariants} custom={5} className="grid w-full items-center gap-1.5">
          <Label htmlFor="browser" className="flex items-center text-sm font-medium">
            <Monitor className="h-4 w-4 mr-2 text-indigo-400"/>Browser Information
          </Label>
          <Input 
            type="text" 
            id="browser" 
            placeholder="Browser and version (auto-detected)" 
            value={formData.browser} 
            onChange={(e) => updateField('browser', e.target.value)} 
            className="bg-white/10 border-white/20 focus:border-indigo-400"
          />
        </motion.div>

        <motion.div variants={formItemVariants} custom={6} className="grid w-full items-center gap-1.5">
          <Label htmlFor="priority" className="flex items-center text-sm font-medium">
            <AlertCircle className="h-4 w-4 mr-2 text-indigo-400"/>Priority Level
          </Label>
          <select 
            id="priority" 
            value={formData.priority} 
            onChange={(e) => updateField('priority', e.target.value)}
            className="bg-white/10 border border-white/20 focus:border-indigo-400 rounded-md px-3 py-2 text-white"
          >
            <option value="Low" className="bg-gray-800">Low - Minor issue</option>
            <option value="Medium" className="bg-gray-800">Medium - Noticeable issue</option>
            <option value="High" className="bg-gray-800">High - Major functionality broken</option>
          </select>
        </motion.div>

        <motion.div variants={formItemVariants} custom={7} className="grid w-full items-center gap-1.5">
          <Label htmlFor="email" className="flex items-center text-sm font-medium">
            <Mail className="h-4 w-4 mr-2 text-indigo-400"/>Your Email (Optional)
          </Label>
          <Input 
            type="email" 
            id="email" 
            placeholder="So we can contact you if we have questions" 
            value={formData.email} 
            onChange={(e) => updateField('email', e.target.value)} 
            className="bg-white/10 border-white/20 focus:border-indigo-400"
          />
        </motion.div>

        <motion.div variants={formItemVariants} custom={8} className="flex justify-center pt-4">
          <Button 
            type="submit" 
            size="lg" 
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 w-full md:w-auto min-w-[200px] transition-all duration-200" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Submitting...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" /> Submit Report
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
            Please wait while we process your bug report...
          </motion.div>
        )}
      </motion.form>
    </PageLayout>
  );
};

export default ReportBugPage;