<?php
session_start();

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
            
            // Go to success step
            $step = 6;
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

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>License Renewal - Upload Documents</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.js"></script>
    <!-- Include Signature Pad library -->
    <script src="https://cdn.jsdelivr.net/npm/signature_pad@4.0.0/dist/signature_pad.umd.min.js"></script>
</head>
<body class="font-poppins">
    <div class="min-h-screen flex flex-col bg-[#f7fdf9]">
        <?php include_once '../components/header_procedure.php'; ?>
        
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
                        <div class="max-w-2xl mx-auto">
                            <h2 class="text-2xl font-bold text-[#147A31] mb-2">Let's take selfie first!</h2>
                            <p class="text-gray-600 mb-6">Smile and take a selfie.</p>

                            <div class="bg-white rounded-lg p-4">
                                <p class="text-gray-600 mb-4">
                                    Note: Make sure your face is well lit and the image is clear. (Photograph must be taken against a white background.)
                                </p>

                                <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                                    <div id="camera-container" class="mb-4">
                                        <video id="camera" class="w-full h-auto rounded-lg border border-gray-200 bg-black hidden" autoplay playsinline></video>
                                        <canvas id="canvas" class="hidden"></canvas>
                                        <?php if ($formData['selfie']): ?>
                                            <img src="../uploads/<?php echo $formData['selfie']; ?>" alt="Selfie preview" class="max-w-full h-auto mx-auto rounded-lg">
                                        <?php endif; ?>
                                    </div>

                                    <div class="flex flex-col sm:flex-row justify-center gap-3">
                                        <button type="button" id="startCamera" 
                                                class="px-6 py-2 bg-[#147A31] text-white rounded-full hover:bg-[#0f5f26] transition-colors">
                                            Start Camera
                                        </button>
                                        <button type="button" id="takePhoto" 
                                                class="px-6 py-2 bg-[#147A31] text-white rounded-full hover:bg-[#0f5f26] transition-colors hidden">
                                            Take Photo
                                        </button>
                                        <input type="file" name="selfie" id="selfieUpload" accept="image/*" class="hidden"
                                               onchange="previewImage(this)">
                                        <label for="selfieUpload" 
                                               class="px-6 py-2 bg-white text-[#147A31] border border-[#147A31] rounded-full hover:bg-[#e8f8ee] transition-colors cursor-pointer text-center">
                                            Upload from device
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                    <?php elseif ($step === 3): ?>
                        <!-- Step 3: Digital Signature -->
                        <div class="max-w-2xl mx-auto">
                            <h2 class="text-2xl font-bold text-[#147A31] mb-2">Now we need your digital signature</h2>
                            <p class="text-gray-600 mb-6">Simply sign in the box using your finger or mouse</p>

                            <div class="bg-white rounded-lg p-4">
                                <div class="border-2 border-gray-300 rounded-lg p-4">
                                    <div class="relative">
                                        <canvas id="signaturePad" class="w-full h-40 border rounded bg-white"></canvas>
                                        <input type="hidden" name="signature" id="signatureInput">
                                    </div>

                                    <div class="flex items-center mt-4">
                                        <input type="checkbox" id="termsAccept" name="termsAccepted" class="h-4 w-4 text-[#147A31] border-gray-300 rounded">
                                        <label for="termsAccept" class="ml-2 text-sm text-gray-600">
                                            I accept the Terms and Conditions
                                        </label>
                                    </div>

                                    <div class="flex gap-4 mt-6 flex-wrap">
                                        <button type="button" id="clearSignature"
                                                class="px-6 py-2 bg-white text-[#147A31] border border-[#147A31] rounded-full hover:bg-[#e8f8ee] transition-colors">
                                            Clear
                                        </button>
                                        <button type="button" id="saveSignature"
                                                class="px-6 py-2 bg-[#147A31] text-white rounded-full hover:bg-[#0f5f26] transition-colors">
                                            Save Signature
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    <?php elseif ($step === 4): ?>
                        <!-- Step 4: First Document Upload -->
                        <div class="max-w-2xl mx-auto">
                            <h2 class="text-2xl font-bold text-[#147A31] mb-6">Upload these first three files</h2>

                            <div class="space-y-6">
                                <div class="bg-white rounded-lg p-4">
                                    <label class="block text-gray-700 font-medium mb-2">Social Security Card *</label>
                                    <input type="file" name="documents_socialSecurity" accept="image/*,.pdf" 
                                           class="w-full p-2 border border-gray-300 rounded-lg" required>
                                </div>

                                <div class="bg-white rounded-lg p-4">
                                    <label class="block text-gray-700 font-medium mb-2">Photo ID (Expired or about to expire) - Frontal *</label>
                                    <input type="file" name="documents_licensePhotosFront" accept="image/*,.pdf" 
                                           class="w-full p-2 border border-gray-300 rounded-lg" required>
                                </div>

                                <div class="bg-white rounded-lg p-4">
                                    <label class="block text-gray-700 font-medium mb-2">Photo ID (Expired or about to expire) - Later *</label>
                                    <input type="file" name="documents_licensePhotosBack" accept="image/*,.pdf" 
                                           class="w-full p-2 border border-gray-300 rounded-lg" required>
                                </div>
                            </div>
                        </div>

                    <?php elseif ($step === 5): ?>
                        <!-- Step 5: Second Document Upload -->
                        <div class="max-w-2xl mx-auto">
                            <h2 class="text-2xl font-bold text-[#147A31] mb-6">Upload these two more files</h2>

                            <div class="space-y-6">
                                <div class="bg-white rounded-lg p-4">
                                    <label class="block text-gray-700 font-medium mb-2">Electricity Bill *</label>
                                    <input type="file" name="documents_proofOfAddress" accept="image/*,.pdf" 
                                           class="w-full p-2 border border-gray-300 rounded-lg" required>
                                </div>

                                <div class="bg-white rounded-lg p-4">
                                    <label class="block text-gray-700 font-medium mb-2">Birth certificate / Proof of Residence *</label>
                                    <input type="file" name="documents_birthCertificate" accept="image/*,.pdf" 
                                           class="w-full p-2 border border-gray-300 rounded-lg" required>
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
                            
                            <a href="/dashboard" 
                               class="inline-block px-8 py-3 bg-[#147A31] text-white rounded-full hover:bg-[#0f5f26] transition-colors">
                                Exit
                            </a>
                        </div>
                    <?php endif; ?>

                    <?php if ($step < 6): ?>
                        <!-- Navigation Buttons -->
                        <div class="flex justify-between mt-8">
                            <?php if ($step > 1): ?>
                                <button type="submit" name="action" value="prev"
                                        class="px-6 py-2 bg-white text-[#147A31] border border-[#147A31] rounded-full hover:bg-[#e8f8ee] transition-colors">
                                    Previous
                                </button>
                            <?php else: ?>
                                <div></div>
                            <?php endif; ?>

                            <button type="submit" name="action" value="<?php echo $step === 5 ? 'submit' : 'next'; ?>"
                                    class="px-6 py-2 bg-[#147A31] text-white rounded-full hover:bg-[#0f5f26] transition-colors">
                                <?php echo $step === 5 ? 'Finish' : 'Next'; ?>
                            </button>
                        </div>
                    <?php endif; ?>
                </form>
            </div>
        </main>
    </div>

    <script>
        // Camera functionality
        let stream = null;
        const startCamera = document.getElementById('startCamera');
        const takePhoto = document.getElementById('takePhoto');
        const video = document.getElementById('camera');
        const canvas = document.getElementById('canvas');

        if (startCamera && takePhoto && video && canvas) {
            startCamera.addEventListener('click', async () => {
                try {
                    stream = await navigator.mediaDevices.getUserMedia({ video: true });
                    video.srcObject = stream;
                    video.classList.remove('hidden');
                    startCamera.classList.add('hidden');
                    takePhoto.classList.remove('hidden');
                } catch (err) {
                    console.error('Error accessing camera:', err);
                    alert('Could not access camera. Please ensure you have granted camera permissions.');
                }
            });

            takePhoto.addEventListener('click', () => {
                const context = canvas.getContext('2d');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                
                canvas.toBlob(blob => {
                    const formData = new FormData();
                    formData.append('selfie', blob, 'selfie.jpg');
                    
                    // Submit the form with the captured photo
                    document.querySelector('form').submit();
                }, 'image/jpeg');
                
                if (stream) {
                    stream.getTracks().forEach(track => track.stop());
                }
            });
        }

        // Signature pad functionality
        const signaturePad = document.getElementById('signaturePad');
        if (signaturePad) {
            const pad = new SignaturePad(signaturePad, {
                backgroundColor: 'rgb(255, 255, 255)'
            });

            document.getElementById('clearSignature')?.addEventListener('click', () => {
                pad.clear();
            });

            document.getElementById('saveSignature')?.addEventListener('click', () => {
                if (!pad.isEmpty()) {
                    const signatureData = pad.toDataURL();
                    document.getElementById('signatureInput').value = signatureData;
                    alert('Signature saved successfully!');
                } else {
                    alert('Please provide a signature before saving.');
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
</body>
</html> 