<?php
// Don't start a new session as it's already started in header.php
// session_start();

// Initialize form data with default values - no session storage yet
$formData = [
    // Step 1: License Type
    'tipoLicencia' => 'Licencia de Conducir',
    'categoria' => 'Conductor',
    
    // Step 2: License Origin
    'licenciaProcedente' => 'Puerto Rico',
    'estadoProcedente' => 'Añasco',
    'numeroLicencia' => '',
    'fechaExpiracion' => '',
    
    // Step 3: Identification
    'tipoId' => 'Seguro Social',
    'numeroId' => '',
    'estatusPresencia' => 'Residente Permanente',
    
    // Step 4: Personal Information
    'genero' => 'Masculino',
    'donante' => 'Si',
    'tipoSangre' => 'O+',
    
    // Step 5: Physical Description
    'estaturaPies' => '5',
    'estaturaPulgadas' => '8',
    'peso' => '',
    'tez' => 'Blanca',
    'colorPelo' => 'Negro',
    'colorOjos' => 'Marrón',
    
    // Step 6: Parents Information
    'nombrePadre' => '',
    'nombreMadre' => '',
    
    // Step 7: Residential Address
    'urbanizacion' => '',
    'calle' => '',
    'pueblo' => 'Adjuntas',
    'codigoPostal' => '',
    
    // Step 8: Postal Address
    'mismaResidencial' => 'Si',
    'apartado' => '',
    'pais' => 'Puerto Rico',
    'puebloPostal' => 'Cataño',
    'codigoPostalPostal' => '',
    
    // Step 9: Progress Page (no data)
    
    // Step 10: License Suspension
    'licenciaSuspendida' => 'No',
    'motivoSuspension' => 'Incapacidad',
    'numeroLicenciaPR' => '',
    
    // Step 11: Mental Health & DUI
    'trastornoMental' => 'No',
    'embriagantes' => 'No',
    'fechaEmbriagantes' => '',
    
    // Step 12: Narcotics Conviction
    'narcoticos' => 'No',
    'fechaNarcoticos' => '',
    
    // Step 13: Financial Obligations
    'obligacionAlimentaria' => 'No',
    'deudaACAA' => 'No'
];

// Set default step to 1 (no session storage yet)
$step = isset($_GET['step']) ? (int)$_GET['step'] : 1;

// Ensure step is between 1 and 13
if ($step < 1 || $step > 13) {
    $step = 1;
}

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

// Set the title for the header
$title = "Licencia de Reciprocidad";
include_once 'components/header_procedure.php';
?>
<!DOCTYPE html>
<html lang="es" class="font-poppins">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Licencia de Reciprocidad - Tu Licencia</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.js"></script>
</head>
<body class="font-poppins">
<div class="min-h-screen flex flex-col bg-gradient-to-b from-[#f7fdf9] to-white">
    <main class="flex-grow py-8">
        <div class="max-w-6xl mx-auto px-4">
            <div class="bg-[#e8f8ee] rounded-3xl p-6 md:p-10 shadow-sm">
                <form action="index.php?page=licencia-reciprocidad<?php echo $step < 13 ? '&step='.($step + 1) : '-confirmacion'; ?>" method="GET">
                    <input type="hidden" name="page" value="<?php echo $step < 13 ? 'licencia-reciprocidad' : 'licencia-reciprocidad-confirmacion'; ?>">
                    <?php if ($step < 13): ?>
                    <input type="hidden" name="step" value="<?php echo $step + 1; ?>">
                    <?php endif; ?>
                    
                    <?php if ($step === 9): ?>
                    <!-- Special full-width layout for step 9 with gray background -->
                    <div class="bg-gray-100 rounded-xl p-10 text-center">
                        <div class="mb-6 w-64 h-64 mx-auto">
                            <dotlottie-player
                                src="/json/chicolaptop.json"
                                autoplay
                                loop
                            ></dotlottie-player>
                        </div>
                        
                        <h2 class="text-4xl font-bold mt-8 text-[#157a3c]">¡Ya casi termina!</h2>
                        <p class="text-xl mt-2 text-gray-700">Solo 4 pasos más y listo.</p>
                        
                        <!-- Special buttons for this step -->
                        <div class="mt-8 max-w-xs mx-auto">
                            <button type="submit" class="w-full mb-4 px-6 py-3 bg-[#157a3c] text-white rounded-full hover:bg-[#0e6631] transition-colors font-medium">
                                Siguiente
                            </button>
                            
                            <a href="index.php?page=licencia-reciprocidad&step=<?php echo $step - 1; ?>" class="block w-full px-6 py-3 bg-white border border-[#157a3c] text-[#157a3c] rounded-full hover:bg-[#e8f8ee] transition-colors text-center">
                                Regresar
                            </a>
                        </div>
                    </div>
                    <?php else: ?>
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
                            
                            <?php if ($step === 1): ?>
                                <h2 class="text-4xl font-bold mt-6 text-[#157a3c] text-center">¡Hola!</h2>
                                <p class="text-lg text-center mt-2">Comencemos su trámite 😊</p>
                            <?php elseif ($step === 2): ?>
                                <h2 class="text-4xl font-bold mt-6 text-[#157a3c] text-center">Ingrese los datos</h2>
                                <p class="text-lg text-center mt-2">de su licencia actual.</p>
                            <?php elseif ($step === 3): ?>
                                <h2 class="text-4xl font-bold mt-6 text-[#157a3c] text-center">¡Gracias!</h2>
                                <p class="text-lg text-center mt-2">Ahora, ingrese su SSN o Pasaporte.</p>
                            <?php elseif ($step === 4): ?>
                                <h2 class="text-4xl font-bold mt-6 text-[#157a3c] text-center">Seguimos</h2>
                                <p class="text-lg text-center mt-2">con algunos datos personales, pero necesarios.</p>
                            <?php elseif ($step === 5): ?>
                                <h2 class="text-4xl font-bold mt-6 text-[#157a3c] text-center">Esta parte se llama:</h2>
                                <p class="text-lg text-center mt-2">Descríbase a sí mismo 😊</p>
                            <?php elseif ($step === 6): ?>
                                <h2 class="text-4xl font-bold mt-6 text-[#157a3c] text-center">Ingrese los datos</h2>
                                <p class="text-lg text-center mt-2">de sus padres.</p>
                            <?php elseif ($step === 7): ?>
                                <h2 class="text-4xl font-bold mt-6 text-[#157a3c] text-center">¡Listo!</h2>
                                <p class="text-lg text-center mt-2">Procedamos a registrar su dirección residencial.</p>
                            <?php elseif ($step === 8): ?>
                                <h2 class="text-4xl font-bold mt-6 text-[#157a3c] text-center">¡Listo!</h2>
                                <p class="text-lg text-center mt-2">Procedamos a registrar su dirección postal.</p>
                            <?php elseif ($step === 10): ?>
                                <h2 class="text-4xl font-bold mt-6 text-[#157a3c] text-center">Conteste</h2>
                                <p class="text-lg text-center mt-2">cuidadosamente lo siguiente.</p>
                            <?php elseif ($step === 11): ?>
                                <h2 class="text-4xl font-bold mt-6 text-[#157a3c] text-center">Sobre su salud</h2>
                                <p class="text-lg text-center mt-2">y antecedentes de conducción.</p>
                            <?php elseif ($step === 12): ?>
                                <h2 class="text-4xl font-bold mt-6 text-[#157a3c] text-center">Antecedentes</h2>
                                <p class="text-lg text-center mt-2">legales.</p>
                            <?php elseif ($step === 13): ?>
                                <h2 class="text-4xl font-bold mt-6 text-[#157a3c] text-center">Obligaciones</h2>
                                <p class="text-lg text-center mt-2">financieras.</p>
                            <?php endif; ?>
                        </div>

                        <!-- Right Content -->
                        <div>
                            <?php if ($step === 1): ?>
                                <!-- Step 1: License Type -->
                                <div class="space-y-4">
                                    <div class="mb-4">
                                        <label class="block text-gray-700 font-medium mb-2">¿Qué tipo de licencia necesitas?</label>
                                        <div class="space-y-2">
                                            <label class="inline-flex items-center">
                                                <input type="radio" name="tipoLicencia" value="Licencia de Conducir" <?php echo $formData['tipoLicencia'] === 'Licencia de Conducir' ? 'checked' : ''; ?> class="form-radio text-[#157a3c]">
                                                <span class="ml-2">Licencia de Conducir</span>
                                            </label>
                                            <div class="block">
                                                <label class="inline-flex items-center">
                                                    <input type="radio" name="tipoLicencia" value="Licencia de Conducir Real ID" <?php echo $formData['tipoLicencia'] === 'Licencia de Conducir Real ID' ? 'checked' : ''; ?> class="form-radio text-[#157a3c]">
                                                    <span class="ml-2">Licencia de Conducir Real ID</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="mb-4">
                                        <label class="block text-gray-700 font-medium mb-2">¿A qué categoría pertenece?</label>
                                        <div class="flex gap-4 mb-2">
                                            <label class="inline-flex items-center">
                                                <input type="radio" name="categoria" value="Conductor" <?php echo $formData['categoria'] === 'Conductor' ? 'checked' : ''; ?> class="form-radio text-[#157a3c]">
                                                <span class="ml-2">Conductor</span>
                                            </label>
                                            <label class="inline-flex items-center">
                                                <input type="radio" name="categoria" value="Chofer" <?php echo $formData['categoria'] === 'Chofer' ? 'checked' : ''; ?> class="form-radio text-[#157a3c]">
                                                <span class="ml-2">Chofer</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                            <?php elseif ($step === 2): ?>
                                <!-- Step 2: License Origin -->
                                <div class="space-y-4">
                                    <div class="mb-4">
                                        <label class="block text-gray-700 font-medium mb-2">Licencia procedente de</label>
                                        <div class="grid grid-cols-2 gap-4">
                                            <div>
                                                <select name="licenciaProcedente" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                                    <option value="Puerto Rico" <?php echo $formData['licenciaProcedente'] === 'Puerto Rico' ? 'selected' : ''; ?>>Puerto Rico</option>
                                                    <option value="Estados Unidos" <?php echo $formData['licenciaProcedente'] === 'Estados Unidos' ? 'selected' : ''; ?>>Estados Unidos</option>
                                                    <option value="España" <?php echo $formData['licenciaProcedente'] === 'España' ? 'selected' : ''; ?>>España</option>
                                                </select>
                                            </div>
                                            <div>
                                                <select name="estadoProcedente" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                                    <option value="Añasco" <?php echo $formData['estadoProcedente'] === 'Añasco' ? 'selected' : ''; ?>>Añasco</option>
                                                    <option value="Arecibo" <?php echo $formData['estadoProcedente'] === 'Arecibo' ? 'selected' : ''; ?>>Arecibo</option>
                                                    <option value="Bayamón" <?php echo $formData['estadoProcedente'] === 'Bayamón' ? 'selected' : ''; ?>>Bayamón</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="mb-4">
                                        <label for="numeroLicencia" class="block text-gray-700 font-medium mb-2">Número de licencia:</label>
                                        <input type="text" id="numeroLicencia" name="numeroLicencia" value="<?php echo htmlspecialchars($formData['numeroLicencia']); ?>" 
                                               placeholder="6161614" 
                                               class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                    </div>
                                    
                                    <div class="mb-4">
                                        <label for="fechaExpiracion" class="block text-gray-700 font-medium mb-2">Fecha de expiración</label>
                                        <input type="date" id="fechaExpiracion" name="fechaExpiracion" value="<?php echo htmlspecialchars($formData['fechaExpiracion']); ?>" 
                                               class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                    </div>
                                </div>

                            <?php elseif ($step === 3): ?>
                                <!-- Step 3: Identification -->
                                <div class="space-y-4">
                                    <div class="mb-4">
                                        <label class="block text-gray-700 font-medium mb-2">Identificación</label>
                                        <div class="flex gap-4 mb-2">
                                            <label class="inline-flex items-center">
                                                <input type="radio" name="tipoId" value="Seguro Social" <?php echo $formData['tipoId'] === 'Seguro Social' ? 'checked' : ''; ?> class="form-radio text-[#157a3c]">
                                                <span class="ml-2">Seguro Social</span>
                                            </label>
                                            <label class="inline-flex items-center">
                                                <input type="radio" name="tipoId" value="Pasaporte" <?php echo $formData['tipoId'] === 'Pasaporte' ? 'checked' : ''; ?> class="form-radio text-[#157a3c]">
                                                <span class="ml-2">Pasaporte</span>
                                            </label>
                                        </div>
                                    </div>
                                    
                                    <div class="mb-4">
                                        <label for="numeroId" class="block text-gray-700 font-medium mb-2">Últimos 4 dígitos/ Núm de pasaporte:</label>
                                        <input type="text" id="numeroId" name="numeroId" value="<?php echo htmlspecialchars($formData['numeroId']); ?>" 
                                               placeholder="242343243" 
                                               class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                    </div>
                                    
                                    <div class="mb-4">
                                        <label for="estatusPresencia" class="block text-gray-700 font-medium mb-2">Indique el estatus de su presencia legal en Puerto Rico</label>
                                        <select id="estatusPresencia" name="estatusPresencia" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                            <option value="Residente Permanente" <?php echo $formData['estatusPresencia'] === 'Residente Permanente' ? 'selected' : ''; ?>>Residente Permanente</option>
                                            <option value="Ciudadano" <?php echo $formData['estatusPresencia'] === 'Ciudadano' ? 'selected' : ''; ?>>Ciudadano</option>
                                            <option value="Visa de Turista" <?php echo $formData['estatusPresencia'] === 'Visa de Turista' ? 'selected' : ''; ?>>Visa de Turista</option>
                                        </select>
                                        <p class="text-sm text-gray-500 mt-1">(Requerido por CESCO)</p>
                                    </div>
                                </div>

                            <?php elseif ($step === 4): ?>
                                <!-- Step 4: Personal Information -->
                                <div class="space-y-4">
                                    <div class="mb-4">
                                        <label class="block text-gray-700 font-medium mb-2">Género</label>
                                        <div class="flex gap-4 mb-2">
                                            <label class="inline-flex items-center">
                                                <input type="radio" name="genero" value="Masculino" <?php echo $formData['genero'] === 'Masculino' ? 'checked' : ''; ?> class="form-radio text-[#157a3c]">
                                                <span class="ml-2">Masculino</span>
                                            </label>
                                            <label class="inline-flex items-center">
                                                <input type="radio" name="genero" value="Femenino" <?php echo $formData['genero'] === 'Femenino' ? 'checked' : ''; ?> class="form-radio text-[#157a3c]">
                                                <span class="ml-2">Femenino</span>
                                            </label>
                                        </div>
                                    </div>
                                    
                                    <div class="mb-4">
                                        <label class="block text-gray-700 font-medium mb-2">¿Deseo ser Donante de Órganos?</label>
                                        <div class="flex gap-4 mb-2">
                                            <label class="inline-flex items-center">
                                                <input type="radio" name="donante" value="Si" <?php echo $formData['donante'] === 'Si' ? 'checked' : ''; ?> class="form-radio text-[#157a3c]">
                                                <span class="ml-2">Si</span>
                                            </label>
                                            <label class="inline-flex items-center">
                                                <input type="radio" name="donante" value="No" <?php echo $formData['donante'] === 'No' ? 'checked' : ''; ?> class="form-radio text-[#157a3c]">
                                                <span class="ml-2">No</span>
                                            </label>
                                        </div>
                                    </div>
                                    
                                    <div class="mb-4">
                                        <label for="tipoSangre" class="block text-gray-700 font-medium mb-2">Tipo de sangre:</label>
                                        <select id="tipoSangre" name="tipoSangre" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                            <option value="O+" <?php echo $formData['tipoSangre'] === 'O+' ? 'selected' : ''; ?>>O+</option>
                                            <option value="O-" <?php echo $formData['tipoSangre'] === 'O-' ? 'selected' : ''; ?>>O-</option>
                                            <option value="A+" <?php echo $formData['tipoSangre'] === 'A+' ? 'selected' : ''; ?>>A+</option>
                                            <option value="A-" <?php echo $formData['tipoSangre'] === 'A-' ? 'selected' : ''; ?>>A-</option>
                                            <option value="B+" <?php echo $formData['tipoSangre'] === 'B+' ? 'selected' : ''; ?>>B+</option>
                                            <option value="B-" <?php echo $formData['tipoSangre'] === 'B-' ? 'selected' : ''; ?>>B-</option>
                                            <option value="AB+" <?php echo $formData['tipoSangre'] === 'AB+' ? 'selected' : ''; ?>>AB+</option>
                                            <option value="AB-" <?php echo $formData['tipoSangre'] === 'AB-' ? 'selected' : ''; ?>>AB-</option>
                                        </select>
                                    </div>
                                </div>

                            <?php elseif ($step === 5): ?>
                                <!-- Step 5: Physical Description -->
                                <div class="space-y-4">
                                    <div class="grid grid-cols-2 gap-4">
                                        <div class="mb-4">
                                            <label for="estaturaPies" class="block text-gray-700 font-medium mb-2">Estatura (Pies)</label>
                                            <select id="estaturaPies" name="estaturaPies" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                                <option value="4" <?php echo $formData['estaturaPies'] === '4' ? 'selected' : ''; ?>>4</option>
                                                <option value="5" <?php echo $formData['estaturaPies'] === '5' ? 'selected' : ''; ?>>5</option>
                                                <option value="6" <?php echo $formData['estaturaPies'] === '6' ? 'selected' : ''; ?>>6</option>
                                            </select>
                                        </div>
                                        
                                        <div class="mb-4">
                                            <label for="estaturaPulgadas" class="block text-gray-700 font-medium mb-2">Estatura (Pulgadas)</label>
                                            <select id="estaturaPulgadas" name="estaturaPulgadas" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                                <option value="0" <?php echo $formData['estaturaPulgadas'] === '0' ? 'selected' : ''; ?>>0</option>
                                                <option value="1" <?php echo $formData['estaturaPulgadas'] === '1' ? 'selected' : ''; ?>>1</option>
                                                <option value="2" <?php echo $formData['estaturaPulgadas'] === '2' ? 'selected' : ''; ?>>2</option>
                                                <option value="3" <?php echo $formData['estaturaPulgadas'] === '3' ? 'selected' : ''; ?>>3</option>
                                                <option value="4" <?php echo $formData['estaturaPulgadas'] === '4' ? 'selected' : ''; ?>>4</option>
                                                <option value="5" <?php echo $formData['estaturaPulgadas'] === '5' ? 'selected' : ''; ?>>5</option>
                                                <option value="6" <?php echo $formData['estaturaPulgadas'] === '6' ? 'selected' : ''; ?>>6</option>
                                                <option value="7" <?php echo $formData['estaturaPulgadas'] === '7' ? 'selected' : ''; ?>>7</option>
                                                <option value="8" <?php echo $formData['estaturaPulgadas'] === '8' ? 'selected' : ''; ?>>8</option>
                                                <option value="9" <?php echo $formData['estaturaPulgadas'] === '9' ? 'selected' : ''; ?>>9</option>
                                                <option value="10" <?php echo $formData['estaturaPulgadas'] === '10' ? 'selected' : ''; ?>>10</option>
                                                <option value="11" <?php echo $formData['estaturaPulgadas'] === '11' ? 'selected' : ''; ?>>11</option>
                                            </select>
                                        </div>
                                    </div>
                                    
                                    <div class="grid grid-cols-2 gap-4">
                                        <div class="mb-4">
                                            <label for="peso" class="block text-gray-700 font-medium mb-2">Peso (Libras)</label>
                                            <input type="text" id="peso" name="peso" value="<?php echo htmlspecialchars($formData['peso']); ?>" 
                                                   placeholder="100" 
                                                   class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                        </div>
                                        
                                        <div class="mb-4">
                                            <label for="tez" class="block text-gray-700 font-medium mb-2">Tez</label>
                                            <select id="tez" name="tez" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                                <option value="Blanca" <?php echo $formData['tez'] === 'Blanca' ? 'selected' : ''; ?>>Blanca</option>
                                                <option value="Trigueña" <?php echo $formData['tez'] === 'Trigueña' ? 'selected' : ''; ?>>Trigueña</option>
                                                <option value="Negra" <?php echo $formData['tez'] === 'Negra' ? 'selected' : ''; ?>>Negra</option>
                                            </select>
                                        </div>
                                    </div>
                                    
                                    <div class="grid grid-cols-2 gap-4">
                                        <div class="mb-4">
                                            <label for="colorPelo" class="block text-gray-700 font-medium mb-2">Color de pelo</label>
                                            <select id="colorPelo" name="colorPelo" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                                <option value="Negro" <?php echo $formData['colorPelo'] === 'Negro' ? 'selected' : ''; ?>>Negro</option>
                                                <option value="Castaño" <?php echo $formData['colorPelo'] === 'Castaño' ? 'selected' : ''; ?>>Castaño</option>
                                                <option value="Rubio" <?php echo $formData['colorPelo'] === 'Rubio' ? 'selected' : ''; ?>>Rubio</option>
                                                <option value="Pelirrojo" <?php echo $formData['colorPelo'] === 'Pelirrojo' ? 'selected' : ''; ?>>Pelirrojo</option>
                                                <option value="Gris" <?php echo $formData['colorPelo'] === 'Gris' ? 'selected' : ''; ?>>Gris</option>
                                                <option value="Calvo" <?php echo $formData['colorPelo'] === 'Calvo' ? 'selected' : ''; ?>>Calvo</option>
                                            </select>
                                        </div>
                                        
                                        <div class="mb-4">
                                            <label for="colorOjos" class="block text-gray-700 font-medium mb-2">Color de ojos</label>
                                            <select id="colorOjos" name="colorOjos" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                                <option value="Marrón" <?php echo $formData['colorOjos'] === 'Marrón' ? 'selected' : ''; ?>>Marrón</option>
                                                <option value="Azul" <?php echo $formData['colorOjos'] === 'Azul' ? 'selected' : ''; ?>>Azul</option>
                                                <option value="Verde" <?php echo $formData['colorOjos'] === 'Verde' ? 'selected' : ''; ?>>Verde</option>
                                                <option value="Gris" <?php echo $formData['colorOjos'] === 'Gris' ? 'selected' : ''; ?>>Gris</option>
                                                <option value="Negro" <?php echo $formData['colorOjos'] === 'Negro' ? 'selected' : ''; ?>>Negro</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            <?php elseif ($step === 6): ?>
                                <!-- Step 6: Parents Information -->
                                <div class="space-y-4">
                                    <div class="mb-4">
                                        <label for="nombrePadre" class="block text-gray-700 font-medium mb-2">Nombre del Padre</label>
                                        <input type="text" id="nombrePadre" name="nombrePadre" value="<?php echo htmlspecialchars($formData['nombrePadre']); ?>" 
                                               placeholder="Juan" 
                                               class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                    </div>
                                    
                                    <div class="mb-4">
                                        <label for="nombreMadre" class="block text-gray-700 font-medium mb-2">Nombre de la Madre</label>
                                        <input type="text" id="nombreMadre" name="nombreMadre" value="<?php echo htmlspecialchars($formData['nombreMadre']); ?>" 
                                               placeholder="Maria" 
                                               class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                    </div>
                                </div>
                            <?php elseif ($step === 7): ?>
                                <!-- Step 7: Residential Address -->
                                <div class="space-y-4">
                                    <div class="mb-4">
                                        <label for="urbanizacion" class="block text-gray-700 font-medium mb-2">Urbanización, barrio, condominio</label>
                                        <input type="text" id="urbanizacion" name="urbanizacion" value="<?php echo htmlspecialchars($formData['urbanizacion']); ?>" 
                                               placeholder="corpac" 
                                               class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                    </div>
                                    
                                    <div class="mb-4">
                                        <label for="calle" class="block text-gray-700 font-medium mb-2">Número, Calle, Número de Apartamento</label>
                                        <input type="text" id="calle" name="calle" value="<?php echo htmlspecialchars($formData['calle']); ?>" 
                                               placeholder="calle 1" 
                                               class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                    </div>
                                    
                                    <div class="grid grid-cols-2 gap-4">
                                        <div class="mb-4">
                                            <label for="pueblo" class="block text-gray-700 font-medium mb-2">Pueblo</label>
                                            <select id="pueblo" name="pueblo" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                                <option value="Adjuntas" <?php echo $formData['pueblo'] === 'Adjuntas' ? 'selected' : ''; ?>>Adjuntas</option>
                                                <option value="Aguada" <?php echo $formData['pueblo'] === 'Aguada' ? 'selected' : ''; ?>>Aguada</option>
                                                <option value="Arecibo" <?php echo $formData['pueblo'] === 'Arecibo' ? 'selected' : ''; ?>>Arecibo</option>
                                                <option value="Bayamón" <?php echo $formData['pueblo'] === 'Bayamón' ? 'selected' : ''; ?>>Bayamón</option>
                                                <option value="Cataño" <?php echo $formData['pueblo'] === 'Cataño' ? 'selected' : ''; ?>>Cataño</option>
                                                <option value="San Juan" <?php echo $formData['pueblo'] === 'San Juan' ? 'selected' : ''; ?>>San Juan</option>
                                            </select>
                                        </div>
                                        
                                        <div class="mb-4">
                                            <label for="codigoPostal" class="block text-gray-700 font-medium mb-2">Código postal</label>
                                            <input type="text" id="codigoPostal" name="codigoPostal" value="<?php echo htmlspecialchars($formData['codigoPostal']); ?>" 
                                                   placeholder="000558" 
                                                   class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                        </div>
                                    </div>
                                </div>
                            <?php elseif ($step === 8): ?>
                                <!-- Step 8: Postal Address -->
                                <div class="space-y-4">
                                    <div class="mb-4">
                                        <label class="block text-gray-700 font-medium mb-2">¿Su dirección <span class="font-bold">postal</span> es la misma que la <span class="font-bold">residencial</span>?</label>
                                        <div class="flex gap-4 mb-4">
                                            <label class="inline-flex items-center">
                                                <input type="radio" name="mismaResidencial" value="Si" <?php echo $formData['mismaResidencial'] === 'Si' ? 'checked' : ''; ?> class="form-radio text-[#157a3c]">
                                                <span class="ml-2">Sí</span>
                                            </label>
                                            <label class="inline-flex items-center">
                                                <input type="radio" name="mismaResidencial" value="No" <?php echo $formData['mismaResidencial'] === 'No' ? 'checked' : ''; ?> class="form-radio text-[#157a3c]">
                                                <span class="ml-2">No</span>
                                            </label>
                                        </div>
                                    </div>
                                    
                                    <div class="mb-4">
                                        <label for="apartado" class="block text-gray-700 font-medium mb-2">Apartado, Barrio</label>
                                        <input type="text" id="apartado" name="apartado" value="<?php echo htmlspecialchars($formData['apartado']); ?>" 
                                               placeholder="werwerwe" 
                                               class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                    </div>
                                    
                                    <div class="mb-4">
                                        <label for="pais" class="block text-gray-700 font-medium mb-2">País</label>
                                        <select id="pais" name="pais" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                            <option value="Puerto Rico" <?php echo $formData['pais'] === 'Puerto Rico' ? 'selected' : ''; ?>>Puerto Rico</option>
                                            <option value="Estados Unidos" <?php echo $formData['pais'] === 'Estados Unidos' ? 'selected' : ''; ?>>Estados Unidos</option>
                                            <option value="España" <?php echo $formData['pais'] === 'España' ? 'selected' : ''; ?>>España</option>
                                        </select>
                                    </div>
                                    
                                    <div class="grid grid-cols-2 gap-4">
                                        <div class="mb-4">
                                            <label for="puebloPostal" class="block text-gray-700 font-medium mb-2">Pueblo</label>
                                            <select id="puebloPostal" name="puebloPostal" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                                <option value="Cataño" <?php echo $formData['puebloPostal'] === 'Cataño' ? 'selected' : ''; ?>>Cataño</option>
                                                <option value="Adjuntas" <?php echo $formData['puebloPostal'] === 'Adjuntas' ? 'selected' : ''; ?>>Adjuntas</option>
                                                <option value="Aguada" <?php echo $formData['puebloPostal'] === 'Aguada' ? 'selected' : ''; ?>>Aguada</option>
                                                <option value="Arecibo" <?php echo $formData['puebloPostal'] === 'Arecibo' ? 'selected' : ''; ?>>Arecibo</option>
                                                <option value="Bayamón" <?php echo $formData['puebloPostal'] === 'Bayamón' ? 'selected' : ''; ?>>Bayamón</option>
                                                <option value="San Juan" <?php echo $formData['puebloPostal'] === 'San Juan' ? 'selected' : ''; ?>>San Juan</option>
                                            </select>
                                        </div>
                                        
                                        <div class="mb-4">
                                            <label for="codigoPostalPostal" class="block text-gray-700 font-medium mb-2">Código postal</label>
                                            <input type="text" id="codigoPostalPostal" name="codigoPostalPostal" value="<?php echo htmlspecialchars($formData['codigoPostalPostal']); ?>" 
                                                   placeholder="04545" 
                                                   class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                        </div>
                                    </div>
                                </div>
                            <?php elseif ($step === 10): ?>
                                <!-- Step 10: License Suspension -->
                                <div class="space-y-4">
                                    <div class="mb-4">
                                        <label class="block text-gray-700 font-medium mb-2">¿Ha sido suspendido/a su licencia en Puerto Rico?</label>
                                        <div class="flex gap-4 mb-4">
                                            <label class="inline-flex items-center">
                                                <input type="radio" name="licenciaSuspendida" value="Si" <?php echo $formData['licenciaSuspendida'] === 'Si' ? 'checked' : ''; ?> class="form-radio text-[#157a3c]">
                                                <span class="ml-2">Sí</span>
                                            </label>
                                            <label class="inline-flex items-center">
                                                <input type="radio" name="licenciaSuspendida" value="No" <?php echo $formData['licenciaSuspendida'] === 'No' ? 'checked' : ''; ?> class="form-radio text-[#157a3c]">
                                                <span class="ml-2">No</span>
                                            </label>
                                        </div>
                                    </div>
                                    
                                    <div class="mb-4">
                                        <label class="block text-gray-700 font-medium mb-2">¿Cuál es el motivo?</label>
                                        <div class="flex gap-4 mb-4">
                                            <label class="inline-flex items-center">
                                                <input type="radio" name="motivoSuspension" value="Incapacidad" <?php echo $formData['motivoSuspension'] === 'Incapacidad' ? 'checked' : ''; ?> class="form-radio text-[#157a3c]">
                                                <span class="ml-2">Incapacidad</span>
                                            </label>
                                            <label class="inline-flex items-center">
                                                <input type="radio" name="motivoSuspension" value="Asuntos de tránsito" <?php echo $formData['motivoSuspension'] === 'Asuntos de tránsito' ? 'checked' : ''; ?> class="form-radio text-[#157a3c]">
                                                <span class="ml-2">Asuntos de tránsito</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div class="mb-4">
                                        <label for="numeroLicenciaPR" class="block text-gray-700 font-medium mb-2">Número de Licencia de Puerto Rico (Si aplica)</label>
                                        <input type="text" id="numeroLicenciaPR" name="numeroLicenciaPR" value="<?php echo htmlspecialchars($formData['numeroLicenciaPR']); ?>" 
                                               placeholder="12345678" 
                                               class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                    </div>
                                </div>
                            <?php elseif ($step === 11): ?>
                                <!-- Step 11: Mental Health & DUI -->
                                <div class="space-y-4">
                                    <div class="mb-6">
                                        <label class="block text-gray-700 font-medium mb-2">¿Padece o ha padecido de algún trastorno mental, del sistema nervioso o de alguna condición que pueda afectar su capacidad de conducir o manejar un vehículo de motor con seguridad?</label>
                                        <div class="flex gap-4 mb-4">
                                            <label class="inline-flex items-center">
                                                <input type="radio" name="trastornoMental" value="Si" <?php echo $formData['trastornoMental'] === 'Si' ? 'checked' : ''; ?> class="form-radio text-[#157a3c]">
                                                <span class="ml-2">Sí</span>
                                            </label>
                                            <label class="inline-flex items-center">
                                                <input type="radio" name="trastornoMental" value="No" <?php echo $formData['trastornoMental'] === 'No' ? 'checked' : ''; ?> class="form-radio text-[#157a3c]">
                                                <span class="ml-2">No</span>
                                            </label>
                                        </div>
                                    </div>
                                    
                                    <div class="mb-6">
                                        <label class="block text-gray-700 font-medium mb-2">¿Ha sido convicto por conducir bajo los efectos de bebidas embriagantes?</label>
                                        <div class="flex gap-4 mb-4">
                                            <label class="inline-flex items-center">
                                                <input type="radio" name="embriagantes" value="Si" <?php echo $formData['embriagantes'] === 'Si' ? 'checked' : ''; ?> class="form-radio text-[#157a3c]">
                                                <span class="ml-2">Sí</span>
                                            </label>
                                            <label class="inline-flex items-center">
                                                <input type="radio" name="embriagantes" value="No" <?php echo $formData['embriagantes'] === 'No' ? 'checked' : ''; ?> class="form-radio text-[#157a3c]">
                                                <span class="ml-2">No</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div class="mb-4">
                                        <label for="fechaEmbriagantes" class="block text-gray-700 font-medium mb-2">Si contestó "Sí", indique la fecha de la convicción</label>
                                        <input type="date" id="fechaEmbriagantes" name="fechaEmbriagantes" value="<?php echo htmlspecialchars($formData['fechaEmbriagantes']); ?>" 
                                               class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                    </div>
                                </div>
                            <?php elseif ($step === 12): ?>
                                <!-- Step 12: Narcotics Conviction -->
                                <div class="space-y-4">
                                    <div class="mb-6">
                                        <label class="block text-gray-700 font-medium mb-2">¿Ha sido convicto por uso, venta o transportación de drogas narcóticas, estupefacientes o sustancias controladas o análogas?</label>
                                        <div class="flex gap-4 mb-4">
                                            <label class="inline-flex items-center">
                                                <input type="radio" name="narcoticos" value="Si" <?php echo $formData['narcoticos'] === 'Si' ? 'checked' : ''; ?> class="form-radio text-[#157a3c]">
                                                <span class="ml-2">Sí</span>
                                            </label>
                                            <label class="inline-flex items-center">
                                                <input type="radio" name="narcoticos" value="No" <?php echo $formData['narcoticos'] === 'No' ? 'checked' : ''; ?> class="form-radio text-[#157a3c]">
                                                <span class="ml-2">No</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div class="mb-4">
                                        <label for="fechaNarcoticos" class="block text-gray-700 font-medium mb-2">Si contestó "Sí", indique la fecha de la convicción</label>
                                        <input type="date" id="fechaNarcoticos" name="fechaNarcoticos" value="<?php echo htmlspecialchars($formData['fechaNarcoticos']); ?>" 
                                               class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                    </div>
                                </div>
                            <?php elseif ($step === 13): ?>
                                <!-- Step 13: Financial Obligations -->
                                <div class="space-y-4">
                                    <div class="mb-6">
                                        <label class="block text-gray-700 font-medium mb-2">¿Tiene alguna orden de retención por atraso en pensión alimentaria?</label>
                                        <div class="flex gap-4 mb-4">
                                            <label class="inline-flex items-center">
                                                <input type="radio" name="obligacionAlimentaria" value="Si" <?php echo $formData['obligacionAlimentaria'] === 'Si' ? 'checked' : ''; ?> class="form-radio text-[#157a3c]">
                                                <span class="ml-2">Sí</span>
                                            </label>
                                            <label class="inline-flex items-center">
                                                <input type="radio" name="obligacionAlimentaria" value="No" <?php echo $formData['obligacionAlimentaria'] === 'No' ? 'checked' : ''; ?> class="form-radio text-[#157a3c]">
                                                <span class="ml-2">No</span>
                                            </label>
                                        </div>
                                    </div>
                                    
                                    <div class="mb-6">
                                        <label class="block text-gray-700 font-medium mb-2">¿Tiene deuda con la Administración de Compensaciones por Accidentes de Automóviles (ACAA)?</label>
                                        <div class="flex gap-4 mb-4">
                                            <label class="inline-flex items-center">
                                                <input type="radio" name="deudaACAA" value="Si" <?php echo $formData['deudaACAA'] === 'Si' ? 'checked' : ''; ?> class="form-radio text-[#157a3c]">
                                                <span class="ml-2">Sí</span>
                                            </label>
                                            <label class="inline-flex items-center">
                                                <input type="radio" name="deudaACAA" value="No" <?php echo $formData['deudaACAA'] === 'No' ? 'checked' : ''; ?> class="form-radio text-[#157a3c]">
                                                <span class="ml-2">No</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            <?php endif; ?>
                        </div>
                    </div>
                    <?php endif; ?>

                    <!-- Navigation Buttons - Hidden for step 9 which has its own navigation -->
                    <?php if ($step != 9): ?>
                    <div class="flex flex-col-reverse md:flex-row md:justify-between mt-8 gap-4">
                        <?php if ($step > 1): ?>
                            <a href="index.php?page=licencia-reciprocidad&step=<?php echo $step - 1; ?>"
                               class="px-6 py-2 bg-white text-[#157a3c] border border-[#157a3c] rounded-full hover:bg-[#e8f8ee] transition-colors text-center">
                                Regresar
                            </a>
                        <?php else: ?>
                            <div></div>
                        <?php endif; ?>

                        <button type="submit" 
                                class="px-6 py-2 bg-[#157a3c] text-white rounded-full hover:bg-[#0e6631] transition-colors">
                            <?php echo $step < 13 ? 'Siguiente' : 'Finalizar'; ?>
                        </button>
                    </div>
                    <?php endif; ?>
                </form>
            </div>
        </div>
    </main>
</div>

<!-- Include DotLottie Player -->
<script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs" type="module"></script>
</body>
</html> 