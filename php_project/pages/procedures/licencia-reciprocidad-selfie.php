<?php
// Don't start a new session as it's already started in header.php
// session_start();

// Set the title for the header
$title = "Licencia de Reciprocidad - Tomar Selfie";
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

// Handle form submission with the selfie data
$redirect = false;
$redirectUrl = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['selfie_data'])) {
    // Process the selfie data (in a real application, save to server or database)
    // Here we just set the redirect flag
    $redirect = true;
    $redirectUrl = 'index.php?page=licencia-reciprocidad-firma';
}
?>
<!DOCTYPE html>
<html lang="es" class="font-poppins">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Licencia de Reciprocidad - Tomar Selfie - Tu Licencia</title>
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
        <div class="max-w-5xl mx-auto px-4">
            <div class="bg-[#e8f8ee] rounded-3xl p-6 md:p-8 shadow-sm">
                <div class="grid md:grid-cols-2 gap-8">
                    <!-- Left Column -->
                    <div class="flex flex-col justify-center items-center">
                        <div class="w-48 h-48 mb-4">
                            <dotlottie-player
                                src="/json/chicolentes.json"
                                autoplay
                                loop
                            ></dotlottie-player>
                        </div>
                        
                        <h2 class="text-3xl font-bold text-[#157a3c] text-center">¡Primero tomaremos</h2>
                        <h2 class="text-3xl font-bold text-[#157a3c] text-center mb-2">una Selfie!</h2>
                        
                        <p class="text-center text-gray-600 mb-4">
                            <strong>Nota:</strong> Asegúrate de que tu rostro esté bien iluminado y que la imagen sea clara. (La fotografía debe ser tomada en fondo blanco)
                        </p>
                        
                        <div class="bg-white p-4 rounded-lg shadow-sm w-full">
                            <h3 class="font-medium text-[#157a3c] mb-2">Requisitos para la foto:</h3>
                            <ul class="text-sm text-gray-600 space-y-1 list-disc pl-5">
                                <li>Fondo claro o blanco</li>
                                <li>Buena iluminación</li>
                                <li>Sin lentes de sol o sombreros</li>
                                <li>Expresión facial neutral</li>
                                <li>Frente a la cámara, mirando directamente</li>
                            </ul>
                        </div>
                    </div>
                    
                    <!-- Right Column -->
                    <div class="flex flex-col items-center justify-center">
                        <form id="selfieForm" method="POST" action="" class="w-full flex flex-col items-center">
                            <input type="hidden" name="selfie_data" id="selfie_data">
                            
                            <!-- Camera View -->
                            <div class="relative w-full max-w-xs mb-4">
                                <!-- Overlay guide for face alignment -->
                                <div id="camera-guide" class="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
                                    <div class="w-36 h-48 border-2 border-dashed border-white rounded-full opacity-50"></div>
                                </div>
                                
                                <!-- Camera feed (visible when streaming) -->
                                <video id="camera-feed" class="w-full h-56 bg-gray-800 rounded-lg object-cover" autoplay playsinline></video>
                                
                                <!-- Captured photo (hidden initially) -->
                                <canvas id="camera-canvas" class="hidden w-full h-56 bg-gray-800 rounded-lg object-cover"></canvas>
                            </div>
                            
                            <div id="camera-permissions" class="hidden w-full max-w-xs p-4 bg-yellow-50 text-yellow-800 rounded-lg mb-4">
                                <p class="text-sm text-center">Por favor, permite el acceso a tu cámara para tomar la foto.</p>
                            </div>
                            
                            <div id="camera-error" class="hidden w-full max-w-xs p-4 bg-red-50 text-red-800 rounded-lg mb-4">
                                <p class="text-sm text-center">No se pudo acceder a la cámara. Por favor, verifica los permisos o usa otro dispositivo.</p>
                            </div>
                            
                            <!-- Camera Controls -->
                            <div class="flex flex-col gap-3 w-full max-w-xs">
                                <button type="button" id="take-photo-btn" class="px-6 py-3 bg-[#157a3c] text-white rounded-full hover:bg-[#0e6631] transition-colors flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    Tomar Foto
                                </button>
                                
                                <button type="button" id="retake-photo-btn" class="hidden px-6 py-3 bg-[#ff6b6b] text-white rounded-full hover:bg-[#ff5252] transition-colors">
                                    Rehacer Foto
                                </button>
                                
                                <button type="submit" id="continue-btn" class="hidden px-6 py-3 bg-[#157a3c] text-white rounded-full hover:bg-[#0e6631] transition-colors">
                                    Continuar
                                </button>
                                
                                <a href="javascript:history.back()" class="text-center text-[#157a3c] hover:underline">
                                    Regresar
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </main>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const cameraFeed = document.getElementById('camera-feed');
    const cameraCanvas = document.getElementById('camera-canvas');
    const cameraPermissions = document.getElementById('camera-permissions');
    const cameraError = document.getElementById('camera-error');
    const takePhotoBtn = document.getElementById('take-photo-btn');
    const retakePhotoBtn = document.getElementById('retake-photo-btn');
    const continueBtn = document.getElementById('continue-btn');
    const selfieData = document.getElementById('selfie_data');
    const selfieForm = document.getElementById('selfieForm');
    
    // Video stream
    let stream = null;
    
    // Initialize camera
    async function initCamera() {
        try {
            cameraPermissions.classList.remove('hidden');
            
            // Request camera with preferred settings for a selfie
            stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: 'user', // Front camera
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                },
                audio: false
            });
            
            // Hide permissions message
            cameraPermissions.classList.add('hidden');
            
            // Attach stream to video element
            cameraFeed.srcObject = stream;
            
            // Show take photo button
            takePhotoBtn.classList.remove('hidden');
            
        } catch (err) {
            console.error('Error accessing camera:', err);
            cameraPermissions.classList.add('hidden');
            cameraError.classList.remove('hidden');
        }
    }
    
    // Take photo
    function takePhoto() {
        // Setup canvas to match video dimensions
        const context = cameraCanvas.getContext('2d');
        cameraCanvas.width = cameraFeed.videoWidth;
        cameraCanvas.height = cameraFeed.videoHeight;
        
        // Draw video frame to canvas
        context.drawImage(cameraFeed, 0, 0, cameraCanvas.width, cameraCanvas.height);
        
        // Get image data
        const imageData = cameraCanvas.toDataURL('image/jpeg');
        selfieData.value = imageData;
        
        // Hide video, show canvas
        cameraFeed.classList.add('hidden');
        cameraCanvas.classList.remove('hidden');
        
        // Show/hide buttons
        takePhotoBtn.classList.add('hidden');
        retakePhotoBtn.classList.remove('hidden');
        continueBtn.classList.remove('hidden');
    }
    
    // Retake photo
    function retakePhoto() {
        // Hide canvas, show video
        cameraCanvas.classList.add('hidden');
        cameraFeed.classList.remove('hidden');
        
        // Show/hide buttons
        retakePhotoBtn.classList.add('hidden');
        continueBtn.classList.add('hidden');
        takePhotoBtn.classList.remove('hidden');
        
        // Clear the data
        selfieData.value = '';
    }
    
    // Form submission
    selfieForm.addEventListener('submit', function(event) {
        // Check if we have a photo
        if (!selfieData.value) {
            event.preventDefault();
            alert('Por favor, toma una foto antes de continuar.');
        }
    });
    
    // Button event listeners
    takePhotoBtn.addEventListener('click', takePhoto);
    retakePhotoBtn.addEventListener('click', retakePhoto);
    
    // Stop camera when leaving page
    window.addEventListener('beforeunload', function() {
        if (stream) {
            stream.getTracks().forEach(track => {
                track.stop();
            });
        }
    });
    
    // Initialize camera on page load
    initCamera();
});
</script>
</body>
</html> 