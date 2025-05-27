<?php
// Don't start a new session as it's already started in header.php
// session_start();

// Set the title for the header
$title = "Tablillas Incapacidad - Subir Documentos";
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
    <title>Tablillas Incapacidad - Subir Documentos - Tu Licencia</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="font-poppins">
<div class="min-h-screen flex flex-col bg-[#f7fdf9]">
    <main class="flex-grow py-8">
        <div class="max-w-4xl mx-auto px-4">
            <div class="bg-[#e8f8ee] rounded-3xl p-6 md:p-10 shadow-sm">
                <h2 class="text-3xl font-bold text-[#157a3c] mb-6 text-center">Subir Documentos Requeridos</h2>
                
                <p class="text-gray-700 mb-8 text-center">
                    Por favor, sube los siguientes documentos para completar tu solicitud de tablillas de incapacidad.
                </p>
                
                <form action="index.php?page=tablillas-incapacidad-success" method="GET" class="space-y-6">
                    <input type="hidden" name="page" value="tablillas-incapacidad-success">
                    
                    <!-- Document Upload Section -->
                    <div class="space-y-4 max-w-lg mx-auto">
                        <!-- Certificación médica -->
                        <div class="bg-[#f0f9f4] p-5 rounded-lg">
                            <h3 class="text-[#157a3c] font-medium mb-4">Certificación médica <span class="text-red-500">*</span></h3>
                            
                            <div class="flex justify-center">
                                <button type="button" class="flex flex-col items-center px-4 py-2 text-gray-500 hover:text-[#157a3c]">
                                    <span class="mb-1">Cambiar archivo</span>
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        
                        <!-- Identificación -->
                        <div class="bg-[#f0f9f4] p-5 rounded-lg">
                            <h3 class="text-[#157a3c] font-medium mb-4">Identificación <span class="text-red-500">*</span></h3>
                            
                            <div class="flex justify-center">
                                <button type="button" class="flex flex-col items-center px-4 py-2 text-gray-500 hover:text-[#157a3c]">
                                    <span class="mb-1">Cambiar archivo</span>
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        
                        <!-- Licencia de conducir -->
                        <div class="bg-[#f0f9f4] p-5 rounded-lg">
                            <h3 class="text-[#157a3c] font-medium mb-4">Licencia de conducir <span class="text-red-500">*</span></h3>
                            
                            <div class="flex justify-center">
                                <button type="button" class="flex flex-col items-center px-4 py-2 text-gray-500 hover:text-[#157a3c]">
                                    <span class="mb-1">Cambiar archivo</span>
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        
                        <!-- Autorización -->
                        <div class="bg-[#f0f9f4] p-5 rounded-lg">
                            <h3 class="text-[#157a3c] font-medium mb-4">Autorización <span class="text-red-500">*</span></h3>
                            
                            <div class="flex justify-center">
                                <button type="button" class="flex flex-col items-center px-4 py-2 text-gray-500 hover:text-[#157a3c]">
                                    <span class="mb-1">Cambiar archivo</span>
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Navigation Buttons -->
                    <div class="flex flex-col-reverse md:flex-row md:justify-between mt-10 gap-4">
                        <a href="index.php?page=tablillas-incapacidad-confirmacion" 
                           class="px-6 py-3 bg-white text-[#157a3c] border border-[#157a3c] rounded-full hover:bg-[#e8f8ee] transition-colors text-center">
                            Regresar
                        </a>
                        
                        <button type="submit" 
                                class="px-6 py-3 bg-[#157a3c] text-white rounded-full hover:bg-[#0e6631] transition-colors">
                            Completar Solicitud
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </main>
</div>
</body>
</html> 