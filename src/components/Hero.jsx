import React from 'react';
import { DotLottiePlayer, LinkButton, FadeIn } from './ui';

const Hero = () => {
  return (
    <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
      <FadeIn className="order-2 md:order-1 text-center md:text-left" duration="1s">
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
          <LinkButton 
            to="/servicios" 
            variant="primary"
            size="lg"
          >
            Comienza ahora
          </LinkButton>
        </div>
      </FadeIn>

      <FadeIn className="order-1 md:order-2 relative flex justify-center md:justify-end" duration="1.2s">
        <div className="absolute inset-0">
          <DotLottiePlayer
            src="/json/carro-home.json"
            autoplay={true}
            loop={false}
          />
        </div>
        <div className="relative z-10">
          <DotLottiePlayer
            src="/json/personashome2.json"
            autoplay={true}
            loop={true}
          />
        </div>
      </FadeIn>
    </div>
  );
};

export default Hero; 