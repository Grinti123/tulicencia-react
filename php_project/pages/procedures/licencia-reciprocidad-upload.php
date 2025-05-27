<?php
// Don't start a new session as it's already started in header.php
// session_start();

// Set the title for the header
$title = "Licencia de Reciprocidad - Subir Documentos";
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
    <title>Licencia de Reciprocidad - Subir Documentos - Tu Licencia</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="font-poppins">
<div class="min-h-screen flex flex-col bg-[#f7fdf9]">
    <main class="flex-grow py-8">
        <div class="max-w-5xl mx-auto px-4">
            <div class="bg-[#e8f8ee] rounded-3xl p-6 md:p-8 shadow-sm">
                <div class="grid md:grid-cols-2 gap-8">
                    <!-- Left Column -->
                    <div class="flex flex-col justify-center items-center">
                        <div class="w-48 h-48 mb-4">
                            <img src="/images/chico_laptop.png" alt="Character with laptop" class="h-full w-auto">
                        </div>
                        
                        <h2 class="text-3xl font-bold text-[#157a3c] text-center">Subir tus <span class="font-bold">fotos y documentos</span></h2>
                        <p class="text-lg text-center mt-2">será súper sencillo.</p>
                    </div>
                    
                    <!-- Right Column -->
                    <div>
                        <div class="bg-[#157a3c] rounded-xl p-4 mb-6">
                            <div class="flex items-center gap-2 mb-2">
                                <img src="/images/user_check.png" alt="User check" class="h-8 w-8">
                                <h3 class="text-white font-medium">Formulario completado</h3>
                            </div>
                            
                            <p class="text-sm text-white pl-10">
                                1. Formulario DTOP-DISC-257 "Solicitud Para Certificado De Licencia De Conducir Vehículos De Motor por reciprocidad"
                            </p>
                        </div>
                        
                        <div class="bg-[#5e52a0] bg-opacity-80 rounded-xl p-4">
                            <div class="flex items-center gap-2 mb-2">
                                <img src="/images/info_circle.png" alt="Info" class="h-8 w-8">
                                <h3 class="text-white font-medium">Indicaciones</h3>
                            </div>
                            
                            <ol class="text-sm text-white pl-10 space-y-2">
                                <li>1. Suba los documentos requeridos para su trámite uno a uno. Cuando los suba, te aparecerá el recuadro de otro color mostrándote el archivo que has publicado. Si logras verlo, es que se subió exitosamente.</li>
                                <li>2. Una vez subas la primera, pasa a la segunda y luego a la tercera y así sucesivamente. Al finalizar, oprime el botón 'finalizar'. A continuación, adjunte los siguientes documentos. Se requieren para continuar con el proceso de su Trámite</li>
                            </ol>
                        </div>
                    </div>
                </div>
                
                <!-- Navigation Buttons -->
                <div class="flex flex-col-reverse md:flex-row md:justify-between mt-8 gap-4">
                    <a href="javascript:history.back()" 
                       class="text-center px-6 py-3 bg-white text-[#157a3c] border border-[#157a3c] rounded-full hover:bg-[#e8f8ee] transition-colors">
                        Regresar
                    </a>
                    
                    <a href="index.php?page=licencia-reciprocidad-selfie" 
                       class="text-center px-6 py-3 bg-[#157a3c] text-white rounded-full hover:bg-[#0e6631] transition-colors">
                        Siguiente
                    </a>
                </div>
            </div>
        </div>
    </main>
</div>
</body>
</html> 