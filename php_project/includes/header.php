<?php
// Start session if not already started
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Get current page for navigation highlighting
$currentPage = isset($_GET['page']) ? $_GET['page'] : 'home';

// Check if page has been scrolled for styling
$hasScrolledClass = isset($_COOKIE['has_scrolled']) && $_COOKIE['has_scrolled'] === 'true' ? 'shadow-md bg-opacity-95' : '';
?>
<!DOCTYPE html>
<html lang="en" class="font-poppins">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Tu Licencia</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        poppins: ['Poppins', 'sans-serif'],
                    },
                    colors: {
                        primary: {
                            DEFAULT: '#147A31',
                            dark: '#0e6631',
                            light: '#2a8951',
                            lighter: '#e9f2e7',
                        },
                        secondary: {
                            DEFAULT: '#e9f2e7',
                            dark: '#d8e6d5',
                        },
                        text: {
                            primary: '#1a602d',
                            gray: '#606060',
                            dark: '#333333',
                            light: '#757575',
                        },
                        background: {
                            light: '#f8f8ff',
                            gray: '#f1f1ff',
                            white: '#ffffff',
                        },
                        form: {
                            border: '#d1d5db',
                            focus: 'rgba(21, 122, 60, 0.3)',
                            error: '#ef4444',
                        },
                    },
                    borderRadius: {
                        'circle': '50%',
                        'button': '9999px',
                        'card': '20px',
                        'input': '8px',
                    },
                }
            }
        }
    </script>
    <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
    <script src="https://unpkg.com/@lottiefiles/lottie-interactivity@latest/dist/lottie-interactivity.min.js"></script>
    <script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
    <link rel="stylesheet" href="/css/styles.css">
</head>
<body class="font-poppins">
    <header class="fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 backdrop-blur-sm bg-[#157a3c] <?php echo $hasScrolledClass; ?>">
        <div class="flex justify-between items-center px-4 py-2 md:py-3 md:px-6 max-w-7xl mx-auto">
            <div class="flex items-center">
                <a href="index.php" class="flex items-center">
                    <img src="../assets/img/Mesa.png" alt="Logo" class="w-32 md:w-39" />
                </a>
            </div>

            <!-- Desktop Navigation -->
            <nav class="hidden md:flex items-center gap-8">
                <a href="index.php" class="text-white hover:text-gray-200 text-sm font-medium">Inicio</a>
                <a href="index.php?page=procedures" class="text-white hover:text-gray-200 text-sm font-medium">Servicios disponibles</a>
                <a href="index.php?page=how-it-works" class="text-white hover:text-gray-200 text-sm font-medium">¿Cómo funciona?</a>
                <a href="index.php?page=contact" class="text-white hover:text-gray-200 text-sm font-medium">Contáctenos</a>
                <?php if (isset($_SESSION['user_id'])): ?>
                    <a href="index.php?page=user-dashboard" class="text-white hover:text-gray-200 text-sm font-medium">Dashboard</a>
                    <a href="index.php?page=logout" class="border border-white text-white hover:bg-white hover:text-[#157a3c] px-5 py-2 rounded-full text-sm font-medium transition-colors">Cerrar Sesión</a>
                <?php else: ?>
                    <a href="index.php?page=register" class="text-white hover:text-gray-200 text-sm font-medium">Registrarse</a>
                    <a href="index.php?page=login" class="border border-white text-white hover:bg-white hover:text-[#157a3c] px-5 py-2 rounded-full text-sm font-medium transition-colors">Ingresar</a>
                <?php endif; ?>
            </nav>

            <!-- Mobile Menu Button -->
            <button id="mobile-menu-button" class="md:hidden focus:outline-none p-2 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
            </button>
        </div>

        <!-- Mobile Menu -->
        <div id="mobile-menu" class="md:hidden hidden">
            <nav class="flex flex-col py-4 px-4 bg-[#0e6631] border-t border-[#2a8951]">
                <a href="index.php" class="text-white hover:text-gray-200 font-medium py-3 px-2 border-b border-[#2a8951] text-center">Inicio</a>
                <a href="index.php?page=procedures" class="text-white hover:text-gray-200 font-medium py-3 px-2 border-b border-[#2a8951] text-center">Servicios disponibles</a>
                <a href="index.php?page=how-it-works" class="text-white hover:text-gray-200 font-medium py-3 px-2 border-b border-[#2a8951] text-center">¿Cómo funciona?</a>
                <a href="index.php?page=contact" class="text-white hover:text-gray-200 font-medium py-3 px-2 border-b border-[#2a8951] text-center">Contáctenos</a>
                <?php if (isset($_SESSION['user_id'])): ?>
                    <a href="index.php?page=user-dashboard" class="text-white hover:text-gray-200 font-medium py-3 px-2 border-b border-[#2a8951] text-center">Dashboard</a>
                    <a href="index.php?page=logout" class="text-white hover:text-gray-200 font-medium py-3 px-2 text-center">Cerrar Sesión</a>
                <?php else: ?>
                    <a href="index.php?page=register" class="text-white hover:text-gray-200 font-medium py-3 px-2 border-b border-[#2a8951] text-center">Registrarse</a>
                    <a href="index.php?page=login" class="text-white hover:text-gray-200 font-medium py-3 px-2 text-center">Ingresar</a>
                <?php endif; ?>
            </nav>
        </div>
    </header>

    <!-- Spacer to prevent content from hiding behind fixed header -->
    <div class="h-[60px] md:h-[72px] bg-[#f7fdf9]"></div>
    
    <main class="min-h-screen bg-gradient-to-b from-[#f7fdf9] to-white"> 