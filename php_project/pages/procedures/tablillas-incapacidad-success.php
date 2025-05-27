<?php
// Don't start a new session as it's already started in header.php
// session_start();

// Set the title for the header
$title = "Tablillas Incapacidad - Solicitud Completada";
include_once 'components/header_procedure.php';

// Load user data from session
$userData = isset($_SESSION['user']) ? json_decode($_SESSION['user'], true) : null;

// Get user's name
function getUserName() {
    global $userData;
    if (!$userData) return 'Andres';
    
    $userItem = $userData['item'] ?? [];
    $firstName = $userItem['cl_nombre'] ?? '';
    
    return $firstName ?: 'Andres';
}
?>
<!DOCTYPE html>
<html lang="es" class="font-poppins">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Tablillas Incapacidad - Solicitud Completada - Tu Licencia</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="font-poppins">
<div class="min-h-screen flex flex-col items-center justify-center bg-[#e8f8ee]">
    <div class="max-w-4xl w-full mx-auto px-4 py-12 text-center">
        <div class="mb-8">
            <div class="w-40 h-40 mx-auto">
                <lottie-player 
                    src="https://lottie.host/20f3abe5-eda4-4734-bbae-09f193f494d1/dZvxoNyZCK.json"
                    background="transparent"
                    speed="1"
                    style="width: 100%; height: 100%"
                    loop
                    autoplay
                ></lottie-player>
            </div>
        </div>
        
        <h2 class="text-4xl font-bold text-[#157a3c] mb-4">¡Felicidades!</h2>
        
        <p class="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Tu solicitud de Tablillas de Incapacidad ha sido completada exitosamente.
        </p>
        
        <div class="bg-white rounded-xl p-6 mb-8 max-w-lg mx-auto shadow-sm">
            <h3 class="text-xl font-semibold text-[#157a3c] mb-3">¿Qué sigue?</h3>
            <p class="text-gray-700 mb-3">
                Un agente de CESCO revisará tu solicitud y te contactará si se requiere información adicional.
            </p>
            <p class="text-gray-700">
                Te notificaremos por correo electrónico cuando tu tablilla esté lista para recoger.
            </p>
        </div>
        
        <div class="flex flex-col md:flex-row items-center justify-center gap-4">
            <a href="index.php?page=user-dashboard" 
               class="inline-block px-6 py-3 bg-[#157a3c] text-white rounded-full hover:bg-[#0e6631] transition-colors">
                Ir al Dashboard
            </a>
            
            <a href="index.php?page=home" 
               class="inline-block px-6 py-3 bg-white text-[#157a3c] border border-[#157a3c] rounded-full hover:bg-[#e8f8ee] transition-colors">
                Volver al Inicio
            </a>
        </div>
    </div>
</div>

<script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
</body>
</html> 