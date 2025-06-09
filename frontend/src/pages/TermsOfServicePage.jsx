
import React from 'react';
import PageLayout from '@/components/PageLayout';

const TermsOfServicePage = () => {
  return (
    <PageLayout title="Terms of Service">
      <p>Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      <p>Welcome to BeatPlayr! These Terms of Service ("Terms") govern your use of the BeatPlayr mobile application (the "Service") provided by BeatPlayr ("us", "we", or "our").</p>
      
      <h2>1. Acceptance of Terms</h2>
      <p>By downloading, accessing, or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.</p>
      
      <h2>2. Use of the Service</h2>
      <p>BeatPlayr grants you a non-transferable, non-exclusive, revocable, limited license to use and access the Service solely for your personal, non-commercial use, strictly in accordance with these Terms.</p>
      <p>You agree not to:</p>
      <ul>
        <li>Use the Service for any illegal purpose or in violation of any local, state, national, or international law.</li>
        <li>Modify, copy, distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, transfer, or sell any information, software, products or services obtained from the Service.</li>
        <li>Attempt to decompile, reverse engineer, disassemble or hack the Service, or to defeat or overcome any encryption technology or security measures implemented by BeatPlayr.</li>
      </ul>

      <h2>3. User Content</h2>
      <p>The Service allows you to play music files stored locally on your device ("User Content"). You are solely responsible for your User Content and the consequences of playing it. You represent and warrant that you own or have the necessary licenses, rights, consents, and permissions to use your User Content in connection with the Service.</p>
      <p>BeatPlayr does not claim ownership of any User Content. We do not access, store, or transmit your local music files through our servers.</p>

      <h2>4. Intellectual Property</h2>
      <p>The Service and its original content (excluding User Content), features, and functionality are and will remain the exclusive property of BeatPlayr and its licensors. The Service is protected by copyright, trademark, and other laws of both your country and foreign countries.</p>

      <h2>5. Termination</h2>
      <p>We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
      <p>Upon termination, your right to use the Service will immediately cease.</p>

      <h2>6. Limitation of Liability</h2>
      <p>In no event shall BeatPlayr, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>

      <h2>7. Disclaimer</h2>
      <p>Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.</p>

      <h2>8. Governing Law</h2>
      <p>These Terms shall be governed and construed in accordance with the laws of [Your Jurisdiction/Country], without regard to its conflict of law provisions.</p>

      <h2>9. Changes to Terms</h2>
      <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>

      <h2>10. Contact Us</h2>
      <p>If you have any questions about these Terms, please contact us at <a href="mailto:legal@BeatPlayr.app">legal@BeatPlayr.app</a>.</p>
    </PageLayout>
  );
};

export default TermsOfServicePage;
