<?php
// Don't start a new session as it's already started in header.php
// session_start();

// Initialize form data with default values - no session storage yet
$formData = [
    // Personal information
    'nombres' => '',
    'apellidoPaterno' => '',
    'apellidoMaterno' => '',
    
    // Identification
    'tipoId' => 'Seguro Social',
    'numeroId' => '',
    'numeroLicencia' => '',
    
    // Residential address
    'urbanizacion' => '',
    'calle' => '',
    'pueblo' => '',
    'codigoPostal' => '',
    
    // Postal address
    'mismaResidencial' => 'si',
    'apartado' => '',
    'pais' => 'Puerto Rico',
    'puebloPostal' => '',
    'codigoPostalPostal' => '',
    
    // Vehicle information
    'numeroTablilla' => '',
    'numeroRegistro' => '',
    'numeroTitulo' => '',
    
    // Vehicle details
    'marca' => '',
    'modelo' => '',
    'año' => '',
    'numeroSerie' => ''
];

// Set default step to 1 (no session storage yet)
$step = isset($_GET['step']) ? (int)$_GET['step'] : 1;

// Ensure step is between 1 and 6
if ($step < 1 || $step > 6) {
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
$title = "Tablillas Incapacidad";
include_once 'components/header_procedure.php';
?>
<!DOCTYPE html>
<html lang="es" class="font-poppins">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Tablillas Incapacidad - Tu Licencia</title>
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
                <form action="index.php?page=tablillas-incapacidad<?php echo $step < 6 ? '&step='.($step + 1) : '-confirmacion'; ?>" method="GET">
                    <input type="hidden" name="page" value="<?php echo $step < 6 ? 'tablillas-incapacidad' : 'tablillas-incapacidad-confirmacion'; ?>">
                    <?php if ($step < 6): ?>
                    <input type="hidden" name="step" value="<?php echo $step + 1; ?>">
                    <?php endif; ?>
                    
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
                                <h2 class="text-4xl font-bold mt-6 text-[#157a3c] text-center">¡Hola <?php echo getUserName(); ?>!</h2>
                                <p class="text-lg text-center mt-2">Comencemos con tus datos personales 😊</p>
                            <?php elseif ($step === 2): ?>
                                <h2 class="text-4xl font-bold mt-6 text-[#157a3c] text-center">¡Gracias!</h2>
                                <p class="text-lg text-center mt-2">Ahora ingrese los siguientes datos:</p>
                            <?php elseif ($step === 3): ?>
                                <h2 class="text-4xl font-bold mt-6 text-[#157a3c] text-center">¡Listo!</h2>
                                <p class="text-lg text-center mt-2">Procedamos a registrar su dirección residencial.</p>
                            <?php elseif ($step === 4): ?>
                                <h2 class="text-4xl font-bold mt-6 text-[#157a3c] text-center">¡Listo!</h2>
                                <p class="text-lg text-center mt-2">Procedamos a registrar su dirección postal.</p>
                            <?php elseif ($step === 5): ?>
                                <h2 class="text-4xl font-bold mt-6 text-[#157a3c] text-center">¡Listo!</h2>
                                <p class="text-lg text-center mt-2">Ahora necesitamos algunos datos de su vehículo.</p>
                            <?php elseif ($step === 6): ?>
                                <h2 class="text-4xl font-bold mt-6 text-[#157a3c] text-center">Última pregunta</h2>
                                <p class="text-lg text-center mt-2">Esta es la última pregunta 🙂</p>
                            <?php endif; ?>
                        </div>

                        <!-- Right Content -->
                        <div>
                            <?php if ($step === 1): ?>
                                <!-- Step 1: Personal Information -->
                                <div class="space-y-4">
                                    <div class="mb-4">
                                        <label for="nombres" class="block text-gray-700 font-medium mb-2">Nombres <span class="text-red-500">*</span></label>
                                        <input type="text" id="nombres" name="nombres" value="<?php echo htmlspecialchars($formData['nombres']); ?>" 
                                               placeholder="Ingrese sus nombres" 
                                               class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                    </div>
                                    
                                    <div class="mb-4">
                                        <label for="apellidoPaterno" class="block text-gray-700 font-medium mb-2">Apellido paterno <span class="text-red-500">*</span></label>
                                        <input type="text" id="apellidoPaterno" name="apellidoPaterno" value="<?php echo htmlspecialchars($formData['apellidoPaterno']); ?>" 
                                               placeholder="Ingrese su apellido paterno" 
                                               class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                    </div>
                                    
                                    <div class="mb-4">
                                        <label for="apellidoMaterno" class="block text-gray-700 font-medium mb-2">Apellido materno <span class="text-red-500">*</span></label>
                                        <input type="text" id="apellidoMaterno" name="apellidoMaterno" value="<?php echo htmlspecialchars($formData['apellidoMaterno']); ?>" 
                                               placeholder="Ingrese su apellido materno" 
                                               class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                    </div>
                                </div>

                            <?php elseif ($step === 2): ?>
                                <!-- Step 2: Identification -->
                                <div class="space-y-4">
                                    <div class="mb-4">
                                        <label class="block text-gray-700 font-medium mb-2">Identificación <span class="text-red-500">*</span></label>
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
                                        <label for="numeroId" class="block text-gray-700 font-medium mb-2">Últimos 4 dígitos/ Núm de pasaporte: <span class="text-red-500">*</span></label>
                                        <input type="text" id="numeroId" name="numeroId" value="<?php echo htmlspecialchars($formData['numeroId']); ?>" 
                                               placeholder="0000" 
                                               class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                        <p class="text-sm text-gray-500 mt-1">Estos datos ya fueron ingresados por usted en el registro 😊</p>
                                    </div>
                                    
                                    <div class="mb-4">
                                        <label for="numeroLicencia" class="block text-gray-700 font-medium mb-2">Número de licencia: <span class="text-red-500">*</span></label>
                                        <input type="text" id="numeroLicencia" name="numeroLicencia" value="<?php echo htmlspecialchars($formData['numeroLicencia']); ?>" 
                                               placeholder="4565464" 
                                               class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                    </div>
                                </div>

                            <?php elseif ($step === 3): ?>
                                <!-- Step 3: Residential Address -->
                                <div class="space-y-4">
                                    <div class="mb-4">
                                        <label for="urbanizacion" class="block text-gray-700 font-medium mb-2">Urbanización, barrio, condominio</label>
                                        <input type="text" id="urbanizacion" name="urbanizacion" value="<?php echo htmlspecialchars($formData['urbanizacion']); ?>" 
                                               placeholder="Ingrese urbanización o barrio" 
                                               class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                    </div>
                                    
                                    <div class="mb-4">
                                        <label for="calle" class="block text-gray-700 font-medium mb-2">Número, Calle, Número de Apartamento</label>
                                        <input type="text" id="calle" name="calle" value="<?php echo htmlspecialchars($formData['calle']); ?>" 
                                               placeholder="Calle 1" 
                                               class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                    </div>
                                    
                                    <div class="grid grid-cols-2 gap-4">
                                        <div class="mb-4">
                                            <label for="pueblo" class="block text-gray-700 font-medium mb-2">Pueblo</label>
                                            <select id="pueblo" name="pueblo" 
                                                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                                <option value="">Seleccione</option>
                                                <option value="Adjuntas" <?php echo $formData['pueblo'] === 'Adjuntas' ? 'selected' : ''; ?>>Adjuntas</option>
                                                <option value="Aguada" <?php echo $formData['pueblo'] === 'Aguada' ? 'selected' : ''; ?>>Aguada</option>
                                                <option value="Aguadilla" <?php echo $formData['pueblo'] === 'Aguadilla' ? 'selected' : ''; ?>>Aguadilla</option>
                                                <option value="San Juan" <?php echo $formData['pueblo'] === 'San Juan' ? 'selected' : ''; ?>>San Juan</option>
                                            </select>
                                        </div>
                                        
                                        <div class="mb-4">
                                            <label for="codigoPostal" class="block text-gray-700 font-medium mb-2">Código postal</label>
                                            <input type="text" id="codigoPostal" name="codigoPostal" value="<?php echo htmlspecialchars($formData['codigoPostal']); ?>" 
                                                   placeholder="00000" 
                                                   class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                        </div>
                                    </div>
                                    
                                    <p class="text-sm text-gray-500 mt-1">Estos datos ya fueron ingresados por usted en el registro 😊</p>
                                </div>

                            <?php elseif ($step === 4): ?>
                                <!-- Step 4: Postal Address -->
                                <div class="space-y-4">
                                    <div class="mb-4">
                                        <label class="block text-gray-700 font-medium mb-2">¿Su dirección postal es la misma que la residencial?</label>
                                        <div class="flex gap-4 mb-2">
                                            <label class="inline-flex items-center">
                                                <input type="radio" name="mismaResidencial" value="si" <?php echo $formData['mismaResidencial'] === 'si' ? 'checked' : ''; ?> class="form-radio text-[#157a3c]">
                                                <span class="ml-2">Sí</span>
                                            </label>
                                            <label class="inline-flex items-center">
                                                <input type="radio" name="mismaResidencial" value="no" <?php echo $formData['mismaResidencial'] === 'no' ? 'checked' : ''; ?> class="form-radio text-[#157a3c]">
                                                <span class="ml-2">No</span>
                                            </label>
                                        </div>
                                    </div>
                                    
                                    <div class="mb-4">
                                        <label for="apartado" class="block text-gray-700 font-medium mb-2">Apartado, Barrio</label>
                                        <input type="text" id="apartado" name="apartado" value="<?php echo htmlspecialchars($formData['apartado']); ?>" 
                                               placeholder="Ingrese apartado" 
                                               class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                    </div>
                                    
                                    <div class="mb-4">
                                        <label for="pais" class="block text-gray-700 font-medium mb-2">País</label>
                                        <input type="text" id="pais" name="pais" value="<?php echo htmlspecialchars($formData['pais']); ?>" 
                                               placeholder="Puerto Rico" 
                                               class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                    </div>
                                    
                                    <div class="grid grid-cols-2 gap-4">
                                        <div class="mb-4">
                                            <label for="puebloPostal" class="block text-gray-700 font-medium mb-2">Pueblo</label>
                                            <select id="puebloPostal" name="puebloPostal" 
                                                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                                <option value="">Seleccione</option>
                                                <option value="Ceiba" <?php echo $formData['puebloPostal'] === 'Ceiba' ? 'selected' : ''; ?>>Ceiba</option>
                                                <option value="Ciales" <?php echo $formData['puebloPostal'] === 'Ciales' ? 'selected' : ''; ?>>Ciales</option>
                                                <option value="Cidra" <?php echo $formData['puebloPostal'] === 'Cidra' ? 'selected' : ''; ?>>Cidra</option>
                                                <option value="San Juan" <?php echo $formData['puebloPostal'] === 'San Juan' ? 'selected' : ''; ?>>San Juan</option>
                                            </select>
                                        </div>
                                        
                                        <div class="mb-4">
                                            <label for="codigoPostalPostal" class="block text-gray-700 font-medium mb-2">Código postal</label>
                                            <input type="text" id="codigoPostalPostal" name="codigoPostalPostal" value="<?php echo htmlspecialchars($formData['codigoPostalPostal']); ?>" 
                                                   placeholder="00000" 
                                                   class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                        </div>
                                    </div>
                                </div>

                            <?php elseif ($step === 5): ?>
                                <!-- Step 5: Vehicle Information -->
                                <div class="space-y-4">
                                    <div class="mb-4">
                                        <label for="numeroTablilla" class="block text-gray-700 font-medium mb-2">Número de tablilla <span class="text-red-500">*</span></label>
                                        <input type="text" id="numeroTablilla" name="numeroTablilla" value="<?php echo htmlspecialchars($formData['numeroTablilla']); ?>" 
                                               placeholder="Ingrese número de tablilla" 
                                               class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                    </div>
                                    
                                    <div class="mb-4">
                                        <label for="numeroRegistro" class="block text-gray-700 font-medium mb-2">Número de registro <span class="text-red-500">*</span></label>
                                        <input type="text" id="numeroRegistro" name="numeroRegistro" value="<?php echo htmlspecialchars($formData['numeroRegistro']); ?>" 
                                               placeholder="Ingrese número de registro" 
                                               class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                    </div>
                                    
                                    <div class="mb-4">
                                        <label for="numeroTitulo" class="block text-gray-700 font-medium mb-2">Número de Título de Propiedad <span class="text-red-500">*</span></label>
                                        <input type="text" id="numeroTitulo" name="numeroTitulo" value="<?php echo htmlspecialchars($formData['numeroTitulo']); ?>" 
                                               placeholder="Ingrese número de título" 
                                               class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                    </div>
                                </div>

                            <?php elseif ($step === 6): ?>
                                <!-- Step 6: Vehicle Details -->
                                <div class="space-y-4">
                                    <div class="mb-4">
                                        <label for="marca" class="block text-gray-700 font-medium mb-2">Marca de vehículo <span class="text-red-500">*</span></label>
                                        <input type="text" id="marca" name="marca" value="<?php echo htmlspecialchars($formData['marca']); ?>" 
                                               placeholder="Ingrese marca del vehículo" 
                                               class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                    </div>
                                    
                                    <div class="mb-4">
                                        <label for="modelo" class="block text-gray-700 font-medium mb-2">Modelo de vehículo <span class="text-red-500">*</span></label>
                                        <input type="text" id="modelo" name="modelo" value="<?php echo htmlspecialchars($formData['modelo']); ?>" 
                                               placeholder="Ingrese modelo del vehículo" 
                                               class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                    </div>
                                    
                                    <div class="mb-4">
                                        <label for="año" class="block text-gray-700 font-medium mb-2">Año de vehículo <span class="text-red-500">*</span></label>
                                        <input type="text" id="año" name="año" value="<?php echo htmlspecialchars($formData['año']); ?>" 
                                               placeholder="Ingrese año del vehículo" 
                                               class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                    </div>
                                    
                                    <div class="mb-4">
                                        <label for="numeroSerie" class="block text-gray-700 font-medium mb-2">Número de serie <span class="text-red-500">*</span></label>
                                        <input type="text" id="numeroSerie" name="numeroSerie" value="<?php echo htmlspecialchars($formData['numeroSerie']); ?>" 
                                               placeholder="Ingrese número de serie del vehículo" 
                                               class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                    </div>
                                </div>
                            <?php endif; ?>
                        </div>
                    </div>

                    <!-- Navigation Buttons -->
                    <div class="flex flex-col-reverse md:flex-row md:justify-between mt-8 gap-4">
                        <?php if ($step > 1): ?>
                            <a href="index.php?page=tablillas-incapacidad&step=<?php echo $step - 1; ?>"
                               class="px-6 py-2 bg-white text-[#157a3c] border border-[#157a3c] rounded-full hover:bg-[#e8f8ee] transition-colors text-center">
                                Regresar
                            </a>
                        <?php else: ?>
                            <div></div>
                        <?php endif; ?>

                        <?php if ($step < 6): ?>
                            <button type="submit" 
                                    class="px-6 py-2 bg-[#157a3c] text-white rounded-full hover:bg-[#0e6631] transition-colors">
                                Siguiente
                            </button>
                        <?php else: ?>
                            <button type="submit" 
                                   class="px-6 py-2 bg-[#157a3c] text-white rounded-full hover:bg-[#0e6631] transition-colors">
                                Finalizar
                            </button>
                        <?php endif; ?>
                    </div>
                </form>
            </div>
        </div>
    </main>
</div>

<!-- Include DotLottie Player -->
<script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs" type="module"></script>
</body>
</html> 