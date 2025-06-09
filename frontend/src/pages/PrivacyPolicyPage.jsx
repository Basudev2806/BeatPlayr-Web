
import React from 'react';
import PageLayout from '@/components/PageLayout';

const PrivacyPolicyPage = () => {
  return (
    <PageLayout title="Privacy Policy">
      <p>Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      <p>BeatPlayr ("us", "we", or "our") operates the BeatPlayr mobile application (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.</p>
      <p>We value your privacy. As an offline music player, BeatPlayr is designed to minimize data collection. We do not require you to create an account, and we do not collect personal information that directly identifies you, such as your name, email address, or phone number, unless you voluntarily provide it to us (e.g., by contacting support).</p>

      <h2>1. Information Collection and Use</h2>
      <p>BeatPlayr primarily functions as an offline application. It accesses music files stored locally on your device as per your explicit permission. We do not collect, store, or transmit your music files or personal listening habits to our servers.</p>
      
      <h3>a. Data We Do Not Collect:</h3>
      <ul>
        <li>Personal identification information (name, email, address, phone number) through app usage.</li>
        <li>Your music files or library contents.</li>
        <li>Specific listening history or preferences linked to your identity.</li>
      </ul>

      <h3>b. Data We May Collect (Indirectly or Voluntarily):</h3>
      <ul>
        <li><strong>Usage Data (Anonymous & Aggregated):</strong> We may collect anonymous, aggregated information about how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your device's Internet Protocol address (e.g., IP address, anonymized), device type, operating system version, the features of our Service that you visit, the time and date of your visit, the time spent on those features, and other diagnostic data. This data is used to improve the Service and is not personally identifiable.</li>
        <li><strong>Crash Reports:</strong> If the app crashes, we may collect anonymous crash report data (e.g., device state, app version) to help us identify and fix bugs. This is typically handled by the Google Play Store services if you opt-in.</li>
        <li><strong>Contact Information (Voluntary):</strong> If you contact us directly for support or feedback (e.g., via email), we will collect your name, email address, and any other information you choose to provide.</li>
      </ul>

      <h2>2. Use of Data</h2>
      <p>BeatPlayr uses the collected data for various purposes:</p>
      <ul>
        <li>To provide and maintain our Service</li>
        <li>To improve the stability and functionality of the Service</li>
        <li>To monitor the usage of the Service (on an anonymous, aggregated basis)</li>
        <li>To detect, prevent and address technical issues</li>
        <li>To respond to your support requests or feedback</li>
      </ul>

      <h2>3. Data Storage</h2>
      <p>BeatPlayr stores app settings and preferences locally on your device. We do not store your personal data on our servers unless you have voluntarily provided it (e.g., through a support email).</p>

      <h2>4. Third-Party Services</h2>
      <p>We may employ third-party companies and individuals to facilitate our Service ("Service Providers"), to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is used (e.g., Google Play Services for crash reporting, if enabled).</p>
      <p>These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.</p>
      
      <h2>5. Security of Data</h2>
      <p>The security of your data is important to us. While BeatPlayr operates primarily offline, reducing data transmission risks, remember that no method of transmission over the Internet or method of electronic storage is 100% secure. We strive to use commercially acceptable means to protect any data we might handle, but we cannot guarantee its absolute security.</p>

      <h2>6. Children's Privacy</h2>
      <p>Our Service does not address anyone under the age of 13 ("Children"). We do not knowingly collect personally identifiable information from children under 13. If you are a parent or guardian and you are aware that your Child has provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data from children without verification of parental consent, we take steps to remove that information from our servers.</p>

      <h2>7. Changes to This Privacy Policy</h2>
      <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy. You are advised to review this Privacy Policy periodically for any changes.</p>

      <h2>8. Contact Us</h2>
      <p>If you have any questions about this Privacy Policy, please contact us: <a href="mailto:privacy@BeatPlayr.app">privacy@BeatPlayr.app</a></p>
    </PageLayout>
  );
};

export default PrivacyPolicyPage;
