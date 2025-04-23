import React, { useEffect } from 'react';

const HowItWorks = () => {
  useEffect(() => {
    // Initialize Swiper after component mounts
    if (typeof window !== 'undefined') {
      const initializeSwiper = () => {
        if (window.Swiper) {
          // Initialize Swiper
          const swiper = new window.Swiper(".mySwiper", {
            effect: "fade",
            fadeEffect: {
              crossFade: true
            },
            grabCursor: true,
            pagination: {
              el: ".swiper-pagination",
              type: "bullets",
              clickable: true,
              bulletElement: 'div',
            },
          });

          // Add click event to slides to go to next slide
          const slides = document.querySelectorAll('.swiper-slide');
          slides.forEach(slide => {
            slide.addEventListener('click', () => {
              swiper.slideNext();
            });
          });
        }
      };

      // Try to initialize immediately
      initializeSwiper();
      
      // Also try after a small delay to ensure DOM is ready
      setTimeout(initializeSwiper, 100);
    }

    // Lottie animation
    if (window.LottieInteractivity) {
      window.LottieInteractivity.create({
        mode: 'scroll',
        player: '#car',
        actions: [
          {
            visibility: [0, 1.0],
            type: 'seek',
            frames: [0, 400],
          },
        ],
      });

      window.LottieInteractivity.create({
        mode: 'scroll',
        player: '#car2',
        actions: [
          {
            visibility: [0, 1.0],
            type: 'seek',
            frames: [45, 45],
          },
        ],
      });

      window.LottieInteractivity.create({
        mode: 'scroll',
        player: '#car2-tablet',
        actions: [
          {
            visibility: [0, 1.0],
            type: 'seek',
            frames: [45, 45],
          },
        ],
      });

      window.LottieInteractivity.create({
        mode: 'scroll',
        player: '#car2-desktop',
        actions: [
          {
            visibility: [0, 1.0],
            type: 'seek',
            frames: [45, 45],
          },
        ],
      });
    }

    // Desktop steps scroll-based movement
    let lastScrollTop = 0; // Store the last scroll position

    const handleStepsAnimation = () => {
      const section = document.getElementById('comofunciona-desktop');
      if (!section) return;

      const sectionRect = section.getBoundingClientRect();
      const sectionTop = sectionRect.top;
      const sectionHeight = section.offsetHeight;
      const windowHeight = window.innerHeight;

      // Calculate how much of the section is visible in the viewport
      const visibleRatio = Math.max(0, Math.min(1,
        (windowHeight - sectionTop) / Math.min(windowHeight, sectionHeight)
      ));

      // Map visibleRatio (0-1) to a position value (30px to -30px)
      // This gives us a total range of 60px of movement (more subtle)
      const positionY = 30 - (visibleRatio * 60);

      // Get steps
      const step1 = document.getElementById('step1-desktop');
      const step2 = document.getElementById('step2-desktop');
      const step3 = document.getElementById('step3-desktop');
      const step4 = document.getElementById('step4-desktop');

      // Apply position to all steps
      if (step1) step1.style.transform = `translateY(${positionY}px)`;
      if (step2) step2.style.transform = `translateY(${positionY}px)`;
      if (step3) step3.style.transform = `translateY(${positionY}px)`;
      if (step4) step4.style.transform = `translateY(${positionY}px)`;

      // Update last scroll position
      lastScrollTop = window.scrollY;
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleStepsAnimation);

    // Initial call to set correct positions
    handleStepsAnimation();

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleStepsAnimation);
    };
  }, []);
  
  return (
    <div className="relative">
      <lottie-player
      id="car"
        src="/json/chicacarrito120fps.json"
        background="transparent"
        style={{marginTop: '-100px'}}
        renderer="svg"
        speed="1"
        mode="normal"
        direction="1"
        className="w-[200%] h-[200%] md:w-full md:h-full"
        ></lottie-player>

      {/* Mobile Version */}
      <div className="bg-[#E9F2E7] h-[40rem] lg:h-[0px]">
        <div className="flex justify-center items-center -mt-10">
        <lottie-player
      id="car"
        src="/json/chicopapelito.json"
        background="transparent"
        style={{width: '200px', height: '200px', marginBottom: '-20px'}}
        loop
        autoplay
        ></lottie-player>
        </div>
      <section className="lg:hidden bg-[#147A31] px-4 py-8 rounded-3xl mx-4 mb-[-4rem] relative z-10" id="comofunciona">
        <h2 className="text-white text-[28px] font-bold text-center mb-8">
          Conoce cómo funciona
        </h2>

        {/* Swiper container */}
        <div className="swiper mySwiper">
          <div className="swiper-wrapper">
            {/* Step 1 */}
            <div className="swiper-slide">
              <div className="bg-white shadow-lg px-[24px] pb-[48px] pt-[32px] rounded-[20px] w-[700px] h-[217px] flex flex-col" id="step1">
                <div className="flex flex-row gap-2 items-center justify-center mb-4">
                  <h3 className="leading-6 text-[#147A31] text-balance text-[24px] font-[500]">
                    Selecciona el trámite
                  </h3>
                  <img
                    src="img/Group 2229.png"
                    alt="logo"
                    className="w-[80px] h-full"
                    width="100"
                    height="100"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <p className="text-pretty text-[16px] text-[#606060]">
                  Ingresa tus datos y realiza el pago del trámite seleccionado incluyendo los sellos.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="swiper-slide">
              <div className="bg-white shadow-lg px-[24px] pb-[48px] pt-[32px] rounded-[20px] w-[700px] h-[217px] flex flex-col" id="step2">
                <div className="flex flex-row gap-2 items-center justify-center mb-4">
                  <h3 className="leading-6 text-[#147A31] text-balance text-[24px] font-[500]">
                    Completa tu Información
                  </h3>
                  <img
                    src="img/Group 2229(1).png"
                    alt="logo"
                    className="w-[80px] h-full"
                    width="100"
                    height="100"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <p className="text-pretty text-[16px] text-[#606060]">
                  Llena la solicitud y sube tus fotos y documentos. Analizaremos tu cuenta para validarla.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="swiper-slide">
              <div className="bg-white shadow-lg px-[24px] pb-[48px] pt-[32px] rounded-[20px] w-[700px] h-[217px] flex flex-col" id="step3">
                <div className="flex flex-row gap-2 items-center justify-center mb-4">
                  <h3 className="leading-6 text-[#147A31] text-balance text-[24px] font-[500]">
                    Revisa el Estado de tu Caso
                  </h3>
                  <img
                    src="img/Group 2229(2).png"
                    alt="logo"
                    className="w-[80px] h-full"
                    width="100"
                    height="100"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <p className="text-pretty text-[16px] text-[#606060]">
                  En caso existan multas te ayudamos y hasta te gestionamos un plan de pago.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="swiper-slide">
              <div className="bg-white shadow-lg px-[24px] pb-[48px] pt-[32px] rounded-[20px] w-[700px] h-[217px] flex flex-col" id="step4">
                <div className="flex flex-row gap-2 items-center justify-center mb-4">
                  <h3 className="leading-6 text-[#147A31] text-balance text-[24px] font-[500]">
                    Recibe tu licencia o Permiso
                  </h3>
                  <img
                    src="img/Group 2229(3).png"
                    alt="logo"
                    className="w-[80px] h-full"
                    width="100"
                    height="100"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <p className="text-pretty text-[16px] text-[#606060]">
                  Una vez listo, radicamos tu caso y te hacemos llegar tu licencia o permiso por correo.
                </p>
              </div>
            </div>
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </section>
    </div>

      {/* Desktop Version */}
       <div className="lg:w-full">
      <section className="hidden lg:block desktop-view relative" id="comofunciona-desktop">
        <div className="absolute left-1/2 transform -translate-x-1/2 -top-24 z-10">
          <lottie-player
          id="chicopapelito"
            src="/json/chicopapelito.json"
            background="transparent"
            style={{width: '300px', height: '300px'}}
            loop
            autoplay
            ></lottie-player>
        </div>
        <div
          className="contenedor flex items-center justify-center h-full w-full px-[10%] xl:px-[200px] 2xl:px-[300px] bg-[#e9f2e7] top-[100px]"
        >
          <div
            className="bg-[#147A31] !-mt-10 text-[32px] text-white font-[700] px-[32px] w-full text-center h-[416px] rounded-[44px] flex items-center justify-center mb-10"
          >
            <p data-trans="landing::feature_title">Conoce cómo funciona</p>
          </div>
          <div
            id="step1-desktop"
            className="absolute card step-card bg-white shadow-lg px-[16px] lg:px-[24px] py-[24px] lg:py-[32px] w-[280px] xl:w-[320px] 2xl:w-[361px] h-[180px] xl:h-[200px] 2xl:h-[217px] rounded-[20px] top-[28.5rem] left-[15%] xl:left-[20%] 2xl:left-[25rem] visible z-1 transition-transform duration-700 translate-y-[30px]"
          >
            <div className="flex flex-row gap-2 items-center justify-center mb-2 lg:mb-4">
              <h2
                className="leading-6 text-[#147A31] text-balance text-[18px] xl:text-[24px] font-[500]"
                data-trans="landing::feature_first_box__title"
              >
              Revisa el estado de tu caso
              </h2>
              <img
                src="img/Group 2229(2).png"
                alt="logo"
                className="w-[50px] xl:w-[80px] h-full"
                width="100"
                height="100"
                loading="lazy"
                decoding="async"
              />
            </div>
            <p
              className="text-pretty text-[13px] xl:text-[16px] text-[#606060]"
              data-trans="landing::feature_first_box__description"
            >
            En caso existan multas te ayudamos y hasta te gestionamos un plan de pago.
            </p>
          </div>
          <div
            id="step2-desktop"
            className="absolute card step-card bg-white shadow-lg px-[16px] lg:px-[24px] py-[24px] lg:py-[32px] w-[280px] xl:w-[320px] 2xl:w-[361px] h-[180px] xl:h-[200px] 2xl:h-[217px] rounded-[20px] top-[28.5rem] right-[15%] xl:right-[20%] 2xl:right-[25rem] visible z-1 transition-transform duration-700 translate-y-[30px]"
          >
            <div className="flex flex-row gap-2 items-center justify-center mb-2 lg:mb-4">
              <h2
                className="leading-6 text-[#147A31] text-balance text-[18px] xl:text-[24px] font-[500]"
                data-trans="landing::feature_second_box__title"
              >
              Recibe tu licencia o Permiso
              </h2>
              <img
                src="img/Group 2229(3).png"
                alt="logo"
                className="w-[50px] xl:w-[80px] h-full"
                width="100"
                height="100"
                loading="lazy"
                decoding="async"
              />
            </div>
            <p
              className="text-pretty text-[13px] xl:text-[16px] text-[#606060]"
            >
            Una vez listo, radicamos tu caso y te hacemos llegar tu licencia o permiso por correo.
            </p>
          </div>
          <div
            id="step3-desktop"
            className="absolute card step-card bg-white shadow-lg px-[16px] lg:px-[24px] py-[24px] lg:py-[32px] w-[280px] xl:w-[320px] 2xl:w-[361px] h-[180px] xl:h-[200px] 2xl:h-[217px] rounded-[20px] bottom-[33.5rem] left-[15%] xl:left-[20%] 2xl:left-[25rem] visible transition-transform duration-700 translate-y-[30px]"
          >
            <div className="flex flex-row gap-2 items-center justify-center mb-2 lg:mb-4">
              <h2
                className="leading-6 text-[#147A31] text-balance text-[18px] xl:text-[24px] font-[500]"
                data-trans="landing::feature_third_box__title"
              >
              Selecciona el trámite
              </h2>
              <img
                src="img/Group 2229.png"
                alt="logo"
                className="w-[50px] xl:w-[80px] h-full"
                width="100"
                height="100"
                loading="lazy"
                decoding="async"
              />
            </div>
            <p
              className="text-pretty text-[13px] xl:text-[16px] text-[#606060]"
              data-trans="landing::feature_third_box__description"
            >
            Ingresa tus datos y realiza el pago del trámite seleccionado
            incluyendo los sellos.
            </p>
          </div>
          <div
            id="step4-desktop"
            className="absolute card step-card bg-white shadow-lg px-[16px] lg:px-[24px] py-[24px] lg:py-[32px] w-[280px] xl:w-[320px] 2xl:w-[361px] h-[180px] xl:h-[200px] 2xl:h-[217px] rounded-[20px] bottom-[33.5rem] right-[15%] xl:right-[20%] 2xl:right-[25rem] visible transition-transform duration-700 translate-y-[30px]"
          >
            <div className="flex flex-row gap-2 items-center justify-center mb-2 lg:mb-4">
              <h2
                className="leading-6 text-[#147A31] text-balance text-[18px] xl:text-[24px] font-[500]"
                data-trans="landing::feature_fourth_box__title"
              >
              Completa tu Información
              </h2>
              <img
                src="img/Group 2229(1).png"
                alt="logo"
                className="w-[50px] xl:w-[80px] h-full"
                width="100"
                height="100"
                loading="lazy"
                decoding="async"
              />
            </div>
            <p
              className="text-pretty text-[13px] xl:text-[16px] text-[#606060]"
              data-trans="landing::feature_fourth_box__description"
            >
            Llena la solicitud y sube tus fotos y documentos. Analizaremos tu cuenta para validarla.
            </p>
          </div>
        </div>
      </section>
    </div>

      {/* Wavy shape */}
      <div className="relative">
      <lottie-player
          className="rotate-180 lg:hidden"
          id="car2"
          src="/json/chicacarrito.json"
          background="transparent"
          style={{width: 'full', height: 'full', marginTop: '-2rem'}}
        ></lottie-player>

        <lottie-player
          className="rotate-180 hidden lg:block 2xl:hidden"
          id="car2-tablet"
          src="/json/chicacarrito.json"
          background="transparent"
          style={{width: 'full', height: 'full', marginTop: '-120px'}}
          autoplay
        ></lottie-player>

        <lottie-player
          className="rotate-180 hidden 2xl:block"
          id="car2-desktop"
          src="/json/chicacarrito.json"
          background="transparent"
          style={{width: 'full', height: 'full', marginTop: '-200px'}}
          autoplay
        ></lottie-player>
    </div>
    
    <style jsx>{`
      .desktop-view {
        height: 800px;
      }

      /* Swiper styles */
      .swiper {
        width: 100%;
        padding-bottom: 0;
        position: relative;
      }

      .swiper-slide {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }

      .swiper-slide-next {
        opacity: 0;
        visibility: hidden;
      }
    `}</style>
    </div>
  );
};

export default HowItWorks; 