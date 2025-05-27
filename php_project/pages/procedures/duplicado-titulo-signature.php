<?php
// Don't start a new session as it's already started in header.php
// session_start();

// Set the title for the header
$title = "Duplicado de Título - Firma Digital";
include_once 'components/header_procedure.php';

// Load user data from session
$userData = isset($_SESSION['user']) ? json_decode($_SESSION['user'], true) : null;

// Get user's name
function getUserName() {
    global $userData;
    if (!$userData) return 'there';
    
    $userItem = $userData['item'] ?? [];
    $firstName = $userItem['cl_nombre'] ?? '';
    $lastName = $userItem['cl_primerApellido'] ?? '';
    
    return $firstName ? $firstName : 'there';
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
    $redirectUrl = 'index.php?page=duplicado-titulo-upload';
}

// Current date for the document
$currentDate = date('d-m-Y');
?>
<!DOCTYPE html>
<html lang="es" class="font-poppins">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Duplicado de Título - Firma Digital - Tu Licencia</title>
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
        <div class="max-w-6xl mx-auto px-4">
            <div class="bg-[#e8f8ee] rounded-3xl p-6 md:p-10 shadow-sm">
                <form method="POST" action="" id="signatureForm" class="grid md:grid-cols-2 gap-8">
                    <!-- Left Content -->
                    <div class="flex flex-col items-center justify-center">
                        <div class="w-64 h-64 mb-4">
                            <dotlottie-player
                                src="/json/chicolentes.json"
                                autoplay
                                loop
                            ></dotlottie-player>
                        </div>
                        <h2 class="text-4xl font-bold mt-6 text-[#157a3c] text-center">Ahora tomaremos una firma digital</h2>
                        <p class="text-lg text-center mt-2">Que nos servirá para validar tu solicitud de duplicado de título</p>
                    </div>

                    <!-- Right Content -->
                    <div class="flex flex-col space-y-4">
                        <p class="font-medium text-[#157a3c]">Por favor, firme en la siguiente área</p>
                        
                        <!-- Signature area -->
                        <div class="bg-white border border-gray-300 rounded-lg">
                            <canvas id="signature-pad" class="signature-pad w-full h-40 rounded-lg"></canvas>
                        </div>
                        
                        <!-- Checkbox -->
                        <div class="flex items-center mt-2">
                            <input type="checkbox" id="terms" name="terms" required class="mr-2">
                            <label for="terms" class="text-sm text-gray-700">Acepto los <a href="#" class="text-[#157a3c] underline">Términos y condiciones</a></label>
                        </div>
                        
                        <!-- Buttons -->
                        <div class="space-y-2 mt-4">
                            <button type="button" id="clear-signature" 
                                    class="w-full py-3 text-[#f44336] border border-[#f44336] rounded-lg hover:bg-red-50 transition-colors flex justify-center items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                                </svg>
                                Borrar
                            </button>
                            
                            <button type="button" id="preview-button"
                                    class="w-full py-3 text-white bg-[#eaaa08] rounded-lg hover:bg-[#ca9108] transition-colors flex justify-center items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                    <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                                </svg>
                                Previsualizar documento
                            </button>
                            
                            <button type="submit" id="submit-button"
                                    class="w-full py-3 text-white bg-[#157a3c] rounded-lg hover:bg-[#0e6631] transition-colors">
                                Subir Documentos
                            </button>
                            
                            <a href="index.php?page=duplicado-titulo" 
                               class="block w-full py-3 text-center text-[#157a3c] border border-[#157a3c] rounded-lg hover:bg-[#e8f8ee] transition-colors">
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
                <h3 class="text-xl font-bold">Solicitud de Duplicado de Título</h3>
            </div>
            <p class="mb-6">
                Por medio de la presente, solicito un duplicado del título de propiedad 
                de mi vehículo. Certifico que el título original se ha perdido, dañado 
                o ha sido robado. Autorizo a Autodocs LLC Dba Cesco Online y sus gestores 
                a realizar los trámites necesarios ante el Departamento de Transportación 
                y Obras Públicas para la emisión de un nuevo título.
            </p>
            <p class="mb-4">
                Atentamente,
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
            penColor: 'rgb(0, 100, 0)'
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