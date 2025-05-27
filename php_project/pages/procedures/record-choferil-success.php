<?php
// Don't start a new session as it's already started in header.php
// session_start();

// Set the title for the header
$title = "Record Choferil - Completado";
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
<html lang="en" class="font-poppins">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Record Choferil - Completado - Tu Licencia</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.js"></script>
</head>
<body class="font-poppins">
<div class="min-h-screen flex flex-col bg-[#f7fdf9]">
    <main class="flex-grow flex items-center justify-center py-8">
        <div class="max-w-4xl w-full mx-auto px-4">
            <div class="bg-[#e8f8ee] rounded-3xl p-6 md:p-10 text-center shadow-sm">
                <div class="flex justify-center mb-6">
                    <div class="w-80 h-80">
                        <dotlottie-player
                            src="/json/chicolentes.json"
                            autoplay
                            loop
                        ></dotlottie-player>
                    </div>
                </div>
                
                <h2 class="text-4xl font-bold text-[#157a3c] mb-4">¡Felicitaciones <?php echo htmlspecialchars(getUserName()); ?>!</h2>
                <p class="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
                    Tu trámite ha concluido. Nos pondremos en contacto contigo 
                    luego de evaluar tu caso.
                </p>
                
                <div class="flex justify-center">
                    <a href="index.php?page=user-dashboard" 
                       class="inline-block px-12 py-4 bg-[#157a3c] text-white rounded-full hover:bg-[#0e6631] transition-colors text-lg font-medium">
                        Salir
                    </a>
                </div>
            </div>
        </div>
    </main>
</div>
</body>
</html> 