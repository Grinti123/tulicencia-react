<?php
// Don't start a new session as it's already started in header.php
// session_start();

// Set the title for the header
$title = "Tablillas Incapacidad - Confirmación";
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
    <title>Tablillas Incapacidad - Confirmación - Tu Licencia</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="font-poppins">
<div class="min-h-screen flex flex-col items-center justify-center bg-[#e8f8ee]">
    <div class="max-w-4xl w-full mx-auto px-4 py-12 text-center">
        <div class="mb-8">
            <img src="/images/chico_stand.png" alt="Personaje" class="h-40 mx-auto">
        </div>
        
        <h2 class="text-4xl font-bold text-[#157a3c] mb-4">¡Gracias!</h2>
        
        <p class="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Su información fue recibida y su solicitud registrada. Recibirás un e-mail con la confirmación.
        </p>
        
        <p class="text-lg font-medium text-gray-700 mb-6">
            El siguiente paso será subir tus documentos. ¡Es fácil y rápido!
        </p>
        
        <div class="flex flex-col items-center gap-4 mt-6">
            <a href="index.php?page=tablillas-incapacidad-upload" 
               class="inline-block w-64 px-6 py-4 bg-[#157a3c] text-white rounded-full hover:bg-[#0e6631] transition-colors text-lg font-medium">
                Comenzemos
            </a>
            
            <a href="index.php?page=user-dashboard" 
               class="text-[#157a3c] underline">
                Estoy cansado, prefiero hacerlo después
            </a>
        </div>
    </div>
</div>
</body>
</html> 