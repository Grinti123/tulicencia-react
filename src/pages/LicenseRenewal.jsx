import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { HeaderProcedure } from '../components';

const LicenseRenewal = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <HeaderProcedure />
      
      <main className="flex-grow py-8 md:py-12 bg-[#f5faee]">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-[#157a3c] mb-10">License Renewal</h1>
          
          <div className="bg-[#e8f8ee] p-6 md:p-10 rounded-2xl shadow-sm">
            <div className="grid md:grid-cols-2 gap-6 md:gap-10">
              {/* Requirements Section */}
              <div>
                <div className="bg-[#157a3c] text-white p-4 rounded-t-lg flex items-center">
                  <div className="flex-shrink-0 mr-4">
                    <img 
                      src="/img/avatar.jpg" 
                      alt="Requirements" 
                      className="w-12 h-12 rounded-full"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/48?text=👤";
                      }}
                    />
                  </div>
                  <h2 className="text-xl font-semibold">Requirements</h2>
                </div>
                
                <div className="bg-[#f7fdf9] p-5 rounded-b-lg space-y-4">
                  <div>
                    <p className="mb-3">
                      <span className="font-semibold">1.</span> Attach one of these documents: Photograph of the 
                      non-laminated Social Security card, or W2, or Form 480, 
                      or the most recent filed tax return, or Form 1099 from the 
                      Social Security Benefit Statement.
                    </p>
                    
                    <p className="mb-3">
                      <span className="font-semibold">2.</span> Birth Certificate
                    </p>
                    
                    <p className="mb-3">
                      <span className="font-semibold">3.</span> Attach one of these documents issued within the last 
                      60 days: water bill, electricity bill, or bank statement that 
                      certifies your current address. It must be under your 
                      name. If you don't have utilities or a bank account in 
                      your name, please complete Form DTOP-DIS-156, 
                      available in the forms section. Include the ID of the 
                      person listed on the address in a single PDF.
                    </p>
                    
                    <p className="mb-3">
                      <span className="font-semibold">4.</span> Selfie photo with a white background
                    </p>
                    
                    <p className="mb-3">
                      <span className="font-semibold">5.</span> Medical Certification for Driver's License Certificate is 
                      Form DTOP-DIS-260. A doctor will contact you.
                    </p>
                    
                    <p className="mb-3">
                      <span className="font-semibold">6.</span> Front and back photo of your expired or soon-to-
                      expire license
                    </p>
                    
                    <p className="mb-3">
                      <span className="font-semibold">7.</span> Please note that, in addition to the license processing 
                      fee, you must pay the following stamps: Internal 
                      Revenue (Code 5120) for $11, Internal Revenue (Code 
                      5120) for $1, Internal Revenue Voucher (Code 0842) for 
                      $2. These payments are required to complete your 
                      license process.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Forms Section */}
              <div className="flex flex-col">
                <div className="bg-[#157a3c] text-white p-4 rounded-t-lg flex items-center">
                  <div className="flex-shrink-0 mr-4">
                    <img 
                      src="/img/avatar.jpg" 
                      alt="Forms" 
                      className="w-12 h-12 rounded-full"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/48?text=📝";
                      }}
                    />
                  </div>
                  <h2 className="text-xl font-semibold">Forms to fill out</h2>
                </div>
                
                <div className="bg-[#f7fdf9] p-5 rounded-b-lg space-y-4 flex-grow">
                  <div>
                    <p className="mb-3">
                      <span className="font-semibold">1.</span> Form DTOP-DISC-256 Application for Driver's License 
                      Certificate for Motor Vehicles
                    </p>
                    
                    <p className="mb-3">
                      <span className="font-semibold">2.</span> DTOP-DIS-260 Medical Certification for Driver's License 
                      Certificate
                    </p>
                    
                    <p className="mb-4">
                      <span className="font-semibold">3.</span> If the utility or bank bills are not in your name, you 
                      must authorize it through Form DTOP-DIS-156 Primary 
                      Residence Certification and include a copy of the ID of 
                      the property owner. <a href="/forms/DTOP-DIS-156.pdf" className="text-[#157a3c] hover:text-[#1a602d] hover:underline cursor-pointer" download>(Click to download)</a>
                    </p>
                  </div>
                  
                  {/* Price section */}
                  <div className="mt-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#157a3c] mb-6">Price: $1</h2>
                    
                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                      <Link to="/procedures/license-renewal/form" className="bg-[#157a3c] hover:bg-[#1a602d] text-white font-semibold py-3 px-8 rounded-full shadow-sm transition duration-200 text-center w-full md:w-auto">
                        Start now
                      </Link>
                      
                      <Link to="/" className="bg-white hover:bg-gray-100 text-[#157a3c] font-semibold py-3 px-8 rounded-full border border-[#157a3c] shadow-sm transition duration-200 text-center w-full md:w-auto">
                        Go back
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-right mt-4">
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LicenseRenewal;