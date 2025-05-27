<?php
// Don't start a new session as it's already started in header.php
// session_start();

// Set the title for the header
$title = "Record Choferil - Document Upload";
include_once 'components/header_procedure.php';

// Load user data from session
$userData = isset($_SESSION['user']) ? json_decode($_SESSION['user'], true) : null;

// Get user's name
function getUserName() {
    global $userData;
    if (!$userData) return 'there';
    
    $userItem = $userData['item'] ?? [];
    $firstName = $userItem['cl_nombre'] ?? '';
    
    return $firstName ?: 'there';
}

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // In a real application, you would process file uploads here
    // For demonstration purposes, we'll just redirect to the signature page
    header('Location: index.php?page=record-choferil-signature');
    exit;
}
?>
<!DOCTYPE html>
<html lang="en" class="font-poppins">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Record Choferil - Document Upload - Tu Licencia</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.js"></script>
</head>
<body class="font-poppins">
<div class="min-h-screen flex flex-col bg-[#f7fdf9]">
    <main class="flex-grow py-8">
        <div class="max-w-6xl mx-auto px-4">
            <div class="bg-[#e8f8ee] rounded-3xl p-6 md:p-10 shadow-sm">
                <form method="POST" action="" enctype="multipart/form-data">
                    <div class="grid md:grid-cols-2 gap-8">
                        <!-- Left Content -->
                        <div class="flex flex-col items-center justify-center">
                            <div class="w-64 h-64 mb-4">
                                <dotlottie-player
                                    src="/json/chicolentes.json"
                                    autoplay
                                    loop
                                ></dotlottie-player>
                            </div>
                            <h2 class="text-4xl font-bold mt-6 text-[#157a3c] text-center">Documentos Requeridos</h2>
                            <p class="text-lg text-center mt-2">Por favor sube los siguientes documentos</p>
                        </div>

                        <!-- Right Content -->
                        <div class="space-y-8">
                            <!-- Document Upload Section -->
                            <div class="space-y-6">
                                <div>
                                    <h3 class="text-lg font-medium mb-4">Identificación con foto <span class="text-purple-500">*</span></h3>
                                    <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                        <input type="file" id="idPhoto" name="idPhoto" class="hidden" accept="image/*,.pdf" required />
                                        <label for="idPhoto" class="cursor-pointer">
                                            <div class="flex flex-col items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                </svg>
                                                <p class="mt-2 text-sm text-gray-600">Haz clic para subir o arrastra y suelta</p>
                                                <p class="text-xs text-gray-500 mt-1">PNG, JPG, PDF hasta 5MB</p>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <h3 class="text-lg font-medium mb-4">Licencia de conducir <span class="text-purple-500">*</span></h3>
                                    <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                        <input type="file" id="driverLicense" name="driverLicense" class="hidden" accept="image/*,.pdf" required />
                                        <label for="driverLicense" class="cursor-pointer">
                                            <div class="flex flex-col items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                </svg>
                                                <p class="mt-2 text-sm text-gray-600">Haz clic para subir o arrastra y suelta</p>
                                                <p class="text-xs text-gray-500 mt-1">PNG, JPG, PDF hasta 5MB</p>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <h3 class="text-lg font-medium mb-4">Comprobante de pago <span class="text-purple-500">*</span></h3>
                                    <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                        <input type="file" id="paymentProof" name="paymentProof" class="hidden" accept="image/*,.pdf" required />
                                        <label for="paymentProof" class="cursor-pointer">
                                            <div class="flex flex-col items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                </svg>
                                                <p class="mt-2 text-sm text-gray-600">Haz clic para subir o arrastra y suelta</p>
                                                <p class="text-xs text-gray-500 mt-1">PNG, JPG, PDF hasta 5MB</p>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Navigation Buttons -->
                    <div class="flex flex-col-reverse md:flex-row md:justify-between mt-8 gap-4">
                        <a href="index.php?page=record-choferil" 
                           class="px-6 py-2 bg-white text-[#1a602d] border border-[#1a602d] rounded-full hover:bg-[#e8f8ee] transition-colors text-center">
                            Regresar
                        </a>

                        <button type="submit" 
                                id="next-button"
                                class="px-6 py-2 bg-[#1a602d] text-white rounded-full hover:bg-[#144823] transition-colors">
                            Continuar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </main>
</div>

<!-- Include DotLottie Player -->
<script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs" type="module"></script>

<!-- File Upload Preview Script -->
<script>
    // Add JavaScript to show file preview when files are selected
    document.addEventListener('DOMContentLoaded', function() {
        const fileInputs = document.querySelectorAll('input[type="file"]');
        
        fileInputs.forEach(input => {
            input.addEventListener('change', function(e) {
                const parentDiv = this.parentElement;
                const fileName = this.files[0]?.name;
                
                if (fileName) {
                    // Create or update file name display
                    let fileNameDisplay = parentDiv.querySelector('.file-name-display');
                    if (!fileNameDisplay) {
                        fileNameDisplay = document.createElement('p');
                        fileNameDisplay.className = 'file-name-display mt-2 text-sm text-[#157a3c] font-medium';
                        parentDiv.appendChild(fileNameDisplay);
                    }
                    fileNameDisplay.textContent = `Archivo seleccionado: ${fileName}`;
                }
            });
        });

        // Add form validation
        document.querySelector('form').addEventListener('submit', function(e) {
            const idPhoto = document.getElementById('idPhoto');
            const driverLicense = document.getElementById('driverLicense');
            const paymentProof = document.getElementById('paymentProof');
            
            if (!idPhoto.files.length || !driverLicense.files.length || !paymentProof.files.length) {
                e.preventDefault();
                alert('Por favor, sube todos los documentos requeridos.');
                return false;
            }

            // Add loading indicator to button
            document.getElementById('next-button').innerHTML = `
                <div class="flex items-center justify-center">
                    <div class="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-white rounded-full"></div>
                    Procesando...
                </div>
            `;
        });
    });
</script>
</body>
</html> 