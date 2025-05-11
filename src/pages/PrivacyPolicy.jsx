import React from 'react';
import { HeaderProcedure, Footer } from '../components';
import { Container } from '../components/ui';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background-light">
      <HeaderProcedure title="Privacy Policy" />
      <main className="flex-grow py-8">
        <Container size="lg">
          <div className="card shadow-card p-6 md:p-10 fade-in">
            <h1 className="text-3xl font-bold text-primary mb-6">Privacy Policy</h1>
            <div className="prose prose-lg max-w-none">
              <p className="mb-4">Last Updated: May 2023</p>
              
              <h2 className="text-xl font-semibold text-primary mt-6 mb-3">1. Introduction</h2>
              <p>Welcome to TuLicencia. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.</p>
              
              <h2 className="text-xl font-semibold text-primary mt-6 mb-3">2. The Data We Collect</h2>
              <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Identity Data: includes first name, last name, username or similar identifier, date of birth.</li>
                <li>Contact Data: includes billing address, email address, and telephone numbers.</li>
                <li>Technical Data: includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
                <li>Usage Data: includes information about how you use our website and services.</li>
              </ul>
              
              <h2 className="text-xl font-semibold text-primary mt-6 mb-3">3. How We Use Your Data</h2>
              <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                <li>Where we need to comply with a legal obligation.</li>
              </ul>
              
              <h2 className="text-xl font-semibold text-primary mt-6 mb-3">4. Data Security</h2>
              <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.</p>
              
              <h2 className="text-xl font-semibold text-primary mt-6 mb-3">5. Contact Us</h2>
              <p>If you have any questions about this privacy policy or our privacy practices, please contact us at:</p>
              <p>Email: privacy@tulicencia.com</p>
              <p>Phone: (787) 555-1234</p>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
