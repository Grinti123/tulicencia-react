import React, { useState } from 'react';
import { Button, InputForm, Container } from '../../components/ui';
import { HeaderProcedure, Footer } from '../../components';

const VehicleTransferPage = () => {
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
    window.scrollTo(0, 0);
  };

  const handlePrev = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const renderForm = () => (
    <div className="min-h-screen flex flex-col bg-[#f7fdf9]">
      <HeaderProcedure title="Vehicle Transfer" />
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
                  <InputForm
                    id="sellerName"
                    name="sellerName"
                    label="Full Name"
                    type="text"
                    value={formData.sellerName}
                    onChange={handleChange}
                    placeholder="Enter seller's full name"
                    required={true}
                  />
                  <InputForm
                    id="sellerID"
                    name="sellerID"
                    label="ID Number"
                    type="text"
                    value={formData.sellerID}
                    onChange={handleChange}
                    placeholder="Enter seller's ID number"
                    required={true}
                  />
                  <InputForm
                    id="sellerAddress"
                    name="sellerAddress"
                    label="Address"
                    type="text"
                    value={formData.sellerAddress}
                    onChange={handleChange}
                    placeholder="Enter seller's address"
                    required={true}
                  />
                  <InputForm
                    id="sellerPhone"
                    name="sellerPhone"
                    label="Phone Number"
                    type="tel"
                    value={formData.sellerPhone}
                    onChange={handleChange}
                    placeholder="Enter seller's phone number"
                    required={true}
                  />
                  <InputForm
                    id="sellerEmail"
                    name="sellerEmail"
                    label="Email Address"
                    type="email"
                    value={formData.sellerEmail}
                    onChange={handleChange}
                    placeholder="Enter seller's email address"
                    required={true}
                  />
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
                  <InputForm
                    id="buyerName"
                    name="buyerName"
                    label="Full Name"
                    type="text"
                    value={formData.buyerName}
                    onChange={handleChange}
                    placeholder="Enter buyer's full name"
                    required={true}
                  />
                  <InputForm
                    id="buyerID"
                    name="buyerID"
                    label="ID Number"
                    type="text"
                    value={formData.buyerID}
                    onChange={handleChange}
                    placeholder="Enter buyer's ID number"
                    required={true}
                  />
                  <InputForm
                    id="buyerAddress"
                    name="buyerAddress"
                    label="Address"
                    type="text"
                    value={formData.buyerAddress}
                    onChange={handleChange}
                    placeholder="Enter buyer's address"
                    required={true}
                  />
                  <InputForm
                    id="buyerPhone"
                    name="buyerPhone"
                    label="Phone Number"
                    type="tel"
                    value={formData.buyerPhone}
                    onChange={handleChange}
                    placeholder="Enter buyer's phone number"
                    required={true}
                  />
                  <InputForm
                    id="buyerEmail"
                    name="buyerEmail"
                    label="Email Address"
                    type="email"
                    value={formData.buyerEmail}
                    onChange={handleChange}
                    placeholder="Enter buyer's email address"
                    required={true}
                  />
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
                  <InputForm
                    id="licensePlate"
                    name="licensePlate"
                    label="License Plate Number"
                    type="text"
                    value={formData.licensePlate}
                    onChange={handleChange}
                    placeholder="Enter vehicle's license plate"
                    required={true}
                  />
                  <InputForm
                    id="vin"
                    name="vin"
                    label="VIN Number"
                    type="text"
                    value={formData.vin}
                    onChange={handleChange}
                    placeholder="Enter vehicle VIN number"
                    required={true}
                  />
                  <InputForm
                    id="make"
                    name="make"
                    label="Make"
                    type="text"
                    value={formData.make}
                    onChange={handleChange}
                    placeholder="Enter vehicle make"
                    required={true}
                  />
                  <InputForm
                    id="model"
                    name="model"
                    label="Model"
                    type="text"
                    value={formData.model}
                    onChange={handleChange}
                    placeholder="Enter vehicle model"
                    required={true}
                  />
                  <InputForm
                    id="year"
                    name="year"
                    label="Year"
                    type="number"
                    value={formData.year}
                    onChange={handleChange}
                    placeholder="Enter vehicle year"
                    required={true}
                  />
                  <InputForm
                    id="color"
                    name="color"
                    label="Color"
                    type="text"
                    value={formData.color}
                    onChange={handleChange}
                    placeholder="Enter vehicle color"
                    required={true}
                  />
                  <InputForm
                    id="odometer"
                    name="odometer"
                    label="Odometer Reading"
                    type="number"
                    value={formData.odometer}
                    onChange={handleChange}
                    placeholder="Enter current mileage"
                    required={true}
                  />
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
              <form onSubmit={handleSubmit}>
                <h2 className="text-xl font-medium text-gray-800 mb-4">Review Information</h2>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[#157a3c] mb-3">Seller Information</h3>
                  <div className="bg-white p-4 rounded-lg">
                    <p><strong>Name:</strong> {formData.sellerName}</p>
                    <p><strong>ID Number:</strong> {formData.sellerID}</p>
                    <p><strong>Address:</strong> {formData.sellerAddress}</p>
                    <p><strong>Phone:</strong> {formData.sellerPhone}</p>
                    <p><strong>Email:</strong> {formData.sellerEmail}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[#157a3c] mb-3">Buyer Information</h3>
                  <div className="bg-white p-4 rounded-lg">
                    <p><strong>Name:</strong> {formData.buyerName}</p>
                    <p><strong>ID Number:</strong> {formData.buyerID}</p>
                    <p><strong>Address:</strong> {formData.buyerAddress}</p>
                    <p><strong>Phone:</strong> {formData.buyerPhone}</p>
                    <p><strong>Email:</strong> {formData.buyerEmail}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[#157a3c] mb-3">Vehicle Information</h3>
                  <div className="bg-white p-4 rounded-lg">
                    <p><strong>License Plate:</strong> {formData.licensePlate}</p>
                    <p><strong>VIN:</strong> {formData.vin}</p>
                    <p><strong>Make:</strong> {formData.make}</p>
                    <p><strong>Model:</strong> {formData.model}</p>
                    <p><strong>Year:</strong> {formData.year}</p>
                    <p><strong>Color:</strong> {formData.color}</p>
                    <p><strong>Odometer Reading:</strong> {formData.odometer} miles</p>
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
                    Submit
                  </Button>
                </div>
              </form>
            )}

            {/* Step 5: Confirmation */}
            {step === 5 && (
              <div className="text-center py-6">
                <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Vehicle Transfer Submitted!</h2>
                <p className="text-gray-600 mb-6">Your request has been successfully submitted. A confirmation email has been sent to both the seller and buyer.</p>
                <p className="text-gray-700 mb-8">Reference Number: VT-{Math.floor(Math.random() * 1000000)}</p>
                <Button
                  variant="primary"
                  type="button"
                  onClick={() => window.location.href = '/dashboard'}
                >
                  Return to Dashboard
                </Button>
              </div>
            )}
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );

  return renderForm();
};

export default VehicleTransferPage; 