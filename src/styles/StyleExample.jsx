import React, { useState } from 'react';

const StyleExample = () => {
  const [activeTab, setActiveTab] = useState('colors');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="bg-background-light min-h-screen py-12">
      <div className="content-container fade-in">
        <h1 className="text-3xl font-bold text-primary mb-8">Custom Styles Example</h1>
        
        {/* Navigation Tabs */}
        <div className="flex space-x-2 mb-8 overflow-x-auto pb-2">
          {['colors', 'buttons', 'cards', 'forms'].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`btn px-4 py-2 ${
                activeTab === tab
                  ? 'btn-primary shadow-button'
                  : 'btn-secondary'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        
        {/* Colors Section */}
        {activeTab === 'colors' && (
          <div className="slide-in">
            <h2 className="text-xl font-semibold text-text-primary mb-4">Color System</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="card">
                <h3 className="font-medium mb-4">Primary Colors</h3>
                <div className="space-y-2">
                  <div className="h-12 bg-primary rounded flex items-center justify-center text-white">
                    Primary
                  </div>
                  <div className="h-12 bg-primary-dark rounded flex items-center justify-center text-white">
                    Primary Dark
                  </div>
                  <div className="h-12 bg-primary-light rounded flex items-center justify-center text-white">
                    Primary Light
                  </div>
                  <div className="h-12 bg-primary-lighter rounded flex items-center justify-center text-primary">
                    Primary Lighter
                  </div>
                </div>
              </div>
              
              <div className="card">
                <h3 className="font-medium mb-4">Secondary Colors</h3>
                <div className="space-y-2">
                  <div className="h-12 bg-secondary rounded flex items-center justify-center text-text-primary">
                    Secondary
                  </div>
                  <div className="h-12 bg-secondary-dark rounded flex items-center justify-center text-text-primary">
                    Secondary Dark
                  </div>
                </div>
              </div>
              
              <div className="card">
                <h3 className="font-medium mb-4">Text Colors</h3>
                <div className="space-y-2">
                  <div className="h-12 bg-white rounded flex items-center justify-center text-text-primary">
                    Text Primary
                  </div>
                  <div className="h-12 bg-white rounded flex items-center justify-center text-text-gray">
                    Text Gray
                  </div>
                  <div className="h-12 bg-white rounded flex items-center justify-center text-text-dark">
                    Text Dark
                  </div>
                  <div className="h-12 bg-white rounded flex items-center justify-center text-text-light">
                    Text Light
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Buttons Section */}
        {activeTab === 'buttons' && (
          <div className="slide-in">
            <h2 className="text-xl font-semibold text-text-primary mb-4">Buttons</h2>
            
            <div className="card mb-8">
              <h3 className="font-medium mb-4">Button Variants</h3>
              <div className="flex flex-wrap gap-4">
                <button className="btn btn-primary">Primary Button</button>
                <button className="btn btn-secondary">Secondary Button</button>
                <button className="btn btn-text">Text Button</button>
              </div>
            </div>
            
            <div className="card mb-8">
              <h3 className="font-medium mb-4">Button with Shadow</h3>
              <button className="btn btn-primary shadow-button">
                Primary Button with Shadow
              </button>
            </div>
            
            <div className="card">
              <h3 className="font-medium mb-4">Button Sizes</h3>
              <div className="flex flex-wrap items-center gap-4">
                <button className="btn btn-primary text-xs py-2 px-3">Small</button>
                <button className="btn btn-primary text-sm py-2 px-6">Medium</button>
                <button className="btn btn-primary text-base py-3 px-8">Large</button>
              </div>
            </div>
          </div>
        )}
        
        {/* Cards Section */}
        {activeTab === 'cards' && (
          <div className="slide-in">
            <h2 className="text-xl font-semibold text-text-primary mb-4">Cards</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card">
                <h3 className="text-lg font-medium text-primary mb-2">Default Card</h3>
                <p className="text-text-gray">
                  This is a default card with white background and shadow.
                </p>
              </div>
              
              <div className="card card-primary">
                <h3 className="text-lg font-medium text-primary mb-2">Primary Card</h3>
                <p className="text-text-gray">
                  This is a primary card with light green background.
                </p>
              </div>
              
              <div className="card shadow-lg">
                <h3 className="text-lg font-medium text-primary mb-2">Card with Larger Shadow</h3>
                <p className="text-text-gray">
                  This card has a larger shadow for emphasis.
                </p>
              </div>
              
              <div className="card rounded-lg">
                <h3 className="text-lg font-medium text-primary mb-2">Card with Less Rounded Corners</h3>
                <p className="text-text-gray">
                  This card has less rounded corners using Tailwind's built-in rounded-lg class.
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Forms Section */}
        {activeTab === 'forms' && (
          <div className="slide-in">
            <h2 className="text-xl font-semibold text-text-primary mb-4">Form Elements</h2>
            
            <div className="card">
              <h3 className="font-medium mb-4">Input Fields</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-text-primary font-medium mb-2">
                    Default Input
                  </label>
                  <input 
                    type="text" 
                    className="form-input"
                    placeholder="Enter your name" 
                  />
                </div>
                
                <div>
                  <label className="block text-text-primary font-medium mb-2">
                    Input with Error
                  </label>
                  <input 
                    type="text" 
                    className="form-input form-error"
                    placeholder="Enter your email" 
                  />
                  <p className="mt-1 text-form-error text-sm">
                    Please enter a valid email address
                  </p>
                </div>
                
                <div>
                  <label className="block text-text-primary font-medium mb-2">
                    Disabled Input
                  </label>
                  <input 
                    type="text" 
                    className="form-input bg-gray-100 cursor-not-allowed"
                    placeholder="This field is disabled"
                    disabled
                  />
                </div>
                
                <div>
                  <label className="block text-text-primary font-medium mb-2">
                    Select Dropdown
                  </label>
                  <select className="form-input">
                    <option value="">Select an option</option>
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StyleExample; 