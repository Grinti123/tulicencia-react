import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  useEffect(() => {
    // Initialize dotLottie players when component mounts
    const loadDotLottie = async () => {
      if (typeof window !== 'undefined') {
        // Check if dotLottie script is already loaded
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

  return (
    <section className="bg-gradient-to-b from-[#ffffff] to-[#60f88b] px-4 md:px-6 pt-6 md:pt-20 pb-12 md:pb-50 rounded-b-[50px]">
      <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center max-w-7xl mx-auto">
        <div className="order-2 md:order-1 text-center md:text-left">
          <h1 className="text-[32px] leading-tight md:text-5xl font-bold mb-4 md:mb-6">
            <span className="text-[#1a602d] block md:inline">Olvídate de las </span>
            <span className="text-[#1a602d] block md:inline">filas y esperas</span>
          </h1>

          <p className="text-[#224a33] text-[16px] mb-6 md:mb-8 max-w-lg mx-auto md:mx-0">
            Realiza el trámite para renovar tu licencia, realizar un
            traspaso de vehículo y mucho más desde la comodidad de
            tu hogar.
          </p>

          <div className="flex justify-center md:justify-start">
            <Link 
              to="/servicios" 
              className="bg-[#1a602d] hover:bg-[#155223] text-white px-12 py-3 rounded-full font-bold transition-colors md:px-8"
            >
              Comienza ahora
            </Link>
          </div>
        </div>

        <div className="order-1 md:order-2 relative flex justify-center md:justify-end">
          <div className="absolute inset-0">
            <dotlottie-player
              src="/json/carro-home.json"
              background="transparent"
              speed="1"
              style={{ width: '100%', height: '100%' }}
              autoplay
            ></dotlottie-player>
          </div>
          <div className="relative z-10">
            <dotlottie-player
              src="/json/personashome2.json"
              background="transparent"
              speed="1"
              style={{ width: '100%', height: '100%' }}
              loop
              autoplay
            ></dotlottie-player>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 