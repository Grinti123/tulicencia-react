import React, { useState } from 'react';
import { Button } from '../ui';

const VehicleTransfer = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Seller information
    sellerName: '',
    sellerID: '',
    sellerAddress: '',
    sellerPhone: '',
    sellerEmail: '',
    
    // Buyer information
    buyerName: '',
    buyerID: '',
    buyerAddress: '',
    buyerPhone: '',
    buyerEmail: '',
    
    // Vehicle information
    licensePlate: '',
    vin: '',
    make: '',
    model: '',
    year: '',
    color: '',
    odometer: ''
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
    // Move to completion or confirmation step
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
      <h1 className="text-2xl font-semibold text-[#157a3c] mb-6">Vehicle Transfer</h1>
      
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
                {stepNumber === 1 ? 'Seller Info' : 
                 stepNumber === 2 ? 'Buyer Info' : 
                 stepNumber === 3 ? 'Vehicle Info' :
                 'Review & Submit'}
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

      {/* Step 1: Seller Information */}
      {step === 1 && (
        <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
          <h2 className="text-xl font-medium text-gray-800 mb-4">Seller Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="sellerName">Full Name</label>
              <input
                type="text"
                id="sellerName"
                name="sellerName"
                value={formData.sellerName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#157a3c]"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="sellerID">ID Number</label>
              <input
                type="text"
                id="sellerID"
                name="sellerID"
                value={formData.sellerID}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#157a3c]"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="sellerAddress">Address</label>
              <input
                type="text"
                id="sellerAddress"
                name="sellerAddress"
                value={formData.sellerAddress}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#157a3c]"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="sellerPhone">Phone Number</label>
              <input
                type="tel"
                id="sellerPhone"
                name="sellerPhone"
                value={formData.sellerPhone}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#157a3c]"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="sellerEmail">Email Address</label>
              <input
                type="email"
                id="sellerEmail"
                name="sellerEmail"
                value={formData.sellerEmail}
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

      {/* Step 2: Buyer Information */}
      {step === 2 && (
        <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
          <h2 className="text-xl font-medium text-gray-800 mb-4">Buyer Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="buyerName">Full Name</label>
              <input
                type="text"
                id="buyerName"
                name="buyerName"
                value={formData.buyerName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#157a3c]"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="buyerID">ID Number</label>
              <input
                type="text"
                id="buyerID"
                name="buyerID"
                value={formData.buyerID}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#157a3c]"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="buyerAddress">Address</label>
              <input
                type="text"
                id="buyerAddress"
                name="buyerAddress"
                value={formData.buyerAddress}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#157a3c]"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="buyerPhone">Phone Number</label>
              <input
                type="tel"
                id="buyerPhone"
                name="buyerPhone"
                value={formData.buyerPhone}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#157a3c]"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="buyerEmail">Email Address</label>
              <input
                type="email"
                id="buyerEmail"
                name="buyerEmail"
                value={formData.buyerEmail}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#157a3c]"
                required
              />
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

      {/* Step 3: Vehicle Information */}
      {step === 3 && (
        <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
          <h2 className="text-xl font-medium text-gray-800 mb-4">Vehicle Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="licensePlate">License Plate</label>
              <input
                type="text"
                id="licensePlate"
                name="licensePlate"
                value={formData.licensePlate}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#157a3c]"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="vin">VIN Number</label>
              <input
                type="text"
                id="vin"
                name="vin"
                value={formData.vin}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#157a3c]"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="make">Make</label>
              <input
                type="text"
                id="make"
                name="make"
                value={formData.make}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#157a3c]"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="model">Model</label>
              <input
                type="text"
                id="model"
                name="model"
                value={formData.model}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#157a3c]"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="year">Year</label>
              <input
                type="number"
                id="year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#157a3c]"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="color">Color</label>
              <input
                type="text"
                id="color"
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#157a3c]"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="odometer">Odometer Reading</label>
              <input
                type="number"
                id="odometer"
                name="odometer"
                value={formData.odometer}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#157a3c]"
                required
              />
            </div>
          </div>
          <div className="md:col-span-2 mt-6">
            <label className="block text-gray-700 mb-2">Upload Documents</label>
            <div className="border-2 border-dashed border-gray-300 p-6 rounded-md text-center">
              <p className="text-gray-500 mb-2">Please upload the following documents:</p>
              <ul className="text-gray-600 mb-4 text-left list-disc list-inside">
                <li>Vehicle title</li>
                <li>Sales receipt</li>
                <li>Bill of sale</li>
              </ul>
              <Button variant="secondary" type="button">Browse Files</Button>
              <p className="text-sm text-gray-500 mt-2">Accepted formats: PDF, JPG, PNG (Max size: 5MB)</p>
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

      {/* Step 4: Review & Submit */}
      {step === 4 && (
        <div>
          <h2 className="text-xl font-medium text-gray-800 mb-4">Review Your Information</h2>
          
          <div className="bg-gray-50 p-4 rounded-md mb-6">
            <h3 className="font-medium text-gray-800 mb-2">Seller Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="text-gray-800">{formData.sellerName || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">ID Number</p>
                <p className="text-gray-800">{formData.sellerID || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="text-gray-800">{formData.sellerAddress || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="text-gray-800">{formData.sellerPhone || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-800">{formData.sellerEmail || 'Not provided'}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md mb-6">
            <h3 className="font-medium text-gray-800 mb-2">Buyer Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="text-gray-800">{formData.buyerName || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">ID Number</p>
                <p className="text-gray-800">{formData.buyerID || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="text-gray-800">{formData.buyerAddress || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="text-gray-800">{formData.buyerPhone || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-800">{formData.buyerEmail || 'Not provided'}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md mb-6">
            <h3 className="font-medium text-gray-800 mb-2">Vehicle Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">License Plate</p>
                <p className="text-gray-800">{formData.licensePlate || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">VIN</p>
                <p className="text-gray-800">{formData.vin || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Make</p>
                <p className="text-gray-800">{formData.make || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Model</p>
                <p className="text-gray-800">{formData.model || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Year</p>
                <p className="text-gray-800">{formData.year || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Color</p>
                <p className="text-gray-800">{formData.color || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Odometer Reading</p>
                <p className="text-gray-800">{formData.odometer || 'Not provided'}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md mb-6">
            <h3 className="font-medium text-gray-800 mb-2">Payment Information</h3>
            <p className="text-gray-700 mb-4">Transfer Fee: $25.00</p>
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
              Submit Transfer
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleTransfer; 