<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Add Swiper CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
    <!-- Add Swiper JS -->
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
    <style>
        .desktop-view {
            height: 600px;
            @media (min-width: 768px) {
                height: 700px;
            }
            @media (min-width: 1024px) {
                height: 800px;
            }
        }

        /* Swiper styles */
        .swiper {
            width: 100%;
            padding-bottom: 50px;
            position: relative;
        }

        .swiper-slide {
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            width: 100% !important; /* Force full width */
        }

        .swiper-slide > div {
            width: 100% !important; /* Make card take full width */
            margin: 0 auto; /* Center the card */
        }

        .swiper-pagination {
            position: absolute;
            bottom: 10px;
        }

        .swiper-pagination-bullet {
            width: 10px;
            height: 10px;
            background: #fff;
            opacity: 0.5;
        }

        .swiper-pagination-bullet-active {
            opacity: 1;
            background: #fff;
        }

        /* Card text responsive sizes */
        .step-card h2 {
            font-size: 16px;
            line-height: 1.2;
            @media (min-width: 768px) {
                font-size: 18px;
            }
            @media (min-width: 1024px) {
                font-size: 20px;
            }
            @media (min-width: 1280px) {
                font-size: 24px;
            }
        }

        .step-card p {
            font-size: 12px;
            line-height: 1.4;
            @media (min-width: 768px) {
                font-size: 13px;
            }
            @media (min-width: 1024px) {
                font-size: 14px;
            }
            @media (min-width: 1280px) {
                font-size: 16px;
            }
        }

        .step-card img {
            width: 40px;
            height: auto;
            @media (min-width: 768px) {
                width: 50px;
            }
            @media (min-width: 1024px) {
                width: 60px;
            }
            @media (min-width: 1280px) {
                width: 80px;
            }
        }
    </style>
</head>
<body>
<div class="bg-white py-12 md:py-16">
  <div class="">
    <lottie-player
      id="car"
      src="/json/chicacarrito120fps.json"
      background="transparent"
      style="width: 100%; height: 100%; margin-top: -100px;"
      renderer="svg"
      speed="1"
      mode="normal"
      direction="1"
      class="w-[200%] h-[200%]"
    ></lottie-player>
  </div>

  <!-- Mobile Version -->
  <div class="bg-[#E9F2E7] h-[40rem] md:h-[0px]">
    <div class="flex justify-center items-center -mt-10 md:hidden">
      <dotlottie-player
        id="car"
        src="/json/chicopapelito.json"
        background="transparent"
        class="w-[180px] h-[180px] sm:w-[200px] sm:h-[200px]"
        style="margin-bottom: -20px"
        loop
        autoplay
      ></dotlottie-player>
    </div>
    <section class="md:hidden bg-[#147A31] px-4 py-8 rounded-3xl mx-4 mb-[-4rem] relative z-10" id="comofunciona">
      <h2 class="text-white text-[28px] font-bold text-center mb-8">
        Conoce cómo funciona
      </h2>

      <!-- Swiper container -->
      <div class="swiper mySwiper">
        <div class="swiper-wrapper">
          <!-- Step 1 -->
          <div class="swiper-slide">
            <div class="bg-white shadow-lg px-[24px] pb-[48px] pt-[32px] rounded-[20px] flex flex-col" id="step1">
              <div class="flex flex-row gap-2 items-center justify-center mb-4">
                <h3 class="leading-6 text-[#147A31] text-balance text-[24px] font-[500]">
                  Selecciona el trámite
                </h3>
                <img
                  src="../assets/img/Group 2229.png"
                  alt="logo"
                  class="w-[80px] h-full"
                  width="100"
                  height="100"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <p class="text-pretty text-[16px] text-[#606060]">
                Ingresa tus datos y realiza el pago del trámite seleccionado incluyendo los sellos.
              </p>
            </div>
          </div>

          <!-- Step 2 -->
          <div class="swiper-slide">
            <div class="bg-white shadow-lg px-[24px] pb-[48px] pt-[32px] rounded-[20px] flex flex-col" id="step2">
              <div class="flex flex-row gap-2 items-center justify-center mb-4">
                <h3 class="leading-6 text-[#147A31] text-balance text-[24px] font-[500]">
                  Completa tu Información
                </h3>
                <img
                  src="../assets/img/Group 2229(1).png"
                  alt="logo"
                  class="w-[80px] h-full"
                  width="100"
                  height="100"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <p class="text-pretty text-[16px] text-[#606060]">
                Llena la solicitud y sube tus fotos y documentos. Analizaremos tu cuenta para validarla.
              </p>
            </div>
          </div>

          <!-- Step 3 -->
          <div class="swiper-slide">
            <div class="bg-white shadow-lg px-[24px] pb-[48px] pt-[32px] rounded-[20px] flex flex-col" id="step3">
              <div class="flex flex-row gap-2 items-center justify-center mb-4">
                <h3 class="leading-6 text-[#147A31] text-balance text-[24px] font-[500]">
                  Revisa el Estado de tu Caso
                </h3>
                <img
                  src="../assetsimg/Group 2229(2).png"
                  alt="logo"
                  class="w-[80px] h-full"
                  width="100"
                  height="100"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <p class="text-pretty text-[16px] text-[#606060]">
                En caso existan multas te ayudamos y hasta te gestionamos un plan de pago.
              </p>
            </div>
          </div>

          <!-- Step 4 -->
          <div class="swiper-slide">
            <div class="bg-white shadow-lg px-[24px] pb-[48px] pt-[32px] rounded-[20px] flex flex-col" id="step4">
              <div class="flex flex-row gap-2 items-center justify-center mb-4">
                <h3 class="leading-6 text-[#147A31] text-balance text-[24px] font-[500]">
                  Recibe tu licencia o Permiso
                </h3>
                <img
                  src="../assets/img/Group 2229(3).png"
                  alt="logo"
                  class="w-[80px] h-full"
                  width="100"
                  height="100"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <p class="text-pretty text-[16px] text-[#606060]">
                Una vez listo, radicamos tu caso y te hacemos llegar tu licencia o permiso por correo.
              </p>
            </div>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </section>
  </div>

  <!-- Desktop & Tablet Version -->
  <div class="hidden md:block w-full">
    <section class="desktop-view relative" id="comofunciona-desktop">
      <div class="absolute left-1/2 transform -translate-x-1/2 md:-top-16 lg:-top-20 xl:-top-24 z-10">
        <dotlottie-player
          id="chicopapelito"
          src="/json/chicopapelito.json"
          background="transparent"
          class="w-[200px] h-[200px] md:w-[250px] md:h-[250px] lg:w-[280px] lg:h-[280px] xl:w-[300px] xl:h-[300px]"
          loop
          autoplay
        ></dotlottie-player>
      </div>
      <div class="contenedor flex items-center justify-center h-full w-full px-[5%] md:px-[8%] lg:px-[10%] xl:px-[200px] 2xl:px-[300px] bg-[#e9f2e7] md:top-[80px] lg:top-[90px] xl:top-[100px]">
        <div class="bg-[#147A31] !-mt-10 text-[32px] text-white font-[700] px-[32px] w-full text-center h-[416px] rounded-[44px] flex items-center justify-center mb-10">
          <p data-trans="landing::feature_title">Conoce cómo funciona</p>
        </div>

        <!-- Step cards with responsive sizing -->
        <div id="step1-desktop"
             class="absolute card step-card bg-white shadow-lg px-[16px] py-[24px] w-[240px] md:w-[280px] xl:w-[320px] 2xl:w-[361px] h-[160px] md:h-[180px] xl:h-[200px] 2xl:h-[217px] rounded-[20px] top-[28.5rem] left-[10%] md:left-[15%] xl:left-[20%] 2xl:left-[25rem] visible z-1 transition-transform duration-700 translate-y-[30px]">
          <div class="flex flex-row gap-2 items-center justify-center mb-2 md:mb-4">
            <h2
              class="leading-6 text-[#147A31] text-balance text-[18px] xl:text-[24px] font-[500]"
              data-trans="landing::feature_first_box__title"
            >
              Revisa el estado de tu caso
            </h2>
            <img
              src="../assets/img/Group 2229(2).png"
              alt="logo"
              class="w-[50px] xl:w-[80px] h-full"
              width="100"
              height="100"
              loading="lazy"
              decoding="async"
            />
          </div>
          <p
            class="text-pretty text-[13px] xl:text-[16px] text-[#606060]"
            data-trans="landing::feature_first_box__description"
          >
            En caso existan multas te ayudamos y hasta te gestionamos un plan de pago.
          </p>
        </div>

        <div id="step2-desktop"
             class="absolute card step-card bg-white shadow-lg px-[16px] py-[24px] w-[240px] md:w-[280px] xl:w-[320px] 2xl:w-[361px] h-[160px] md:h-[180px] xl:h-[200px] 2xl:h-[217px] rounded-[20px] top-[28.5rem] right-[10%] md:right-[15%] xl:right-[20%] 2xl:right-[25rem] visible z-1 transition-transform duration-700 translate-y-[30px]">
          <div class="flex flex-row gap-2 items-center justify-center mb-2 md:mb-4">
            <h2
              class="leading-6 text-[#147A31] text-balance text-[18px] xl:text-[24px] font-[500]"
              data-trans="landing::feature_second_box__title"
            >
              Recibe tu licencia o Permiso
            </h2>
            <img
              src="../assets/img/Group 2229(3).png"
              alt="logo"
              class="w-[50px] xl:w-[80px] h-full"
              width="100"
              height="100"
              loading="lazy"
              decoding="async"
            />
          </div>
          <p
            class="text-pretty text-[13px] xl:text-[16px] text-[#606060]"
          >
            Una vez listo, radicamos tu caso y te hacemos llegar tu licencia o permiso por correo.
          </p>
        </div>

        <div id="step3-desktop"
             class="absolute card step-card bg-white shadow-lg px-[16px] py-[24px] w-[240px] md:w-[280px] xl:w-[320px] 2xl:w-[361px] h-[160px] md:h-[180px] xl:h-[200px] 2xl:h-[217px] rounded-[20px] bottom-[33.5rem] left-[10%] md:left-[15%] xl:left-[20%] 2xl:left-[25rem] visible transition-transform duration-700 translate-y-[30px]">
          <div class="flex flex-row gap-2 items-center justify-center mb-2 md:mb-4">
            <h2
              class="leading-6 text-[#147A31] text-balance text-[18px] xl:text-[24px] font-[500]"
              data-trans="landing::feature_third_box__title"
            >
              Selecciona el trámite
            </h2>
            <img
              src="../assets/img/Group 2229.png"
              alt="logo"
              class="w-[50px] xl:w-[80px] h-full"
              width="100"
              height="100"
              loading="lazy"
              decoding="async"
            />
          </div>
          <p
            class="text-pretty text-[13px] xl:text-[16px] text-[#606060]"
            data-trans="landing::feature_third_box__description"
          >
            Ingresa tus datos y realiza el pago del trámite seleccionado
            incluyendo los sellos.
          </p>
        </div>

        <div id="step4-desktop"
             class="absolute card step-card bg-white shadow-lg px-[16px] py-[24px] w-[240px] md:w-[280px] xl:w-[320px] 2xl:w-[361px] h-[160px] md:h-[180px] xl:h-[200px] 2xl:h-[217px] rounded-[20px] bottom-[33.5rem] right-[10%] md:right-[15%] xl:right-[20%] 2xl:right-[25rem] visible transition-transform duration-700 translate-y-[30px]">
          <div class="flex flex-row gap-2 items-center justify-center mb-2 md:mb-4">
            <h2
              class="leading-6 text-[#147A31] text-balance text-[18px] xl:text-[24px] font-[500]"
              data-trans="landing::feature_fourth_box__title"
            >
              Completa tu Información
            </h2>
            <img
              src="../assets/img/Group 2229(1).png"
              alt="logo"
              class="w-[50px] xl:w-[80px] h-full"
              width="100"
              height="100"
              loading="lazy"
              decoding="async"
            />
          </div>
          <p
            class="text-pretty text-[13px] xl:text-[16px] text-[#606060]"
            data-trans="landing::feature_fourth_box__description"
          >
            Llena la solicitud y sube tus fotos y documentos. Analizaremos tu cuenta para validarla.
          </p>
        </div>
      </div>
    </section>
  </div>

  <!-- Wavy shape -->
  <div class="relative">
    <lottie-player
      class="rotate-180 lg:hidden"
      id="car2"
      src="/json/chicacarrito.json"
      background="transparent"
      style="width: 100%; height: 100%; margin-top: -2rem"
    ></lottie-player>

    <lottie-player
      class="rotate-180 hidden lg:block 2xl:hidden"
      id="car2-tablet"
      src="/json/chicacarrito.json"
      background="transparent"
      style="width: 100%; height: 100%; margin-top: -120px"
      autoplay
    ></lottie-player>

    <lottie-player
      class="rotate-180 hidden 2xl:block"
      id="car2-desktop"
      src="/json/chicacarrito.json"
      background="transparent"
      style="width: 100%; height: 100%; margin-top: -200px"
      autoplay
    ></lottie-player>
  </div>
</div>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    // Initialize Swiper
    const swiper = new Swiper(".mySwiper", {
      effect: "slide",
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      grabCursor: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        // Disable multiple slides on mobile
        320: {
          slidesPerView: 1,
          spaceBetween: 20
        }
      }
    });

    // Add click event to slides to go to next slide
    const slides = document.querySelectorAll('.swiper-slide');
    slides.forEach(slide => {
      slide.addEventListener('click', () => {
        swiper.slideNext();
      });
    });

    // Lottie animation interactivity
    if (typeof LottieInteractivity !== 'undefined') {
      LottieInteractivity.create({
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

      LottieInteractivity.create({
        mode: 'scroll',
        player: '#car2',
        actions: [
          {
            visibility: [0, 1.0],
            type: 'seek',
            frames: [50, 50],
          },
        ],
      });

      LottieInteractivity.create({
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

      LottieInteractivity.create({
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
  });
</script>
</body>
</html> 