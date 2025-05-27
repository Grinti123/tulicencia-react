<?php
// Don't start a new session as it's already started in header.php
// session_start();

// Initialize form data from session or set defaults
$formData = $_SESSION['license_upload_data'] ?? [
    'selfie' => null,
    'signature' => null,
    'documents' => [
        'socialSecurity' => null,
        'birthCertificate' => null,
        'proofOfAddress' => null,
        'medicalCertification' => null,
        'licensePhotos' => null,
        'licensePhotosFront' => null,
        'licensePhotosBack' => null
    ]
];

// Get current step from session or default to 1
$step = $_SESSION['license_upload_step'] ?? 1;

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['action'])) {
        if ($_POST['action'] === 'next') {
            $step++;
        } elseif ($_POST['action'] === 'prev') {
            $step--;
        } elseif ($_POST['action'] === 'submit') {
            // Go to success step
            $step = 6;
        }
    }
    
    // Handle selfie data from canvas
    if (isset($_POST['selfie_data']) && !empty($_POST['selfie_data'])) {
        $uploadDir = '../uploads/';
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }
        
        // Process base64 encoded image
        $img = $_POST['selfie_data'];
        $img = str_replace('data:image/jpeg;base64,', '', $img);
        $img = str_replace(' ', '+', $img);
        $data = base64_decode($img);
        $fileName = uniqid() . '_selfie.jpg';
        $file = $uploadDir . $fileName;
        file_put_contents($file, $data);
        
        $formData['selfie'] = $fileName;
    }
    
    // Handle signature data
    if (isset($_POST['signature']) && !empty($_POST['signature'])) {
        $uploadDir = '../uploads/';
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }
        
        // Process base64 encoded image
        $img = $_POST['signature'];
        $img = str_replace('data:image/png;base64,', '', $img);
        $img = str_replace(' ', '+', $img);
        $data = base64_decode($img);
        $fileName = uniqid() . '_signature.png';
        $file = $uploadDir . $fileName;
        file_put_contents($file, $data);
        
        $formData['signature'] = $fileName;
    }
    
    // Handle file uploads
    if (!empty($_FILES)) {
        $uploadDir = '../uploads/';
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        foreach ($_FILES as $field => $file) {
            if ($file['error'] === UPLOAD_ERR_OK) {
                $tempName = $file['tmp_name'];
                $fileName = uniqid() . '_' . basename($file['name']);
                $targetPath = $uploadDir . $fileName;

                if (move_uploaded_file($tempName, $targetPath)) {
                    if (strpos($field, 'documents_') === 0) {
                        $docField = substr($field, strlen('documents_'));
                        $formData['documents'][$docField] = $fileName;
                    } else {
                        $formData[$field] = $fileName;
                    }
                }
            }
        }
    }
    
    // Update form data in session
    $_SESSION['license_upload_data'] = $formData;
    $_SESSION['license_upload_step'] = $step;
}

// Load user data from session
$userData = isset($_SESSION['user']) ? json_decode($_SESSION['user'], true) : null;

// Get user's name for personalized messages
function getUserName() {
    global $userData;
    if (!$userData) return 'Juan Pablo';
    
    $userItem = $userData['item'] ?? [];
    $firstName = $userItem['cl_nombre'] ?? '';
    
    return $firstName ?: 'Juan Pablo';
}

// Set the title for the header
$title = "License Renewal - Upload Documents";
include_once 'components/header_procedure.php';

// Main container start
?>
<!-- Include Signature Pad library -->
<script src="https://cdn.jsdelivr.net/npm/signature_pad@4.0.0/dist/signature_pad.umd.min.js"></script>
    <div class="min-h-screen flex flex-col bg-gradient-to-b from-[#f7fdf9] to-white">
        
        <main class="flex-grow py-8">
            <div class="max-w-6xl mx-auto px-4">
                <form method="POST" enctype="multipart/form-data" class="bg-[#e8f8ee] rounded-3xl p-6 md:p-10 shadow-sm">
                    <?php if ($step === 1): ?>
                        <!-- Step 1: Instructions -->
                        <div class="max-w-2xl mx-auto">
                            <h2 class="text-2xl font-bold text-[#147A31] mb-6">Uploading your photos and documents will be super easy.</h2>
                            
                            <div class="bg-white rounded-lg p-4 mb-6">
                                <h3 class="font-semibold text-[#147A31] mb-2">Completed form</h3>
                                <ol class="list-decimal pl-5">
                                    <li class="text-gray-600">
                                        Formulario DTOP-USC-264 <b>"Solicitud certificado Licencia para conducir vehículos de motor"</b>.
                                    </li>
                                </ol>
                            </div>

                            <div class="bg-[#147A31] text-white rounded-lg p-4">
                                <h3 class="font-semibold mb-2">Indications</h3>
                                <ol class="list-decimal pl-5 space-y-2">
                                    <li>Suba los documentos requeridos para su trámite uno a uno.</li>
                                    <li>Una vez subas la primera, pasa a la segunda y luego a la tercera y así sucesivamente. Al finalizar, oprime el botón "finalizar". A continuación adjunte los siguientes documentos. Se requiren para continuar con el proceso de su trámite.</li>
                                </ol>
                            </div>
                        </div>

                    <?php elseif ($step === 2): ?>
                        <!-- Step 2: Selfie Upload -->
                        <div class="grid md:grid-cols-2 gap-8">
                            <!-- Left Column -->
                            <div class="flex flex-col justify-center items-center">
                                <img src="/images/chico-laptop.png" alt="Person with laptop" class="w-40 h-40 mb-4">
                                
                                <h2 class="text-4xl font-bold text-[#157a3c] text-center">¡Primero tomaremos</h2>
                                <h2 class="text-4xl font-bold text-[#157a3c] text-center mb-4">una Selfie!</h2>
                                
                                <p class="text-center text-gray-600 mb-4">
                                    <strong>**Nota:**</strong> Asegúrate de que tu rostro esté bien iluminado y que la imagen sea clara. (La fotografía debe ser tomada en fondo blanco)
                                </p>
                            </div>
                            
                            <!-- Right Column -->
                            <div class="flex flex-col items-center justify-center">
                                <div class="relative w-full max-w-md mb-4">
                                    <div class="mb-2">
                                        <p class="text-sm text-gray-600 text-right">
                                            <strong>Nota:</strong> Asegúrate de que tu rostro esté bien iluminado y que la imagen sea clara. (La fotografía debe ser tomada en fondo blanco)
                                        </p>
                                    </div>
                                    
                                    <!-- Camera feed or preview container -->
                                    <div class="w-full aspect-[4/3] bg-gray-200 rounded-md overflow-hidden">
                                        <!-- Camera feed (visible when streaming) -->
                                        <video id="camera" class="w-full h-full object-cover" autoplay playsinline></video>
                                        
                                        <!-- Captured photo (hidden initially) -->
                                        <canvas id="canvas" class="hidden w-full h-full object-cover"></canvas>
                                        
                                        <!-- Show preview if already uploaded -->
                                        <?php if ($formData['selfie']): ?>
                                            <img src="../uploads/<?php echo $formData['selfie']; ?>" alt="Selfie preview" class="w-full h-full object-cover">
                                        <?php endif; ?>
                                    </div>
                                    
                                    <div id="camera-permissions" class="hidden w-full p-4 bg-yellow-50 text-yellow-800 rounded-lg my-4">
                                        <p class="text-sm text-center">Por favor, permite el acceso a tu cámara para tomar la foto.</p>
                                    </div>
                                    
                                    <div id="camera-error" class="hidden w-full p-4 bg-red-50 text-red-800 rounded-lg my-4">
                                        <p class="text-sm text-center">No se pudo acceder a la cámara. Por favor, verifica los permisos o usa otro dispositivo.</p>
                                    </div>
                                    
                                    <!-- Camera Controls -->
                                    <div class="mt-4 flex flex-col gap-3">
                                        <button type="button" id="retakePhoto" 
                                                class="px-6 py-3 bg-[#ff6b6b] text-white rounded-md hover:bg-[#ff5252] transition-colors w-full">
                                            Rehacer Foto
                                        </button>
                                        
                                        <button type="submit" id="nextButton" 
                                                class="px-6 py-3 bg-[#157a3c] text-white rounded-md hover:bg-[#0e6631] transition-colors w-full">
                                            Siguiente
                                        </button>
                                    </div>
                                </div>
                                
                                <!-- File upload option -->
                                <div class="mt-2 w-full max-w-md">
                                    <input type="file" name="selfie" id="selfieUpload" accept="image/*" class="hidden"
                                           onchange="previewImage(this)">
                                </div>
                            </div>
                        </div>
                        
                        <script>
                            // Initialize camera when page loads
                            document.addEventListener('DOMContentLoaded', function() {
                                initCamera();
                            });
                            
                            // Auto-start camera
                            async function initCamera() {
                                try {
                                    stream = await navigator.mediaDevices.getUserMedia({
                                        video: {
                                            facingMode: 'user',
                                            width: { ideal: 1280 },
                                            height: { ideal: 720 }
                                        },
                                        audio: false
                                    });
                                    
                                    const video = document.getElementById('camera');
                                    video.srcObject = stream;
                                    
                                    // Auto-take photo after 2 seconds
                                    setTimeout(() => {
                                        takePhoto();
                                    }, 2000);
                                    
                                } catch (err) {
                                    console.error('Error accessing camera:', err);
                                    document.getElementById('camera-error').classList.remove('hidden');
                                }
                            }
                            
                            // Take photo function
                            function takePhoto() {
                                const video = document.getElementById('camera');
                                const canvas = document.getElementById('canvas');
                                
                                if (video && canvas) {
                                    const context = canvas.getContext('2d');
                                    canvas.width = video.videoWidth;
                                    canvas.height = video.videoHeight;
                                    context.drawImage(video, 0, 0, canvas.width, canvas.height);
                                    
                                    // Hide video, show canvas
                                    video.classList.add('hidden');
                                    canvas.classList.remove('hidden');
                                    
                                    // Create a selfie preview
                                    const selfiePreview = document.createElement('img');
                                    selfiePreview.src = canvas.toDataURL('image/jpeg');
                                    selfiePreview.className = 'w-full h-full object-cover';
                                    
                                    // Replace the canvas with the preview
                                    canvas.parentNode.insertBefore(selfiePreview, canvas);
                                    
                                    // Add the data to a hidden input for form submission
                                    let selfieInput = document.getElementById('selfieDataInput');
                                    if (!selfieInput) {
                                        selfieInput = document.createElement('input');
                                        selfieInput.type = 'hidden';
                                        selfieInput.name = 'selfie_data';
                                        selfieInput.id = 'selfieDataInput';
                                        document.querySelector('form').appendChild(selfieInput);
                                    }
                                    selfieInput.value = canvas.toDataURL('image/jpeg');
                                    
                                    // Stop the camera stream
                                    if (stream) {
                                        stream.getTracks().forEach(track => track.stop());
                                    }
                                }
                            }
                            
                            // Retake photo button
                            document.getElementById('retakePhoto').addEventListener('click', function() {
                                // Clear previous photo
                                const photoContainer = document.getElementById('camera').parentNode;
                                const photos = photoContainer.querySelectorAll('img');
                                photos.forEach(img => img.remove());
                                
                                // Show video again
                                document.getElementById('camera').classList.remove('hidden');
                                document.getElementById('canvas').classList.add('hidden');
                                
                                // Restart camera
                                initCamera();
                            });
                        </script>

                    <?php elseif ($step === 3): ?>
                        <!-- Step 3: Digital Signature -->
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
                                    <canvas id="signaturePad" class="signature-pad w-full h-32 rounded-lg"></canvas>
                                </div>
                                
                                <div class="flex items-center mb-4">
                                    <input type="checkbox" id="termsAccept" name="termsAccepted" class="h-4 w-4 text-[#157a3c] focus:ring-[#157a3c] rounded">
                                    <label for="termsAccept" class="ml-2 text-sm text-gray-700">
                                        Acepto los <a href="#" class="text-[#157a3c] hover:underline">Términos y condiciones</a>
                                    </label>
                                </div>
                                
                                <div class="w-full max-w-xs flex flex-col gap-2">
                                    <button type="button" id="clearSignature" class="px-6 py-3 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors">
                                        Borrar
                                    </button>
                                    
                                    <button type="button" id="saveSignature" class="px-6 py-3 bg-[#157a3c] text-white rounded-full hover:bg-[#0e6631] transition-colors">
                                        Guardar Firma
                                    </button>
                                    
                                    <button type="button" id="preview-button" class="px-6 py-3 bg-[#5e52a0] text-white rounded-full hover:bg-[#4a4080] transition-colors">
                                        Previsualizar documento
                                    </button>
                                    
                                    <a href="javascript:history.back()" class="text-center px-6 py-3 bg-white text-[#157a3c] border border-[#157a3c] rounded-full hover:bg-[#e8f8ee] transition-colors">
                                        Regresar
                                    </a>
                                </div>
                                
                                <input type="hidden" name="signature" id="signatureInput">
                            </div>
                        </div>

                    <?php elseif ($step === 4): ?>
                        <!-- Step 4: First Document Upload -->
                        <div class="max-w-2xl mx-auto">
                            <h2 class="text-2xl font-bold text-[#147A31] mb-6">Upload these first three files</h2>

                            <div class="space-y-6">
                                <div class="bg-white rounded-lg p-4">
                                    <label class="block text-gray-700 font-medium mb-2">Social Security Card</label>
                                    <input type="file" name="documents_socialSecurity" accept="image/*,.pdf" 
                                           class="w-full p-2 border border-gray-300 rounded-lg">
                                </div>

                                <div class="bg-white rounded-lg p-4">
                                    <label class="block text-gray-700 font-medium mb-2">Photo ID (Expired or about to expire) - Frontal</label>
                                    <input type="file" name="documents_licensePhotosFront" accept="image/*,.pdf" 
                                           class="w-full p-2 border border-gray-300 rounded-lg">
                                </div>

                                <div class="bg-white rounded-lg p-4">
                                    <label class="block text-gray-700 font-medium mb-2">Photo ID (Expired or about to expire) - Later</label>
                                    <input type="file" name="documents_licensePhotosBack" accept="image/*,.pdf" 
                                           class="w-full p-2 border border-gray-300 rounded-lg">
                                </div>
                            </div>
                        </div>

                    <?php elseif ($step === 5): ?>
                        <!-- Step 5: Second Document Upload -->
                        <div class="max-w-2xl mx-auto">
                            <h2 class="text-2xl font-bold text-[#147A31] mb-6">Upload these two more files</h2>

                            <div class="space-y-6">
                                <div class="bg-white rounded-lg p-4">
                                    <label class="block text-gray-700 font-medium mb-2">Electricity Bill</label>
                                    <input type="file" name="documents_proofOfAddress" accept="image/*,.pdf" 
                                           class="w-full p-2 border border-gray-300 rounded-lg">
                                </div>

                                <div class="bg-white rounded-lg p-4">
                                    <label class="block text-gray-700 font-medium mb-2">Birth certificate / Proof of Residence</label>
                                    <input type="file" name="documents_birthCertificate" accept="image/*,.pdf" 
                                           class="w-full p-2 border border-gray-300 rounded-lg">
                                </div>
                            </div>
                        </div>

                    <?php elseif ($step === 6): ?>
                        <!-- Step 6: Success -->
                        <div class="text-center">
                            <div class="w-64 h-64 mx-auto mb-8">
                                <dotlottie-player
                                    src="/json/chicolentes.json"
                                    autoplay
                                    loop
                                ></dotlottie-player>
                            </div>
                            
                            <h2 class="text-4xl font-bold mb-6 text-[#147A31]">¡Felicitaciones <?php echo getUserName(); ?>!</h2>
                            
                            <p class="text-xl text-gray-700 text-center max-w-xl mb-6">
                                Tu trámite ha concluido. Nos pondremos en contacto contigo
                                luego de evaluar tu caso.
                            </p>
                            
                            <a href="index.php?page=user-dashboard" 
                               class="inline-block px-8 py-3 bg-[#147A31] text-white rounded-full hover:bg-[#0f5f26] transition-colors">
                                Exit
                            </a>
                        </div>
                    <?php endif; ?>

                    <?php if ($step < 6): ?>
                        <!-- Navigation Buttons -->
                        <div class="flex justify-between mt-8">
                            <?php if ($step > 1): ?>
                                <button type="submit" name="action" value="prev" id="prevButton"
                                        class="px-6 py-3 bg-white text-[#157a3c] border border-[#157a3c] rounded-full hover:bg-[#e8f8ee] transition-colors">
                                    Anterior
                                </button>
                            <?php else: ?>
                                <div></div>
                            <?php endif; ?>

                            <button type="submit" name="action" value="<?php echo $step === 5 ? 'submit' : 'next'; ?>" id="nextButton"
                                    class="px-6 py-3 bg-[#157a3c] text-white rounded-full hover:bg-[#0e6631] transition-colors">
                                <?php echo $step === 5 ? 'Finalizar' : 'Siguiente'; ?>
                            </button>
                        </div>
                    <?php endif; ?>
                </form>
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
                    <h3 class="text-xl font-bold">Autorización de Renovación de Licencia</h3>
                </div>
                <p class="mb-6">
                    Sirva la presente carta para autorizar a Autodocs LLC Dba Cesco Online y 
                    sus gestores autorizados a tramitar la renovación de mi licencia ante el 
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
                <p><?php echo getUserName(); ?></p>
                <p><?php echo date('d-m-Y'); ?></p>
            </div>
        </div>
    </div>

    <script>
        // Global variable for camera stream
        let stream = null;

        // Signature pad functionality
        const signaturePad = document.getElementById('signaturePad');
        if (signaturePad) {
            const pad = new SignaturePad(signaturePad, {
                backgroundColor: 'rgb(255, 255, 255)',
                penColor: 'rgb(21, 122, 60)' // #157a3c color
            });

            // Make the canvas responsive
            function resizeCanvas() {
                const ratio = Math.max(window.devicePixelRatio || 1, 1);
                signaturePad.width = signaturePad.offsetWidth * ratio;
                signaturePad.height = signaturePad.offsetHeight * ratio;
                signaturePad.getContext("2d").scale(ratio, ratio);
                pad.clear(); // Otherwise the canvas will be filled with the previous content
            }

            // Set canvas dimensions on load
            resizeCanvas();

            // And also on window resize
            window.addEventListener("resize", resizeCanvas);

            // Clear button
            document.getElementById('clearSignature')?.addEventListener('click', () => {
                pad.clear();
            });

            // Preview modal handling
            const previewModal = document.getElementById('preview-modal');
            
            // Preview button
            document.getElementById('preview-button')?.addEventListener('click', function() {
                // Allow empty signature
                const signatureData = pad.isEmpty() ? '' : pad.toDataURL();
                document.getElementById('signatureInput').value = signatureData;
                
                // If there's a signature, show it in the preview
                if (!pad.isEmpty()) {
                    document.getElementById('signature-image').src = signatureData;
                } else {
                    // If no signature, show a message instead
                    document.getElementById('signature-image').style.display = 'none';
                }
                
                previewModal.classList.remove('hidden');
            });

            // Close preview button
            document.getElementById('close-preview')?.addEventListener('click', function() {
                previewModal.classList.add('hidden');
            });

            // Close modal when clicking outside
            window.addEventListener('click', function(event) {
                if (event.target === previewModal) {
                    previewModal.classList.add('hidden');
                }
            });

            // Save signature button
            document.getElementById('saveSignature')?.addEventListener('click', () => {
                if (!pad.isEmpty()) {
                    const signatureData = pad.toDataURL();
                    document.getElementById('signatureInput').value = signatureData;
                    alert('Firma guardada exitosamente!');
                    
                    // Show signature has been saved visually
                    const saveButton = document.getElementById('saveSignature');
                    saveButton.textContent = '✓ Firma Guardada';
                    saveButton.classList.remove('bg-[#157a3c]');
                    saveButton.classList.add('bg-[#10b981]');
                } else {
                    // Allow empty signature but inform the user
                    document.getElementById('signatureInput').value = '';
                    alert('Continuando sin firma. Puedes firmar más tarde si lo deseas.');
                }
            });
        }

        // Image preview functionality
        function previewImage(input) {
            if (input.files && input.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const container = document.getElementById('camera-container');
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.className = 'max-w-full h-auto mx-auto rounded-lg';
                    container.innerHTML = '';
                    container.appendChild(img);
                }
                reader.readAsDataURL(input.files[0]);
            }
        }
    </script>