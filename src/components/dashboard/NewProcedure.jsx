import React, { useState } from 'react';
import { Button, DotLottiePlayer } from '../../components/ui';

const NewProcedure = () => {
  const [selectedProcedure, setSelectedProcedure] = useState('');

  return (
    <div className="p-6 bg-gradient-to-br from-[#e8f8ee] via-white to-[#e8f8ee] rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold text-[#157a3c] mb-6">You can select any of the following procedures</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {/* License Procedures */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center mb-4">
          <DotLottiePlayer
            src="/json/chicolentes.json"
            autoplay={true}
            loop={false}
          />
          </div>
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                type="radio"
                id="license-renewal"
                name="procedure"
                value="license-renewal"
                className="w-4 h-4 text-[#157a3c] border-gray-300 focus:ring-[#157a3c]"
                onChange={(e) => setSelectedProcedure(e.target.value)}
              />
              <label htmlFor="license-renewal" className="ml-2 text-gray-700">License Renewal</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="duplicate-license"
                name="procedure"
                value="duplicate-license"
                className="w-4 h-4 text-[#157a3c] border-gray-300 focus:ring-[#157a3c]"
                onChange={(e) => setSelectedProcedure(e.target.value)}
              />
              <label htmlFor="duplicate-license" className="ml-2 text-gray-700">Duplicate License</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="reciprocity-license"
                name="procedure"
                value="reciprocity-license"
                className="w-4 h-4 text-[#157a3c] border-gray-300 focus:ring-[#157a3c]"
                onChange={(e) => setSelectedProcedure(e.target.value)}
              />
              <label htmlFor="reciprocity-license" className="ml-2 text-gray-700">Reciprocity License</label>
            </div>
          </div>
        </div>

        {/* Vehicle Procedures */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center mb-4">
          <DotLottiePlayer
            src="/json/carrito.json"
            autoplay={true}
            loop={false}
          />
          </div>
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                type="radio"
                id="vehicle-transfer"
                name="procedure"
                value="vehicle-transfer"
                className="w-4 h-4 text-[#157a3c] border-gray-300 focus:ring-[#157a3c]"
                onChange={(e) => setSelectedProcedure(e.target.value)}
              />
              <label htmlFor="vehicle-transfer" className="ml-2 text-gray-700">Vehicle Transfer</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="title-management"
                name="procedure"
                value="title-management"
                className="w-4 h-4 text-[#157a3c] border-gray-300 focus:ring-[#157a3c]"
                onChange={(e) => setSelectedProcedure(e.target.value)}
              />
              <label htmlFor="title-management" className="ml-2 text-gray-700">Title Management</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="tablillas-incapacidad"
                name="procedure"
                value="tablillas-incapacidad"
                className="w-4 h-4 text-[#157a3c] border-gray-300 focus:ring-[#157a3c]"
                onChange={(e) => setSelectedProcedure(e.target.value)}
              />
              <label htmlFor="tablillas-incapacidad" className="ml-2 text-gray-700">Tablillas Incapacidad</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="liens"
                name="procedure"
                value="liens"
                className="w-4 h-4 text-[#157a3c] border-gray-300 focus:ring-[#157a3c]"
                onChange={(e) => setSelectedProcedure(e.target.value)}
              />
              <label htmlFor="liens" className="ml-2 text-gray-700">Liens</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="drivers-record"
                name="procedure"
                value="drivers-record"
                className="w-4 h-4 text-[#157a3c] border-gray-300 focus:ring-[#157a3c]"
                onChange={(e) => setSelectedProcedure(e.target.value)}
              />
              <label htmlFor="drivers-record" className="ml-2 text-gray-700">Driver's Record</label>
            </div>
          </div>
        </div>
      </div>

      <Button
        variant="primary"
        className="mt-6 mx-auto block"
        disabled={!selectedProcedure}
      >
        Start procedure
      </Button>
    </div>
  );
};

export default NewProcedure;