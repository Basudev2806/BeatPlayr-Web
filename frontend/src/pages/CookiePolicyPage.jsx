
import React from 'react';
import PageLayout from '@/components/PageLayout';

const CookiePolicyPage = () => {
  return (
    <PageLayout title="Cookie Policy">
      <p>Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      <p>This Cookie Policy explains what cookies are and how BeatPlayr ("us", "we", or "our") uses them on our website (if applicable) and potentially within our mobile application (the "Service"). You should read this policy so you can understand what type of cookies we use, the information we collect using cookies and how that information is used.</p>
      
      <h2>What are Cookies?</h2>
      <p>Cookies are small text files that are stored on your computer or mobile device when you visit a website or use an app. They allow the website or app to remember your actions and preferences (such as login, language, font size and other display preferences) over a period of time, so you don’t have to keep re-entering them whenever you come back to the site or browse from one page to another.</p>

      <h2>How Do We Use Cookies?</h2>
      <p>As BeatPlayr is primarily an offline mobile application, our use of cookies is minimal and typically not within the core app functionality itself. If we have a website for BeatPlayr, it may use cookies for standard website functions.</p>
      
      <h3>Mobile Application (BeatPlayr App):</h3>
      <p>The BeatPlayr mobile application itself <strong>does not use cookies</strong> in the traditional web browser sense. It stores preferences and settings locally on your device, not through cookies that track you across different services.</p>

      <h3>Website (BeatPlayr.app or similar):</h3>
      <p>If we operate a website for BeatPlayr, we may use cookies for the following purposes:</p>
      <ul>
        <li><strong>Essential Cookies:</strong> Some cookies are essential for you to be able to experience the full functionality of our site. They allow us to maintain user sessions and prevent any security threats. They do not collect or store any personal information.</li>
        <li><strong>Analytics Cookies:</strong> These cookies store information like the number of visitors to the website, the number of unique visitors, which pages of the website have been visited, the source of the visit etc. This data helps us understand and analyze how well the website performs and where it needs improvement. This data is typically anonymized.</li>
        <li><strong>Preference Cookies:</strong> These cookies help us store your settings and browsing preferences like language preferences so that you have a better and efficient experience on future visits to the website.</li>
      </ul>

      <h2>Types of Cookies We Might Use (on our website)</h2>
      <ul>
        <li><strong>Session Cookies:</strong> These are temporary cookies that expire once you close your browser.</li>
        <li><strong>Persistent Cookies:</strong> These remain on your device for a set period or until you delete them.</li>
        <li><strong>First-party Cookies:</strong> These are set by the website you are visiting.</li>
        <li><strong>Third-party Cookies:</strong> These are set by a domain other than the one you are visiting (e.g., Google Analytics).</li>
      </ul>

      <h2>Your Choices Regarding Cookies</h2>
      <p>If you are visiting our website, you can manage your cookie preferences through your browser settings. Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set, visit <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer">www.aboutcookies.org</a> or <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer">www.allaboutcookies.org</a>.</p>
      <p>Please note that if you choose to disable cookies on our website, some features may not function properly.</p>
      <p>For the BeatPlayr mobile application, there are no cookie settings to manage as it does not use cookies.</p>

      <h2>Changes to This Cookie Policy</h2>
      <p>We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page and updating the "Last Updated" date. You are advised to review this Cookie Policy periodically for any changes.</p>

      <h2>Contact Us</h2>
      <p>If you have any questions about this Cookie Policy, please contact us: <a href="mailto:privacy@BeatPlayr.app">privacy@BeatPlayr.app</a></p>
    </PageLayout>
  );
};

export default CookiePolicyPage;
