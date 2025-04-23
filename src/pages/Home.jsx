import React from 'react'
import { Section } from '../components/ui'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Features from '../components/Features'
import HowItWorks from '../components/HowItWorks'
import ServiceSelection from '../components/ServiceSelection'
import Contact from '../components/Contact'
import FAQ from '../components/FAQ'
import Footer from '../components/Footer'

/**
 * Home page component
 * Uses the existing layout but with the Section component wrapping each section
 */
const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        {/* Hero section - using bg prop from Section */}
        <Section 
          bg="white" 
          className="bg-gradient-to-b from-[#ffffff] to-[#60f88b] rounded-b-[50px] pt-6 md:pt-20 pb-12 md:pb-50"
          containerSize="xl"
          withContainer={true}
        >
          <Hero />
        </Section>
        
        {/* Features section */}
        <Section bg="white" containerSize="xl">
          <Features />
        </Section>
        
        {/* How It Works section - no Section wrapper */}
        <HowItWorks />
        
        {/* Service Selection section */}
        <Section bg="white" containerSize="lg">
          <ServiceSelection />
        </Section>
        
        {/* FAQ section */}
        <Section bg="white" containerSize="full">
          <FAQ />
        </Section>
        
          <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default Home
