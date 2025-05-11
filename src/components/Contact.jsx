import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Contact = () => {
  const containerRef = useRef(null);
  const lottieRef = useRef(null);

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

  useEffect(() => {
    const handleContactAnimation = () => {
      const container = containerRef.current;
      const lottie = lottieRef.current;

      if (!container || !lottie) return;

      const containerRect = container.getBoundingClientRect();
      const containerTop = containerRect.top;
      const containerHeight = container.offsetHeight;
      const windowHeight = window.innerHeight;

      // Calculate how much of the section is visible in the viewport
      const visibleRatio = Math.max(0, Math.min(1,
        (windowHeight - containerTop) / Math.min(windowHeight, containerHeight)
      ));

      // Map visibleRatio (0-1) to a position value (30px to -30px)
      const positionY = 30 - (visibleRatio * 60);

      // Apply position to lottie
      lottie.style.transform = `translateY(${positionY}px)`;
    };

    window.addEventListener('scroll', handleContactAnimation);
    handleContactAnimation(); // Initial call

    return () => window.removeEventListener('scroll', handleContactAnimation);
  }, []);

  return (
    <section className="py-8 px-4 md:px-8 lg:px-20 relative bg-background-white">
      <div className="w-full max-w-[100%] mx-auto bg-[#147A31] rounded-[50px] overflow-hidden shadow-card relative min-h-[400px]">
        <div className="flex flex-col md:flex-row items-center justify-between p-8 md:p-12">
          <div className="text-white mb-4 md:mb-0 md:w-1/2 md:pr-12 text-center md:text-left relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Una nueva manera de realizar tus trámites
            </h2>
            <div className="w-[104px] h-[2px] bg-white mb-6 mx-auto md:mx-0"></div>
            <p className="mb-8 text-base md:text-lg max-w-[500px]">
              Utiliza las ventajas de la comunicación y procesos digitales con el apoyo
              inmediato y constante de nuestros especialistas, disponibles por teléfono,
              chat y WhatsApp a tu conveniencia.
            </p>
            <Link 
              to="/register" 
              className="inline-block bg-white text-[#147A31] py-3 px-8 rounded-full font-bold hover:bg-gray-100 transition-colors"
            >
              Comienza ahora
            </Link>
          </div>
          <div className="block md:hidden relative z-20 mt-8">
            <dotlottie-player
              src="/json/chicolaptop2.json"
              background="transparent"
              speed="1"
              renderer="svg"
              style={{ width: '400px', height: '400px' }}
              className="transition-transform duration-700"
              loop
              autoplay
            ></dotlottie-player>
          </div>
        </div>
      </div>
      <div 
        ref={containerRef}
        className="hidden md:flex md:absolute md:right-20 md:top-1/2 md:-translate-y-1/2 justify-center relative md:mt-0 z-20"
      >
        <dotlottie-player
          ref={lottieRef}
          src="/json/chicolaptop.json"
          background="transparent"
          speed="1"
          renderer="svg"
          style={{ width: '500px', height: '500px' }}
          className="transition-transform duration-700"
          loop
          autoplay
        ></dotlottie-player>
      </div>
    </section>
  );
};

export default Contact; 