import React, { useEffect } from 'react';

const Features = () => {
  useEffect(() => {
    // Initialize dotLottie player when component mounts
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
    <section className="py-12 px-4 md:py-16 md:px-6 max-w-7xl mx-auto pb-30 lg:pb-0">
      <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
        <div className="order-1 md:order-1 flex justify-center">
          <dotlottie-player
            src="/json/capitolio2.json"
            background="transparent"
            speed="1"
            style={{ width: '100%', height: '100%' }}
            className="w-[300px] h-[300px] md:w-[700px] md:h-[700px] -mt-15 -mb-5 lg:-mt-0 lg:-mb-0"
            loop
            autoplay
          ></dotlottie-player>
        </div>

        <div className="order-2 md:order-2 text-center md:text-left">
          <h2 className="text-[28px] leading-tight md:text-4xl font-bold mb-4 text-[#1a602d]">
            <span className="block md:inline">Acercamos el gobierno</span>
            <span className="block md:inline">a los ciudadanos</span>
          </h2>

          <p className="text-[#224a33] text-[16px] leading-relaxed md:text-[20px]">
            No más días perdidos en largas filas ni tener que regresar porque olvidaste un documento. 
            Gestionamos tus trámites desde la solicitud hasta la entrega de licencias y permisos, 
            te ayudamos con las deudas o gravámenes y hasta negociamos planes de pago. 
            Nos encargamos de todo.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features; 