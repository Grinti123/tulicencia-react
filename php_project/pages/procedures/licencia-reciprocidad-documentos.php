<?php
// Don't start a new session as it's already started in header.php
// session_start();

// Set the title for the header
$title = "Licencia de Reciprocidad - Documentos";
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

// Set redirect flag instead of using header()
$redirect = false;
$redirectUrl = '';

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Process file uploads (would be saved to server/database in real application)
    
    // Set redirect flag to true
    $redirect = true;
    $redirectUrl = 'index.php?page=licencia-reciprocidad-documentos-final';
}
?>
<!DOCTYPE html>
<html lang="es" class="font-poppins">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Licencia de Reciprocidad - Documentos - Tu Licencia</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.js"></script>
    <?php if ($redirect): ?>
    <script>
        // Redirect using JavaScript instead of PHP header()
        window.location.href = '<?php echo $redirectUrl; ?>';
    </script>
    <?php endif; ?>
</head>
<body class="font-poppins">
<div class="min-h-screen flex flex-col bg-[#f7fdf9]">
    <main class="flex-grow py-8">
        <div class="max-w-6xl mx-auto px-4">
            <div class="bg-[#e8f8ee] rounded-3xl p-6 md:p-10 shadow-sm">
                <form method="POST" action="" id="documentForm" enctype="multipart/form-data" class="grid md:grid-cols-2 gap-8">
                    <!-- Left Content -->
                    <div class="flex flex-col items-center justify-center">
                        <div class="w-64 h-64 mb-4">
                            <dotlottie-player
                                src="/json/chicolentes.json"
                                autoplay
                                loop
                            ></dotlottie-player>
                        </div>
                        
                        <h2 class="text-4xl font-bold mt-6 text-[#157a3c] text-center">Casi terminamos</h2>
                        <p class="text-lg text-center mt-2">Ahora necesitamos que subas estos documentos</p>
                    </div>

                    <!-- Right Content -->
                    <div class="space-y-6">
                        <h3 class="text-xl font-semibold text-[#157a3c]">Documentos requeridos</h3>
                        
                        <!-- Tarjeta de Seguro Social -->
                        <div class="p-4 bg-white rounded-lg shadow-sm">
                            <div class="flex justify-between items-start mb-3">
                                <div class="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#157a3c]" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clip-rule="evenodd" />
                                    </svg>
                                    <label for="ssn_file" class="text-gray-700 font-medium">Tarjeta de Seguro Social</label>
                                </div>
                                <span id="ssn_status" class="text-sm text-gray-500">Pendiente</span>
                            </div>
                            
                            <div class="flex items-center gap-4">
                                <div class="flex-1">
                                    <input type="file" id="ssn_file" name="ssn_file" class="hidden" accept="image/*,.pdf">
                                    <button type="button" onclick="document.getElementById('ssn_file').click();" 
                                            class="w-full py-3 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 flex items-center justify-center transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                        </svg>
                                        <span id="ssn_label">Seleccionar archivo</span>
                                    </button>
                                </div>
                                <div id="ssn_preview" class="hidden h-20 w-20 border border-gray-200 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer relative group">
                                    <img src="#" alt="Vista previa" class="h-full w-full object-cover">
                                    <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition-all">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                        </svg>
                                    </div>
                                </div>
                                <div id="ssn_example" class="h-20 w-20 border border-gray-200 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer relative group">
                                    <img src="/images/ssn_example.jpg" alt="Ejemplo" class="h-full w-full object-cover">
                                    <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition-all">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Certificado de nacimiento -->
                        <div class="p-4 bg-white rounded-lg shadow-sm">
                            <div class="flex justify-between items-start mb-3">
                                <div class="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#157a3c]" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
                                    </svg>
                                    <label for="birth_cert_file" class="text-gray-700 font-medium">Certificado de nacimiento</label>
                                </div>
                                <span id="birth_cert_status" class="text-sm text-gray-500">Pendiente</span>
                            </div>
                            
                            <div class="flex items-center gap-4">
                                <div class="flex-1">
                                    <input type="file" id="birth_cert_file" name="birth_cert_file" class="hidden" accept="image/*,.pdf">
                                    <button type="button" onclick="document.getElementById('birth_cert_file').click();" 
                                            class="w-full py-3 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 flex items-center justify-center transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                        </svg>
                                        <span id="birth_cert_label">Seleccionar archivo</span>
                                    </button>
                                </div>
                                <div id="birth_cert_preview" class="hidden h-20 w-20 border border-gray-200 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer relative group">
                                    <img src="#" alt="Vista previa" class="h-full w-full object-cover">
                                    <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition-all">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                        </svg>
                                    </div>
                                </div>
                                <div id="birth_cert_example" class="h-20 w-20 border border-gray-200 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer relative group">
                                    <img src="/images/birth_cert_example.jpg" alt="Ejemplo" class="h-full w-full object-cover">
                                    <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition-all">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Record Choferil -->
                        <div class="p-4 bg-white rounded-lg shadow-sm">
                            <div class="flex justify-between items-start mb-3">
                                <div class="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#157a3c]" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                                        <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
                                    </svg>
                                    <label for="record_file" class="text-gray-700 font-medium">Record Choferil de su estado de procedencia</label>
                                </div>
                                <span id="record_status" class="text-sm text-gray-500">Pendiente</span>
                            </div>
                            
                            <div class="flex items-center gap-4">
                                <div class="flex-1">
                                    <input type="file" id="record_file" name="record_file" class="hidden" accept="image/*,.pdf">
                                    <button type="button" onclick="document.getElementById('record_file').click();" 
                                            class="w-full py-3 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 flex items-center justify-center transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                        </svg>
                                        <span id="record_label">Seleccionar archivo</span>
                                    </button>
                                </div>
                                <div id="record_preview" class="hidden h-20 w-20 border border-gray-200 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer relative group">
                                    <img src="#" alt="Vista previa" class="h-full w-full object-cover">
                                    <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition-all">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                        </svg>
                                    </div>
                                </div>
                                <div id="record_example" class="h-20 w-20 border border-gray-200 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer relative group">
                                    <img src="/images/record_example.jpg" alt="Ejemplo" class="h-full w-full object-cover">
                                    <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition-all">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Navigation Buttons -->
                    <div class="md:col-span-2 mt-8 flex flex-col md:flex-row md:justify-between items-center gap-4">
                        <a href="javascript:history.back()" 
                           class="px-6 py-2 bg-white text-[#157a3c] border border-[#157a3c] rounded-full hover:bg-[#e8f8ee] transition-colors text-center w-full md:w-auto">
                            Regresar
                        </a>
                        
                        <button type="submit" id="submit-button" 
                                class="px-6 py-2 bg-[#157a3c] text-white rounded-full hover:bg-[#0e6631] transition-colors w-full md:w-auto">
                            Siguiente
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </main>
</div>

<!-- Full Image Preview Modal -->
<div id="image-preview-modal" class="fixed inset-0 bg-black bg-opacity-75 hidden flex items-center justify-center z-50">
    <div class="relative max-w-4xl w-full mx-4">
        <button id="close-preview-modal" class="absolute -top-10 right-0 text-white hover:text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
        <img id="full-size-image" src="" alt="Vista previa completa" class="max-h-[80vh] mx-auto object-contain bg-white">
    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        // Handle file uploads
        const fileInputs = [
            {
                input: document.getElementById('ssn_file'),
                preview: document.getElementById('ssn_preview'),
                example: document.getElementById('ssn_example'),
                label: document.getElementById('ssn_label'),
                status: document.getElementById('ssn_status')
            },
            {
                input: document.getElementById('birth_cert_file'),
                preview: document.getElementById('birth_cert_preview'),
                example: document.getElementById('birth_cert_example'),
                label: document.getElementById('birth_cert_label'),
                status: document.getElementById('birth_cert_status')
            },
            {
                input: document.getElementById('record_file'),
                preview: document.getElementById('record_preview'),
                example: document.getElementById('record_example'),
                label: document.getElementById('record_label'),
                status: document.getElementById('record_status')
            }
        ];
        
        // Modal elements
        const imagePreviewModal = document.getElementById('image-preview-modal');
        const fullSizeImage = document.getElementById('full-size-image');
        const closePreviewModal = document.getElementById('close-preview-modal');
        
        // Close modal when close button is clicked
        closePreviewModal.addEventListener('click', function() {
            imagePreviewModal.classList.add('hidden');
        });
        
        // Close modal when clicking outside the image
        imagePreviewModal.addEventListener('click', function(event) {
            if (event.target === imagePreviewModal) {
                imagePreviewModal.classList.add('hidden');
            }
        });
        
        // Setup thumbnail click events for examples
        fileInputs.forEach(({example}) => {
            const exampleImg = example.querySelector('img');
            example.addEventListener('click', function() {
                fullSizeImage.src = exampleImg.src;
                imagePreviewModal.classList.remove('hidden');
            });
        });
        
        fileInputs.forEach(({input, preview, example, label, status}) => {
            // Setup thumbnail click event for previews
            const previewImg = preview.querySelector('img');
            preview.addEventListener('click', function() {
                if (!preview.classList.contains('hidden')) {
                    fullSizeImage.src = previewImg.src;
                    imagePreviewModal.classList.remove('hidden');
                }
            });
            
            input.addEventListener('change', function() {
                if (this.files && this.files[0]) {
                    const file = this.files[0];
                    
                    // Update the label with the file name
                    label.textContent = file.name;
                    
                    // Update status
                    status.textContent = "Listo";
                    status.classList.remove('text-gray-500');
                    status.classList.add('text-green-500');
                    
                    // If it's an image, show preview
                    if (file.type.match('image.*')) {
                        const reader = new FileReader();
                        
                        reader.onload = function(e) {
                            const img = preview.querySelector('img');
                            img.src = e.target.result;
                            preview.classList.remove('hidden');
                            example.classList.add('hidden');
                        };
                        
                        reader.readAsDataURL(file);
                    } else if (file.type === 'application/pdf') {
                        // If it's a PDF, show PDF icon instead
                        const img = preview.querySelector('img');
                        img.src = '/images/pdf_icon.png'; // Make sure you have this icon
                        preview.classList.remove('hidden');
                        example.classList.add('hidden');
                    }
                }
            });
        });
        
        // Form validation
        document.getElementById('documentForm').addEventListener('submit', function(event) {
            // Remove the validation requirement - files are now optional
            // The previous validation code is commented out below
            
            /*
            let valid = true;
            const requiredFiles = [
                { id: 'ssn_file', name: 'Tarjeta de Seguro Social' },
                { id: 'birth_cert_file', name: 'Certificado de nacimiento' },
                { id: 'record_file', name: 'Record Choferil' }
            ];
            
            const missingFiles = [];
            
            requiredFiles.forEach(file => {
                const input = document.getElementById(file.id);
                if (!input.files || !input.files[0]) {
                    valid = false;
                    missingFiles.push(file.name);
                }
            });
            
            if (!valid) {
                event.preventDefault();
                alert('Por favor, suba los siguientes documentos:\n' + missingFiles.join('\n'));
            }
            */
            
            // Optional: add a confirmation if no files are uploaded
            const ssn_file = document.getElementById('ssn_file').files;
            const birth_cert_file = document.getElementById('birth_cert_file').files;
            const record_file = document.getElementById('record_file').files;
            
            if (!ssn_file.length && !birth_cert_file.length && !record_file.length) {
                if (!confirm('No ha subido ningún documento. ¿Desea continuar de todos modos?')) {
                    event.preventDefault();
                }
            }
        });
    });
</script>
</body>
</html> 