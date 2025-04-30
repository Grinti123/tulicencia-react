import React, { useState } from 'react';
import {
  Accordion,
  Button,
  Card,
  Container,
  DotLottiePlayer,
  FadeIn,
  Icon,
  InputForm,
  LinkButton,
  RadioGroup,
  Section,
  Tabs,
} from '../components/ui';
import Header from '../components/Header';
import Footer from '../components/Footer';

/**
 * Example page showing the usage of all reusable UI components
 */
const ExamplePage = () => {
  const [radioValue, setRadioValue] = useState('option1');
  
  // Sample data for components
  const accordionItems = [
    {
      id: 'item1',
      title: 'What is this service?',
      content: 'This is an example service that demonstrates the reusable components.'
    },
    {
      id: 'item2',
      title: 'How does it work?',
      content: 'It uses various reusable UI components to create a consistent, maintainable interface.'
    }
  ];
  
  const tabsData = [
    {
      id: 'tab1',
      label: 'Features',
      content: (
        <div className="p-4">
          <h3 className="text-xl font-bold mb-4">Key Features</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Responsive design</li>
            <li>Reusable components</li>
            <li>Consistent styling</li>
          </ul>
        </div>
      )
    },
    {
      id: 'tab2',
      label: 'Pricing',
      content: (
        <div className="p-4">
          <h3 className="text-xl font-bold mb-4">Pricing Options</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Card variant="primary" shadow={true}>
              <h4 className="text-lg font-bold">Basic Plan</h4>
              <p className="mt-2">$19.99/month</p>
            </Card>
            <Card variant="secondary" shadow={true}>
              <h4 className="text-lg font-bold">Premium Plan</h4>
              <p className="mt-2">$39.99/month</p>
            </Card>
          </div>
        </div>
      )
    }
  ];
  
  const radioOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        {/* Hero Section with FadeIn and LinkButton */}
        <Section 
          bg="white" 
          className="bg-gradient-to-b from-[#ffffff] to-[#60f88b] rounded-b-[50px] pt-6 md:pt-20 pb-12 md:pb-50"
          containerSize="xl"
        >
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
            <FadeIn className="order-2 md:order-1 text-center md:text-left" duration="1s">
              <h1 className="text-4xl leading-tight md:text-5xl font-bold mb-4 md:mb-6 text-[#1a602d]">
                Example Page with Reusable Components
              </h1>

              <p className="text-[#224a33] text-lg mb-6 md:mb-8">
                This page demonstrates all the reusable UI components you've created.
                Use this as a reference for implementing new pages.
              </p>

              <div className="flex space-x-4 justify-center md:justify-start">
                <LinkButton 
                  to="/services" 
                  variant="primary"
                  size="lg"
                >
                  Primary Action
                </LinkButton>
                
                <Button 
                  variant="secondary"
                  size="lg"
                  onClick={() => alert('Secondary action clicked!')}
                >
                  Secondary Action
                </Button>
              </div>
            </FadeIn>

            <FadeIn className="order-1 md:order-2" duration="1.2s">
              <div className="h-[300px]">
                <DotLottiePlayer
                  src="/json/carro-home.json"
                  autoplay={true}
                  loop={true}
                />
              </div>
            </FadeIn>
          </div>
        </Section>
        
        {/* Cards Section */}
        <Section bg="white" containerSize="lg">
          <h2 className="text-3xl font-bold text-center mb-8 text-[#1a602d]">Card Components</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <FadeIn duration="0.8s">
              <Card variant="default" shadow={true}>
                <h3 className="text-xl font-bold mb-4">Default Card</h3>
                <p>This is a default card with a shadow.</p>
                <Button variant="primary" className="mt-4">
                  Learn More
                </Button>
              </Card>
            </FadeIn>
            
            <FadeIn duration="1s">
              <Card variant="primary">
                <h3 className="text-xl font-bold mb-4">Primary Card</h3>
                <p>This is a primary card with light blue background.</p>
                <Button variant="secondary" className="mt-4">
                  Learn More
                </Button>
              </Card>
            </FadeIn>
            
            <FadeIn duration="1.2s">
              <Card variant="secondary" shadow={true}>
                <h3 className="text-xl font-bold mb-4">Secondary Card</h3>
                <p>This is a secondary card with shadow.</p>
                <Button variant="primary" className="mt-4">
                  Learn More
                </Button>
              </Card>
            </FadeIn>
          </div>
        </Section>

        <InputForm
           id="licenseNumber"
           name="licenseNumber"
           label="Número de licencia"
           value={formData.licenseNumber}
           onChange={handleChange}
           placeholder="Ingrese su número de licencia"
           maxLength={7}
           required
        />
        
        {/* Tabs Section */}
        <Section bg="light" containerSize="lg">
          <h2 className="text-3xl font-bold text-center mb-8 text-[#1a602d]">Tabs Component</h2>
          
          <Tabs 
            tabs={tabsData}
            defaultTab="tab1"
            tabsClassName="mb-6"
          />
        </Section>
        
        {/* Accordion Section */}
        <Section bg="white" containerSize="full">
          <h2 className="text-3xl font-bold text-center mb-6 text-[#1a602d]">Accordion Component</h2>
          
          <div className="w-full px-4 md:px-6 lg:px-8">
            <Accordion 
              items={accordionItems} 
              allowMultiple={true} 
              className="w-full"
            />
          </div>
        </Section>
        
        {/* Form Components Section */}
        <Section bg="light" containerSize="lg">
          <h2 className="text-3xl font-bold text-center mb-8 text-[#1a602d]">Form Components</h2>
          
          <Card variant="default" shadow={true} className="max-w-xl mx-auto">
            <h3 className="text-xl font-bold mb-6">Sample Form</h3>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Select an option:</label>
              <RadioGroup
                options={radioOptions}
                name="example-radio"
                value={radioValue}
                onChange={setRadioValue}
              />
            </div>
            
            <div className="flex space-x-4">
              <Button variant="primary">
                Submit
              </Button>
              
              <Button variant="secondary">
                Cancel
              </Button>
            </div>
          </Card>
        </Section>
        
        {/* Icons Section */}
        <Section bg="white" containerSize="lg">
          <h2 className="text-3xl font-bold text-center mb-8 text-[#1a602d]">Icon Component</h2>
          
          <div className="flex justify-center space-x-8">
            <div className="text-center">
              <Icon name="menu" size="48" className="text-[#147A31]" />
              <p className="mt-2">Menu Icon</p>
            </div>
            
            <div className="text-center">
              <Icon name="arrowDown" size="48" className="text-[#147A31]" />
              <p className="mt-2">Arrow Icon</p>
            </div>
            
            <div className="text-center">
              <Icon name="whatsapp" size="48" className="text-[#147A31]" />
              <p className="mt-2">WhatsApp Icon</p>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
};

export default ExamplePage; 