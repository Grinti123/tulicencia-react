import React, { useState } from 'react';
import { Button } from '../ui';

const LicenseRenewal = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    licenseNumber: '',
    expirationDate: '',
    fullName: '',
    idNumber: '',
    birthDate: '',
    address: '',
    phone: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process form submission logic here
    console.log("Form submitted:", formData);
    // Move to next step or completion
    setStep(step + 1);
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-semibold text-[#157a3c] mb-6">License Renewal</h1>
      
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= stepNumber ? 'bg-[#157a3c] text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {stepNumber}
              </div>
              <span className="text-sm mt-2">
                {stepNumber === 1 ? 'Personal Information' : 
                 stepNumber === 2 ? 'License Details' : 'Review & Submit'}
              </span>
            </div>
          ))}
        </div>
        <div className="relative mt-2">
          <div className="absolute top-0 left-0 h-1 bg-gray-200 w-full"></div>
          <div 
            className="absolute top-0 left-0 h-1 bg-[#157a3c]" 
            style={{ width: `${(step - 1) * 50}%` }}
          ></div>
        </div>
      </div>

      {/* Step 1: Personal Information */}
      {step === 1 && (
        <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#157a3c]"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="idNumber">Social Security / ID Number</label>
              <input
                type="text"
                id="idNumber"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#157a3c]"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="birthDate">Date of Birth</label>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#157a3c]"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#157a3c]"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#157a3c]"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="address">Residential Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#157a3c]"
                required
              />
            </div>
          </div>
          <div className="mt-8 flex justify-end">
            <Button
              variant="primary"
              type="submit"
            >
              Next
            </Button>
          </div>
        </form>
      )}

      {/* Step 2: License Details */}
      {step === 2 && (
        <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="licenseNumber">License Number</label>
              <input
                type="text"
                id="licenseNumber"
                name="licenseNumber"
                value={formData.licenseNumber}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#157a3c]"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="expirationDate">Expiration Date</label>
              <input
                type="date"
                id="expirationDate"
                name="expirationDate"
                value={formData.expirationDate}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#157a3c]"
                required
              />
            </div>
            <div className="md:col-span-2">
              <p className="text-gray-700 mb-2">License Category</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['A', 'B', 'C', 'D'].map(category => (
                  <div key={category} className="flex items-center">
                    <input
                      type="radio"
                      id={`category-${category}`}
                      name="category"
                      value={category}
                      className="w-4 h-4 text-[#157a3c] border-gray-300 focus:ring-[#157a3c]"
                    />
                    <label htmlFor={`category-${category}`} className="ml-2 text-gray-700">Category {category}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">Upload Documents</label>
              <div className="border-2 border-dashed border-gray-300 p-6 rounded-md text-center">
                <p className="text-gray-500 mb-2">Drag and drop your documents here, or</p>
                <Button variant="secondary" type="button">Browse Files</Button>
                <p className="text-sm text-gray-500 mt-2">Accepted formats: PDF, JPG, PNG (Max size: 5MB)</p>
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-between">
            <Button
              variant="secondary"
              type="button"
              onClick={handlePrev}
            >
              Previous
            </Button>
            <Button
              variant="primary"
              type="submit"
            >
              Next
            </Button>
          </div>
        </form>
      )}

      {/* Step 3: Review & Submit */}
      {step === 3 && (
        <div>
          <h2 className="text-xl font-medium text-gray-800 mb-4">Review Your Information</h2>
          <div className="bg-gray-50 p-4 rounded-md mb-6">
            <h3 className="font-medium text-gray-800 mb-2">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="text-gray-800">{formData.fullName || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">ID Number</p>
                <p className="text-gray-800">{formData.idNumber || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="text-gray-800">{formData.birthDate || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone Number</p>
                <p className="text-gray-800">{formData.phone || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="text-gray-800">{formData.email || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Residential Address</p>
                <p className="text-gray-800">{formData.address || 'Not provided'}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md mb-6">
            <h3 className="font-medium text-gray-800 mb-2">License Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">License Number</p>
                <p className="text-gray-800">{formData.licenseNumber || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Expiration Date</p>
                <p className="text-gray-800">{formData.expirationDate || 'Not provided'}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md mb-6">
            <h3 className="font-medium text-gray-800 mb-2">Payment Information</h3>
            <p className="text-gray-700 mb-4">Renewal Fee: $40.00</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="cardNumber">Card Number</label>
                <input
                  type="text"
                  id="cardNumber"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#157a3c]"
                  placeholder="1234 5678 9012 3456"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="expiryDate">Expiry Date</label>
                  <input
                    type="text"
                    id="expiryDate"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#157a3c]"
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="cvc">CVC</label>
                  <input
                    type="text"
                    id="cvc"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#157a3c]"
                    placeholder="123"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-between">
            <Button
              variant="secondary"
              type="button"
              onClick={handlePrev}
            >
              Previous
            </Button>
            <Button
              variant="primary"
              type="button"
              onClick={handleSubmit}
            >
              Submit Application
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LicenseRenewal; 