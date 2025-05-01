import React from 'react';
import { HeaderProcedure, Footer } from '../components';
import { Container } from '../components/ui';

const TermsCondition = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#f7fdf9]">
      <HeaderProcedure title="Terms and Conditions" />
      <main className="flex-grow py-8">
        <Container size="lg">
          <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm">
            <h1 className="text-3xl font-bold text-[#157a3c] mb-6">Terms and Conditions</h1>
            <div className="prose prose-lg max-w-none">
              <p className="mb-4">Last Updated: May 2023</p>
              
              <h2 className="text-xl font-semibold text-[#157a3c] mt-6 mb-3">1. Introduction</h2>
              <p>Welcome to TuLicencia. These terms and conditions outline the rules and regulations for the use of our website and services.</p>
              
              <h2 className="text-xl font-semibold text-[#157a3c] mt-6 mb-3">2. Acceptance of Terms</h2>
              <p>By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use TuLicencia's website if you do not accept all of the terms and conditions stated on this page.</p>
              
              <h2 className="text-xl font-semibold text-[#157a3c] mt-6 mb-3">3. License</h2>
              <p>Unless otherwise stated, TuLicencia and/or its licensors own the intellectual property rights for all material on TuLicencia. All intellectual property rights are reserved. You may view and/or print pages from this website for your own personal use subject to restrictions set in these terms and conditions.</p>
              
              <h2 className="text-xl font-semibold text-[#157a3c] mt-6 mb-3">4. Restrictions</h2>
              <p>You are specifically restricted from all of the following:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Publishing any website material in any other media</li>
                <li>Selling, sublicensing and/or otherwise commercializing any website material</li>
                <li>Publicly performing and/or showing any website material</li>
                <li>Using this website in any way that is or may be damaging to this website</li>
                <li>Using this website in any way that impacts user access to this website</li>
                <li>Using this website contrary to applicable laws and regulations, or in any way may cause harm to the website, or to any person or business entity</li>
              </ul>
              
              <h2 className="text-xl font-semibold text-[#157a3c] mt-6 mb-3">5. Your Content</h2>
              <p>In these terms and conditions, "Your Content" shall mean any audio, video text, images or other material you choose to display on this website. By displaying Your Content, you grant TuLicencia a non-exclusive, worldwide irrevocable, sub licensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media.</p>
              
              <h2 className="text-xl font-semibold text-[#157a3c] mt-6 mb-3">6. Governing Law</h2>
              <p>These terms and conditions are governed by and construed in accordance with the laws of Puerto Rico and you irrevocably submit to the exclusive jurisdiction of the courts in that location.</p>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default TermsCondition;
