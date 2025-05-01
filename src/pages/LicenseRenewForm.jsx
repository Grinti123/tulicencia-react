import React, { useState } from 'react';
import { HeaderProcedure, Footer } from '../components';
import { Container, Button, InputForm, RadioGroup, DotLottiePlayer } from '../components/ui';

const LicenseRenewForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal information
    fullName: '',
    licenseNumber: '',
    expiryDate: '',
    dateOfBirth: '',
    phoneNumber: '',
    email: '',
    
    // Address information
    address: '',
    city: '',
    state: '',
    zipCode: '',
    
    // License options
    licenseType: 'standard',
    renewalType: 'regular',
    organDonor: false,
    
    // Payment information
    paymentMethod: 'creditCard',
    cardNumber: '',
    expirationDate: '',
    cvv: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleRadioChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    setStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    // Submit the form data to the server
    // Then navigate to the next step or confirmation page
    setStep(5); // Go to thank you page
  };
  
  // Main form container
  const renderStepContainer = (title, content) => (
    <div className="min-h-screen flex flex-col bg-[#f7fdf9]">
      <HeaderProcedure title="License Renewal Form" />
      <main className="flex-grow py-8">
        <Container size="lg">
          <div className="bg-[#e8f8ee] rounded-3xl p-6 md:p-10 shadow-sm">
            {/* Progress indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                {[1, 2, 3, 4].map((stepNumber) => (
                  <div key={stepNumber} className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step >= stepNumber ? 'bg-[#157a3c] text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {stepNumber}
                    </div>
                    <span className="text-sm mt-2">
                      {stepNumber === 1 ? 'Personal Info' : 
                       stepNumber === 2 ? 'Address' : 
                       stepNumber === 3 ? 'License Options' :
                       'Payment'}
                    </span>
                  </div>
                ))}
              </div>
              <div className="relative mt-2">
                <div className="absolute top-0 left-0 h-1 bg-gray-200 w-full"></div>
                <div 
                  className="absolute top-0 left-0 h-1 bg-[#157a3c]" 
                  style={{ width: `${(step - 1) * 33.33}%` }}
                ></div>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold text-[#157a3c] mb-6">{title}</h2>
            
            {content}
            
            <div className="flex flex-col-reverse md:flex-row md:justify-between mt-8 gap-4">
              {step > 1 && step !== 5 ? (
                <Button 
                  onClick={prevStep}
                  variant="secondary"
                >
                  Previous
                </Button>
              ) : (
                <div></div>
              )}
              
              {step < 4 ? (
                <Button 
                  onClick={nextStep}
                  variant="primary"
                >
                  Next
                </Button>
              ) : step === 4 ? (
                <Button 
                  onClick={handleSubmit}
                  variant="primary"
                >
                  Submit
                </Button>
              ) : null}
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );

  // Step 1: Personal Information
  const renderPersonalInfoStep = () => {
    const content = (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputForm
          id="fullName"
          name="fullName"
          label="Full Name"
          type="text"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Enter your full name"
          required={true}
        />
        <InputForm
          id="licenseNumber"
          name="licenseNumber"
          label="License Number"
          type="text"
          value={formData.licenseNumber}
          onChange={handleChange}
          placeholder="Enter your license number"
          required={true}
        />
        <InputForm
          id="expiryDate"
          name="expiryDate"
          label="License Expiry Date"
          type="date"
          value={formData.expiryDate}
          onChange={handleChange}
          required={true}
        />
        <InputForm
          id="dateOfBirth"
          name="dateOfBirth"
          label="Date of Birth"
          type="date"
          value={formData.dateOfBirth}
          onChange={handleChange}
          required={true}
        />
        <InputForm
          id="phoneNumber"
          name="phoneNumber"
          label="Phone Number"
          type="tel"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Enter your phone number"
          required={true}
        />
        <InputForm
          id="email"
          name="email"
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email address"
          required={true}
        />
      </div>
    );

    return renderStepContainer("Personal Information", content);
  };

  // Step 2: Address Information
  const renderAddressStep = () => {
    const content = (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputForm
          id="address"
          name="address"
          label="Street Address"
          type="text"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter your street address"
          required={true}
          className="md:col-span-2"
        />
        <InputForm
          id="city"
          name="city"
          label="City"
          type="text"
          value={formData.city}
          onChange={handleChange}
          placeholder="Enter your city"
          required={true}
        />
        <InputForm
          id="state"
          name="state"
          label="State"
          type="text"
          value={formData.state}
          onChange={handleChange}
          placeholder="Enter your state"
          required={true}
        />
        <InputForm
          id="zipCode"
          name="zipCode"
          label="Zip Code"
          type="text"
          value={formData.zipCode}
          onChange={handleChange}
          placeholder="Enter your zip code"
          required={true}
        />
      </div>
    );

    return renderStepContainer("Address Information", content);
  };

  // Step 3: License Options
  const renderLicenseOptionsStep = () => {
    const licenseTypeOptions = [
      { value: 'standard', label: 'Standard License' },
      { value: 'enhanced', label: 'Enhanced License' },
      { value: 'realid', label: 'Real ID Compliant' }
    ];
    
    const renewalTypeOptions = [
      { value: 'regular', label: 'Regular Renewal (4 years)' },
      { value: 'extended', label: 'Extended Renewal (8 years)' }
    ];

    const content = (
      <div className="space-y-8">
        <div>
          <label className="block text-gray-700 font-medium mb-2">License Type</label>
          <RadioGroup
            options={licenseTypeOptions}
            value={formData.licenseType}
            onChange={(value) => handleRadioChange('licenseType', value)}
          />
        </div>
        
        <div>
          <label className="block text-gray-700 font-medium mb-2">Renewal Period</label>
          <RadioGroup
            options={renewalTypeOptions}
            value={formData.renewalType}
            onChange={(value) => handleRadioChange('renewalType', value)}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="organDonor"
            name="organDonor"
            checked={formData.organDonor}
            onChange={handleChange}
            className="h-5 w-5 text-[#157a3c] focus:ring-[#157a3c] border-gray-300 rounded"
          />
          <label htmlFor="organDonor" className="text-gray-700">
            I would like to be registered as an organ donor
          </label>
        </div>
      </div>
    );

    return renderStepContainer("License Options", content);
  };

  // Step 4: Payment Information
  const renderPaymentStep = () => {
    const paymentMethodOptions = [
      { value: 'creditCard', label: 'Credit Card' },
      { value: 'debitCard', label: 'Debit Card' }
    ];

    const content = (
      <div className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Payment Method</label>
          <RadioGroup
            options={paymentMethodOptions}
            value={formData.paymentMethod}
            onChange={(value) => handleRadioChange('paymentMethod', value)}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputForm
            id="cardNumber"
            name="cardNumber"
            label="Card Number"
            type="text"
            value={formData.cardNumber}
            onChange={handleChange}
            placeholder="Enter your card number"
            required={true}
            className="md:col-span-2"
          />
          
          <InputForm
            id="expirationDate"
            name="expirationDate"
            label="Expiration Date (MM/YY)"
            type="text"
            value={formData.expirationDate}
            onChange={handleChange}
            placeholder="MM/YY"
            required={true}
          />
          
          <InputForm
            id="cvv"
            name="cvv"
            label="CVV"
            type="text"
            value={formData.cvv}
            onChange={handleChange}
            placeholder="CVV"
            required={true}
          />
        </div>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-lg text-gray-800 mb-2">Payment Summary</h3>
          <div className="flex justify-between text-gray-600 mb-1">
            <span>License Renewal Fee:</span>
            <span>{formData.renewalType === 'regular' ? '$50.00' : '$90.00'}</span>
          </div>
          <div className="flex justify-between text-gray-600 mb-1">
            <span>Processing Fee:</span>
            <span>$5.00</span>
          </div>
          <div className="border-t border-gray-300 my-2"></div>
          <div className="flex justify-between font-semibold text-gray-800">
            <span>Total:</span>
            <span>{formData.renewalType === 'regular' ? '$55.00' : '$95.00'}</span>
          </div>
        </div>
      </div>
    );

    return renderStepContainer("Payment Information", content);
  };

  // Step 5: Thank You
  const renderThankYouStep = () => {
    const content = (
      <div className="text-center py-6">
        <div className="w-24 h-24 mx-auto mb-4">
          <DotLottiePlayer
            src="/json/checkmark.json"
            autoplay={true}
            loop={false}
          />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">License Renewal Submitted!</h2>
        <p className="text-gray-600 mb-6">Your license renewal request has been successfully submitted. You will receive a confirmation email shortly.</p>
        <p className="text-gray-700 mb-8">Reference Number: LR-{Math.floor(Math.random() * 1000000)}</p>
        <Button
          variant="primary"
          type="button"
          onClick={() => window.location.href = '/dashboard'}
        >
          Return to Dashboard
        </Button>
      </div>
    );

    return renderStepContainer("Success", content);
  };

  // Render the appropriate step
  switch(step) {
    case 1:
      return renderPersonalInfoStep();
    case 2:
      return renderAddressStep();
    case 3:
      return renderLicenseOptionsStep();
    case 4:
      return renderPaymentStep();
    case 5:
      return renderThankYouStep();
    default:
      return renderPersonalInfoStep();
  }
};

export default LicenseRenewForm;