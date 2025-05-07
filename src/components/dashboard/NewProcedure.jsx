import React, { useState, useEffect } from 'react';
import { Button, DotLottiePlayer, RadioGroup } from '../../components/ui';
import { useNavigate } from 'react-router-dom';
import useProcedures from '../../hooks/useProcedures';

const NewProcedure = () => {
  const [selectedProcedure, setSelectedProcedure] = useState('');
  const navigate = useNavigate();
  const { isLoading, error, groupProceduresByType, fetchProcedures, procedures } = useProcedures();
  
  console.log('🏁 NewProcedure component rendering, procedures length:', procedures?.length || 0);
  
  // Get grouped procedures
  const { licenseOptions, vehicleOptions } = groupProceduresByType();
  
  console.log('🔢 Available procedures options:', { 
    licenseOptions: licenseOptions?.length || 0, 
    vehicleOptions: vehicleOptions?.length || 0 
  });

  useEffect(() => {
    console.log('📋 NewProcedure mounted, procedures status:', {
      isLoading,
      hasError: !!error,
      proceduresCount: procedures?.length || 0
    });
  }, [procedures, isLoading, error]);
  
  useEffect(() => {
    if (selectedProcedure) {
      console.log('✅ User selected procedure ID:', selectedProcedure);
    }
  }, [selectedProcedure]);

  const handleStartProcedure = () => {
    if (!selectedProcedure) return;
    
    console.log('▶️ Starting procedure with ID:', selectedProcedure);
    
    // Define routes for each procedure based on the tr_id
    const procedureRoutes = {
      1: '/procedures/license-renewal',
      2: '/procedures/duplicate-license',
      3: '/procedures/reciprocity-license',
      4: '/procedures/vehicle-transfer',
      5: '/procedures/title-management',
      6: '/procedures/tablillas-incapacidad',
      7: '/procedures/liens',
      8: '/procedures/drivers-record'
    };
    
    const targetRoute = procedureRoutes[selectedProcedure];
    console.log('🔀 Navigating to route:', targetRoute);
    
    // Navigate to the appropriate route
    navigate(targetRoute);
  };

  const handleBrowseAllProcedures = () => {
    console.log('🔍 User clicked on Browse All Procedures');
    navigate('/procedures');
  };

  const handleRetry = () => {
    console.log('🔄 Retrying procedure fetch...');
    fetchProcedures();
  };

  if (isLoading) {
    console.log('⏳ Rendering loading state...');
    return (
      <div className="p-6 bg-gradient-to-br from-[#e8f8ee] via-white to-[#e8f8ee] rounded-lg shadow-sm">
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#157a3c]"></div>
        </div>
      </div>
    );
  }

  if (error) {
    console.log('❌ Rendering error state:', error);
    return (
      <div className="p-6 bg-gradient-to-br from-[#e8f8ee] via-white to-[#e8f8ee] rounded-lg shadow-sm">
        <div className="text-center text-red-600">
          <p>{error}</p>
          <Button
            variant="secondary"
            className="mt-4"
            onClick={handleRetry}
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-[#e8f8ee] via-white to-[#e8f8ee] rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-[#157a3c]">Select a procedure</h2>
        <Button 
          variant="secondary"
          onClick={handleBrowseAllProcedures}
        >
          Browse All Procedures
        </Button>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {/* License Procedures */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-center mb-4">
            <DotLottiePlayer
              src="/json/chicolentes.json"
              autoplay={true}
              loop={true}
              style={{width: '170px'}}
            />
          </div>
          <h3 className="font-medium text-gray-800 mb-3">License Procedures</h3>
          {licenseOptions.length > 0 ? (
            <RadioGroup
              options={licenseOptions}
              name="license-procedures"
              value={selectedProcedure}
              onChange={setSelectedProcedure}
            />
          ) : (
            <p className="text-gray-500 text-sm">No license procedures available</p>
          )}
        </div>

        {/* Vehicle Procedures */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center mb-4">
            <DotLottiePlayer
              src="/json/carrito.json"
              autoplay={true}
              loop={true}
            />
          </div>
          <h3 className="font-medium text-gray-800 mb-3">Vehicle Procedures</h3>
          {vehicleOptions.length > 0 ? (
            <RadioGroup
              options={vehicleOptions}
              name="vehicle-procedures"
              value={selectedProcedure}
              onChange={setSelectedProcedure}
            />
          ) : (
            <p className="text-gray-500 text-sm">No vehicle procedures available</p>
          )}
        </div>
      </div>

      <Button
        variant="primary"
        className="mt-6 mx-auto block"
        disabled={!selectedProcedure}
        onClick={handleStartProcedure}
      >
        Start procedure
      </Button>
    </div>
  );
};

export default NewProcedure;