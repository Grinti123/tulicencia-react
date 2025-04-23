import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ServiceSelection = () => {
  const [activeService, setActiveService] = useState(null);
  const [selectedPersonalOption, setSelectedPersonalOption] = useState('');
  const [selectedVehicleOption, setSelectedVehicleOption] = useState('');

  useEffect(() => {
    // Initialize dotLottie players when component mounts
    const loadDotLottie = async () => {
      if (typeof window !== 'undefined') {
        if (!document.querySelector('script[src*="dotlottie-player"]')) {
          const script = document.createElement('script');
          script.src = 'https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.js';
          script.async = true;
          document.body.appendChild(script);
        }
      }
    };

    loadDotLottie();
  }, []);

  const personalOptions = [
    { value: 'renovacion', label: 'Renovación de Licencia' },
    { value: 'duplicado', label: 'Duplicado de Licencia' },
    { value: 'reciprocidad', label: 'Licencia de Reciprocidad' },
  ];

  const vehicleOptions = [
    { value: 'traspaso', label: 'Traspaso de Vehículos' },
    { value: 'gestion-titulo', label: 'Gestión de Título' },
    { value: 'tablillas', label: 'Tablillas Especiales' },
    { value: 'gravamenes', label: 'Gravámenes' },
    { value: 'record', label: 'Record Choferil' },
  ];

  return (
    <section className="">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-2">¿Estás Listo?</h2>
          <p className="text-gray-900">Selecciona el servicio que necesitas:</p>
        </div>

        {/* Service Selection Buttons */}
        <div className="flex flex-row justify-center gap-4 md:gap-32 mb-6 md:mb-16">
          {/* Trámites de personas option */}
          <div className="flex flex-col items-center relative">
            <div className="w-40 h-40 md:w-56 md:h-56 mb-3 md:mb-8 flex items-center justify-center">
              <dotlottie-player
                src="/json/chicolentes.json"
                background="transparent"
                speed="1"
                style={{ width: '100%', height: '100%' }}
                loop
                autoplay
              ></dotlottie-player>
            </div>

            <button
              onClick={() => setActiveService('personas')}
              className={`py-2 md:py-3 px-3 md:px-8 border-2 border-green-700 text-xs md:text-base font-medium rounded-full transition-colors whitespace-nowrap ${
                activeService === 'personas'
                  ? 'bg-green-700 text-white'
                  : 'text-green-700 hover:bg-green-50'
              }`}
            >
              Trámites de personas
            </button>
          </div>

          {/* Trámites de vehículos option */}
          <div className="flex flex-col items-center relative">
            <div className="w-40 h-40 md:w-56 md:h-56 mb-3 md:mb-8 flex items-center justify-center">
              <dotlottie-player
                src="/json/carrito.json"
                background="transparent"
                speed="1"
                style={{ width: '100%', height: '100%' }}
                loop
                autoplay
              ></dotlottie-player>
            </div>

            <button
              onClick={() => setActiveService('vehiculos')}
              className={`py-2 md:py-3 px-3 md:px-8 border-2 border-green-700 text-xs md:text-base font-medium rounded-full transition-colors whitespace-nowrap ${
                activeService === 'vehiculos'
                  ? 'bg-green-700 text-white'
                  : 'text-green-700 hover:bg-green-50'
              }`}
            >
              Trámites de vehículos
            </button>
          </div>
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
              <div className="bg-[#f1f1ff] rounded-2xl p-4 md:p-6 flex flex-col">
                <div className="w-40 h-40 md:w-48 md:h-48 mb-3 md:mb-4 mx-auto">
                  <dotlottie-player
                    src="/json/chicolentes.json"
                    background="transparent"
                    speed="1"
                    style={{ width: '100%', height: '100%' }}
                    loop
                    autoplay
                  ></dotlottie-player>
                </div>

                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mt-2 md:mt-4 mb-2 md:mb-3">
                  Trámites de personas
                </h3>
                <p className="text-gray-600 text-sm md:text-base mb-4 md:mb-6">
                  Gestionamos tus trámites desde la solicitud hasta la entrega de placas.
                </p>

                <Link
                  to="/iniciar-tramite"
                  className="inline-block bg-[#147A31] text-white py-2 md:py-3 px-6 md:px-8 rounded-full text-sm md:text-base font-medium hover:bg-indigo-700 transition-colors text-center w-fit"
                >
                  ¡Iniciar ahora!
                </Link>
              </div>

              {/* Form Options Column */}
              <div className="bg-[#f8f8ff] rounded-3xl p-4 md:p-8 relative overflow-hidden">
                <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm">
                  <div className="space-y-4 md:space-y-6">
                    {personalOptions.map((option) => (
                      <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="tramite-persona"
                          className="form-radio h-4 w-4 md:h-5 md:w-5 text-indigo-600"
                          value={option.value}
                          checked={selectedPersonalOption === option.value}
                          onChange={(e) => setSelectedPersonalOption(e.target.value)}
                        />
                        <span className="text-gray-700 text-sm md:text-base">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
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
              <div className="bg-[#f1f1ff] rounded-2xl p-4 md:p-6 flex flex-col">
                <div className="w-40 h-40 md:w-48 md:h-48 mb-3 md:mb-4 mx-auto">
                  <dotlottie-player
                    src="/json/carrito.json"
                    background="transparent"
                    speed="1"
                    style={{ width: '100%', height: '100%' }}
                    loop
                    autoplay
                  ></dotlottie-player>
                </div>

                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mt-2 md:mt-4 mb-2 md:mb-3">
                  Trámites de vehículos
                </h3>
                <p className="text-gray-600 text-sm md:text-base mb-4 md:mb-6">
                  Gestionamos tus trámites vehiculares con rapidez y eficiencia.
                </p>

                <Link
                  to="/iniciar-tramite-vehiculo"
                  className="inline-block bg-[#147A31] text-white py-2 md:py-3 px-6 md:px-8 rounded-full text-sm md:text-base font-medium hover:bg-indigo-700 transition-colors text-center w-fit"
                >
                  ¡Iniciar ahora!
                </Link>
              </div>

              {/* Form Options Column */}
              <div className="bg-[#f8f8ff] rounded-3xl p-4 md:p-8 relative overflow-hidden">
                <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm">
                  <div className="space-y-4 md:space-y-6">
                    {vehicleOptions.map((option) => (
                      <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="tramite-vehiculo"
                          className="form-radio h-4 w-4 md:h-5 md:w-5 text-indigo-600"
                          value={option.value}
                          checked={selectedVehicleOption === option.value}
                          onChange={(e) => setSelectedVehicleOption(e.target.value)}
                        />
                        <span className="text-gray-700 text-sm md:text-base">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSelection; 