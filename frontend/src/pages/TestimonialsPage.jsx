
import React from 'react';
import PageLayout from '@/components/PageLayout';
import TestimonialsComponent from '@/components/Testimonials'; 

const TestimonialsPage = () => {
  return (
    <PageLayout title="What Our Users Say">
      <p className="text-center text-lg mb-12">
        We're thrilled to hear how BeatPlayr is making offline listening better for music lovers everywhere. Here are some of their stories.
      </p>
      <div className="max-w-5xl mx-auto">
        <TestimonialsComponent />
      </div>
    </PageLayout>
  );
};

export default TestimonialsPage;

