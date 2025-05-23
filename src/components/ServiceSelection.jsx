import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, Container, DotLottiePlayer, RadioGroup, FadeIn, LinkButton } from './ui';
import useProcedures from '../hooks/useProcedures';
import useLogin from '../hooks/useLogin';

/**
 * Service Selection component with interactive selection options
 * Uses reusable UI components and fetches procedures
 */
const ServiceSelection = () => {
  const navigate = useNavigate();
  const [activeService, setActiveService] = useState(null);
  const [selectedPersonalOption, setSelectedPersonalOption] = useState('');
  const [selectedVehicleOption, setSelectedVehicleOption] = useState('');
  
  // Use the custom hooks
  const { isLoading, error, groupProceduresByType } = useProcedures();
  const { checkAuth } = useLogin();
  const { licenseOptions, vehicleOptions } = groupProceduresByType();

  // Function to check auth status and redirect accordingly
  const handleProcedureSelect = (e) => {
    e.preventDefault();
    
    // Check if user is authenticated
    const isAuthenticated = checkAuth();
    
    if (isAuthenticated) {
      // If authenticated, redirect to new procedure page
      navigate('/dashboard/new-procedure');
    } else {
      // If not authenticated, redirect to login page
      navigate('/login');
    }
  };

  // Get path based on selected value
  const getPersonalProcedurePath = () => {
    return selectedPersonalOption ? `/procedures/license/${selectedPersonalOption}` : '/procedures';
  };

  const getVehicleProcedurePath = () => {
    return selectedVehicleOption ? `/procedures/vehicle/${selectedVehicleOption}` : '/procedures';
  };

  return (
    <Container>
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-2">¿Estás Listo?</h2>
        <p className="text-gray-900">Selecciona el servicio que necesitas:</p>
      </div>

      {/* Service Selection Buttons */}
      <div className="flex flex-row justify-center gap-4 md:gap-32 mb-6 md:mb-16">
        {/* Trámites de personas option */}
        <FadeIn className="flex flex-col items-center relative">
          <div className="w-40 h-40 md:w-56 md:h-56 mb-3 md:mb-8 flex items-center justify-center">
            <DotLottiePlayer
              src="/json/chicolentes.json"
              autoplay={true}
              loop={true}
            />
          </div>

          <Button
            onClick={() => setActiveService('personas')}
            variant={activeService === 'personas' ? 'primary' : 'secondary'}
            className="whitespace-nowrap"
          >
            Trámites de personas
          </Button>
        </FadeIn>

        {/* Trámites de vehículos option */}
        <FadeIn className="flex flex-col items-center relative" duration="1.2s">
          <div className="w-40 h-40 md:w-56 md:h-56 mb-3 md:mb-8 flex items-center justify-center">
            <DotLottiePlayer
              src="/json/carrito.json"
              autoplay={true}
              loop={true}
            />
          </div>

          <Button
            onClick={() => setActiveService('vehiculos')}
            variant={activeService === 'vehiculos' ? 'primary' : 'secondary'}
            className="whitespace-nowrap"
          >
            Trámites de vehículos
          </Button>
        </FadeIn>
      </div>

      {/* Service Details Sections */}
      <div className="mt-6 md:mt-8">
        {/* Trámites de personas details */}
        <div
          className={`transition-opacity duration-500 ease-in-out ${
            activeService === 'personas' ? 'opacity-100' : 'opacity-0 hidden'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center">
            {/* Image and Text Column */}
            <Card variant="primary" className="flex flex-col">
              <div className="w-40 h-40 md:w-48 md:h-48 mb-3 md:mb-4 mx-auto">
                <DotLottiePlayer
                  src="/json/chicolentes.json"
                  autoplay={true}
                  loop={true}
                />
              </div>

              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mt-2 md:mt-4 mb-2 md:mb-3">
                Trámites de personas
              </h3>
              <p className="text-gray-600 text-sm md:text-base mb-4 md:mb-6">
                Gestionamos tus trámites desde la solicitud hasta la entrega de documentos.
              </p>

              <Button
                onClick={handleProcedureSelect}
                variant="primary"
                size="md"
                disabled={!selectedPersonalOption}
              >
                ¡Iniciar ahora!
              </Button>
            </Card>

            {/* RadioGroup Options Column */}
            <Card variant="secondary" className="rounded-3xl p-4 md:p-8 relative overflow-hidden">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Servicios de Licencia</h3>
              <Card variant="default" shadow={true} className="p-4 md:p-6">
                {isLoading ? (
                  <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-700"></div>
                  </div>
                ) : error ? (
                  <div className="text-red-500 p-2">{error}</div>
                ) : (
                  <RadioGroup
                    options={licenseOptions}
                    name="tramite-persona"
                    value={selectedPersonalOption}
                    onChange={setSelectedPersonalOption}
                  />
                )}
              </Card>
            </Card>
          </div>
        </div>

        {/* Trámites de vehículos details */}
        <div
          className={`transition-opacity duration-500 ease-in-out ${
            activeService === 'vehiculos' ? 'opacity-100' : 'opacity-0 hidden'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center">
            {/* Image and Text Column */}
            <Card variant="primary" className="flex flex-col">
              <div className="w-40 h-40 md:w-48 md:h-48 mb-3 md:mb-4 mx-auto">
                <DotLottiePlayer
                  src="/json/carrito.json"
                  autoplay={true}
                  loop={true}
                />
              </div>

              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mt-2 md:mt-4 mb-2 md:mb-3">
                Trámites de vehículos
              </h3>
              <p className="text-gray-600 text-sm md:text-base mb-4 md:mb-6">
                Gestionamos tus trámites vehiculares con rapidez y eficiencia.
              </p>

              <Button
                onClick={handleProcedureSelect}
                variant="primary"
                size="md"
                disabled={!selectedVehicleOption}
              >
                ¡Iniciar ahora!
              </Button>
            </Card>

            {/* RadioGroup Options Column */}
            <Card variant="secondary" className="rounded-3xl p-4 md:p-8 relative overflow-hidden">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Servicios de Vehículos</h3>
              <Card variant="default" shadow={true} className="p-4 md:p-6">
                {isLoading ? (
                  <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-700"></div>
                  </div>
                ) : error ? (
                  <div className="text-red-500 p-2">{error}</div>
                ) : (
                  <RadioGroup
                    options={vehicleOptions}
                    name="tramite-vehiculo"
                    value={selectedVehicleOption}
                    onChange={setSelectedVehicleOption}
                  />
                )}
              </Card>
            </Card>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ServiceSelection; 