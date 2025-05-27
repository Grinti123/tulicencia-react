<?php
// Don't start a new session as it's already started in header.php
// session_start();

// Set the title for the header
$title = "Licencia de Reciprocidad - Firma Digital";
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

// Get user's full name
function getUserFullName() {
    global $userData;
    if (!$userData) return 'Anonymous User';
    
    $userItem = $userData['item'] ?? [];
    $firstName = $userItem['cl_nombre'] ?? '';
    $lastName = $userItem['cl_primerApellido'] ?? '';
    $secondLastName = $userItem['cl_segundoApellido'] ?? '';
    
    return trim("$firstName $lastName $secondLastName");
}

// Set redirect flag instead of using header()
$redirect = false;
$redirectUrl = '';

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Process the signature data (would be saved to database in real application)
    
    // Set redirect flag to true
    $redirect = true;
    $redirectUrl = 'index.php?page=licencia-reciprocidad-documentos';
}

// Current date for the document
$currentDate = date('d-m-Y');
?>
<!DOCTYPE html>
<html lang="es" class="font-poppins">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Licencia de Reciprocidad - Firma Digital - Tu Licencia</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/signature_pad/1.5.3/signature_pad.min.js"></script>
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
        <div class="max-w-5xl mx-auto px-4">
            <div class="bg-[#e8f8ee] rounded-3xl p-6 md:p-8 shadow-sm">
                <form method="POST" action="" id="signatureForm" class="grid md:grid-cols-2 gap-8">
                    <!-- Left Column -->
                    <div class="flex flex-col justify-center items-center">
                        <div class="w-48 h-48 mb-4">
                            <dotlottie-player
                                src="/json/chicolentes.json"
                                autoplay
                                loop
                            ></dotlottie-player>
                        </div>
                        
                        <h2 class="text-3xl font-bold text-[#157a3c] text-center mb-2">Ahora tomaremos</h2>
                        <h2 class="text-3xl font-bold text-[#157a3c] text-center mb-4">una firma digital</h2>
                        
                        <p class="text-center text-gray-600">
                            Que nos servirá para validar tus documentos
                        </p>
                    </div>
                    
                    <!-- Right Column -->
                    <div class="flex flex-col items-center justify-center">
                        <p class="mb-2 text-gray-700 font-medium">Por favor, firme en la siguiente área</p>
                        
                        <div class="bg-white w-full max-w-xs h-32 rounded-lg mb-4 border border-gray-300">
                            <canvas id="signature-pad" class="signature-pad w-full h-32 rounded-lg"></canvas>
                        </div>
                        
                        <div class="flex items-center mb-4">
                            <input type="checkbox" id="terms" name="terms" required class="h-4 w-4 text-[#157a3c] focus:ring-[#157a3c] rounded">
                            <label for="terms" class="ml-2 text-sm text-gray-700">
                                Acepto los <a href="#" class="text-[#157a3c] hover:underline">Términos y condiciones</a>
                            </label>
                        </div>
                        
                        <div class="w-full max-w-xs flex flex-col gap-2">
                            <button type="button" id="clear-signature" class="px-6 py-3 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors">
                                Borrar
                            </button>
                            
                            <button type="submit" id="submit-button" class="px-6 py-3 bg-[#157a3c] text-white rounded-full hover:bg-[#0e6631] transition-colors">
                                Continuar
                            </button>
                            
                            <button type="button" id="preview-button" class="px-6 py-3 bg-[#5e52a0] text-white rounded-full hover:bg-[#4a4080] transition-colors">
                                Previsualizar documento
                            </button>
                            
                            <a href="javascript:history.back()" class="text-center px-6 py-3 bg-white text-[#157a3c] border border-[#157a3c] rounded-full hover:bg-[#e8f8ee] transition-colors">
                                Regresar
                            </a>
                        </div>
                    </div>
                    
                    <input type="hidden" name="signature_data" id="signature_data">
                </form>
            </div>
        </div>
    </main>
</div>

<!-- Preview Modal -->
<div id="preview-modal" class="fixed inset-0 bg-black bg-opacity-50 hidden flex items-center justify-center z-50">
    <div class="bg-white rounded-lg max-w-2xl w-full mx-4 p-6">
        <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold text-[#157a3c]">Previsualización del documento</h3>
            <button type="button" id="close-preview" class="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        <div class="border border-gray-200 rounded-lg p-6 bg-white">
            <div class="flex justify-center mb-4">
                <h3 class="text-xl font-bold">Autorización de Licencia de Reciprocidad</h3>
            </div>
            <p class="mb-6">
                Sirva la presente carta para autorizar a Autodocs LLC Dba Cesco Online y 
                sus gestores autorizados a tramitar la licencia de reciprocidad ante el 
                Departamento de Transportación y Obras Públicas, CESCO, DISCO y 
                agencias necesarias para el procesamiento de mi licencia de 
                conducir.
            </p>
            <p class="mb-4">
                Gracias,
            </p>
            <div class="mb-2">
                <img id="signature-image" class="max-w-xs" src="" alt="Signature">
            </div>
            <p><?php echo htmlspecialchars(getUserFullName()); ?></p>
            <p><?php echo $currentDate; ?></p>
        </div>
    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        // Initialize signature pad
        const canvas = document.getElementById('signature-pad');
        const signaturePad = new SignaturePad(canvas, {
            backgroundColor: 'rgb(255, 255, 255)',
            penColor: 'rgb(21, 122, 60)' // #157a3c color
        });

        // Make the canvas responsive
        function resizeCanvas() {
            const ratio = Math.max(window.devicePixelRatio || 1, 1);
            canvas.width = canvas.offsetWidth * ratio;
            canvas.height = canvas.offsetHeight * ratio;
            canvas.getContext("2d").scale(ratio, ratio);
            signaturePad.clear(); // Otherwise the canvas will be filled with the previous content
        }

        // Set canvas dimensions on load
        resizeCanvas();

        // And also on window resize
        window.addEventListener("resize", resizeCanvas);

        // Clear button
        document.getElementById('clear-signature').addEventListener('click', function() {
            signaturePad.clear();
        });

        // Preview modal handling
        const previewModal = document.getElementById('preview-modal');
        
        // Preview button
        document.getElementById('preview-button').addEventListener('click', function() {
            if (signaturePad.isEmpty()) {
                alert('Por favor, firme antes de continuar.');
                return;
            }

            const signatureData = signaturePad.toDataURL();
            document.getElementById('signature_data').value = signatureData;
            document.getElementById('signature-image').src = signatureData;
            previewModal.classList.remove('hidden');
        });

        // Close preview button
        document.getElementById('close-preview').addEventListener('click', function() {
            previewModal.classList.add('hidden');
        });

        // Close modal when clicking outside
        window.addEventListener('click', function(event) {
            if (event.target === previewModal) {
                previewModal.classList.add('hidden');
            }
        });

        // Form submission
        document.getElementById('signatureForm').addEventListener('submit', function(event) {
            if (signaturePad.isEmpty()) {
                event.preventDefault();
                alert('Por favor, firme antes de continuar.');
                return;
            }

            const termsCheckbox = document.getElementById('terms');
            if (!termsCheckbox.checked) {
                event.preventDefault();
                alert('Debe aceptar los términos y condiciones para continuar.');
                return;
            }

            const signatureData = signaturePad.toDataURL();
            document.getElementById('signature_data').value = signatureData;
        });
    });
</script>
</body>
</html> 