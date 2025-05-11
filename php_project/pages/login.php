<?php
// Start session if not already started
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Get error from session if exists
$error = isset($_SESSION['login_error']) ? $_SESSION['login_error'] : null;
// Clear the error from session
unset($_SESSION['login_error']);
?>
<!DOCTYPE html>
<html lang="en" class="font-poppins">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Login - Tu Licencia</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.js"></script>
</head>
<body class="font-poppins">

<?php include 'components/header_register.php'; ?>

<div class="min-h-screen bg-white">
    <main class="py-10 sm:py-16 md:py-20 mt-1 rounded-t-[3rem] px-4 sm:px-6 md:px-8">
        <div class="container mx-auto max-w-7xl">
            <div class="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
                <!-- Left side - Animation and Text -->
                <div class="order-1 md:order-1 fade-in" style="animation-duration: 1s;">
                    <div class="h-[200px] sm:h-[250px] md:h-[300px] mb-4 sm:mb-6">
                        <dotlottie-player
                            src="/json/capitolio2.json"
                            autoplay
                            loop
                        ></dotlottie-player>
                    </div>
                    <div class="text-center">
                        <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a602d] mb-3 sm:mb-4">¡Bienvenido!</h1>
                        <p class="text-base sm:text-lg text-[#224a33]">
                            Inicia sesión para continuar con tus trámites.
                        </p>
                        <p class="text-sm text-gray-500 mt-2">
                            Usuario: admin | Contraseña: admin123
                        </p>
                    </div>
                </div>

                <!-- Right side - Form -->
                <div class="order-2 md:order-2 fade-in" style="animation-duration: 1s;">
                    <form action="../includes/login_process.php" method="POST" class="bg-white p-4 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] bg-gradient-to-b from-[#e8f8ee] to-[#ffffff] shadow-lg">
                        <div class="mb-4">
                            <label for="username" class="block text-sm font-medium text-[#224a33] mb-1">Usuario o correo</label>
                            <div class="relative">
                                <input 
                                    type="text" 
                                    id="username" 
                                    name="username" 
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a602d] focus:border-transparent shadow-md" 
                                    placeholder="Ingrese su usuario" 
                                    required
                                >
                            </div>
                        </div>
                        
                        <div class="mb-4">
                            <label for="password" class="block text-sm font-medium text-[#224a33] mb-1">Contraseña</label>
                            <div class="relative">
                                <input 
                                    type="password" 
                                    id="password" 
                                    name="password" 
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a602d] focus:border-transparent pr-10 shadow-md" 
                                    placeholder="Ingrese su contraseña" 
                                    required
                                >
                                <button 
                                    type="button" 
                                    id="toggle-password" 
                                    class="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    <svg id="eye-icon" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    <svg id="eye-off-icon" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <?php if ($error === 'invalid'): ?>
                        <div class="mb-4 sm:mb-6 p-3 bg-red-50 rounded-lg border border-red-100 text-red-600 text-sm">
                            <div class="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                                </svg>
                                Usuario o contraseña incorrectos. Por favor intenta nuevamente.
                            </div>
                        </div>
                        <?php endif; ?>

                        <div class="mb-4 sm:mb-6 text-right">
                            <a href="?page=forgot-password" class="text-[#1a602d] hover:text-[#157a3c] text-xs sm:text-sm">
                                ¿Olvidaste tu contraseña y/o usuario?
                            </a>
                        </div>

                        <button 
                            type="submit" 
                            class="w-full bg-[#1a602d] hover:bg-[#157a3c] text-white font-medium py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center"
                        >
                            Iniciar sesión
                        </button>

                        <div class="mt-4 sm:mt-6 text-center">
                            <span class="text-[#224a33] text-sm sm:text-base">¿No tienes cuenta aún? </span>
                            <a href="?page=register" class="text-[#1a602d] hover:text-[#157a3c] font-medium text-sm sm:text-base">
                                Crear ahora
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </main>
    
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 135" fill="none">
        <defs>
            <linearGradient id="wave-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#e8f8ee" />
                <stop offset="100%" stop-color="#ffffff" />
            </linearGradient>
        </defs>
        <path fill="url(#wave-gradient)" d="M1440 135V57.8C798.3 193.6 358.2-153.2 0 87.6V135h1440Z"></path>
    </svg>
</div>

<style>
    .fade-in {
        opacity: 0;
        animation: fadeIn ease forwards;
    }
    
    @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
    }
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // Toggle password visibility
    const togglePassword = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eye-icon');
    const eyeOffIcon = document.getElementById('eye-off-icon');
    
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Toggle icons
            eyeIcon.classList.toggle('hidden');
            eyeOffIcon.classList.toggle('hidden');
        });
    }
});
</script>

<?php include 'includes/footer.php'; ?> 