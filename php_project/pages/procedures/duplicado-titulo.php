<?php
// Don't start a new session as it's already started in header.php
// session_start();

// Initialize form data with default values - no session storage yet
$formData = [
    // Vehicle information
    'vin' => '',
    'marca' => '',
    'modelo' => '',
    'año' => '',
    'color' => '',
    'puertas' => '',
    'cilindros' => '',
    'caballos' => '',
    'peso' => '',
    'capacidad' => '',
    'odometro' => '',
    'titulo' => '',
    'estado' => '',
    
    // Owner information
    'tipoId' => 'SSID',
    'numeroId' => '',
    'nombres' => '',
    'apellidoPaterno' => '',
    'apellidoMaterno' => '',
    
    // Residential address
    'urbanizacion' => '',
    'numero' => '',
    'calle' => '',
    'municipio' => '',
    'buzon' => '',
    'codigoPostal' => '',
    
    // Postal address
    'apartado' => '',
    'municipioPostal' => '',
    'buzonPostal' => '',
    'ciudadPostal' => '',
    'codigoPostalPostal' => ''
];

// Set default step to 1 (no session storage yet)
$step = isset($_GET['step']) ? (int)$_GET['step'] : 1;

// Ensure step is between 1 and 5
if ($step < 1 || $step > 5) {
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
$title = "Duplicado de Título";
include_once 'components/header_procedure.php';
?>
<!DOCTYPE html>
<html lang="es" class="font-poppins">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Duplicado de Título - Tu Licencia</title>
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
                <form action="index.php?page=duplicado-titulo&step=<?php echo $step + 1; ?>" method="GET">
                    <input type="hidden" name="page" value="duplicado-titulo">
                    <input type="hidden" name="step" value="<?php echo $step + 1; ?>">
                    
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
                                <p class="text-lg text-center mt-2">Comencemos con los datos del <br>vehículo 😊</p>
                            <?php elseif ($step === 2): ?>
                                <h2 class="text-4xl font-bold mt-6 text-[#157a3c] text-center">¡Continuemos!</h2>
                                <p class="text-lg text-center mt-2">Comencemos con los datos del <br>vehículo 😊</p>
                            <?php elseif ($step === 3): ?>
                                <h2 class="text-4xl font-bold mt-6 text-[#157a3c] text-center">¡<?php echo getUserName(); ?>!</h2>
                                <p class="text-lg text-center mt-2">Continuemos con los datos del <br>propietario <br>😊</p>
                            <?php elseif ($step === 4): ?>
                                <h2 class="text-4xl font-bold mt-6 text-[#157a3c] text-center">¡Continuemos!</h2>
                                <p class="text-lg text-center mt-2">Ingrese los datos de la <br>dirección residencial <br>😊</p>
                            <?php elseif ($step === 5): ?>
                                <h2 class="text-4xl font-bold mt-6 text-[#157a3c] text-center">¡Continuemos!</h2>
                                <p class="text-lg text-center mt-2">Ingrese los datos de la <br>dirección postal <br>😊</p>
                            <?php endif; ?>
                        </div>

                        <!-- Right Content -->
                        <div>
                            <?php if ($step === 1): ?>
                                <!-- Step 1: Basic Vehicle Information -->
                                <div class="space-y-4">
                                    <div class="mb-4">
                                        <label for="vin" class="block text-gray-700 font-medium mb-2">Número de serie (VIN)</label>
                                        <input type="text" id="vin" name="vin" value="<?php echo htmlspecialchars($formData['vin']); ?>" 
                                               placeholder="78789815151105484" 
                                               class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                    </div>
                                    
                                    <div class="mb-4">
                                        <label for="marca" class="block text-gray-700 font-medium mb-2">Marca</label>
                                        <input type="text" id="marca" name="marca" value="<?php echo htmlspecialchars($formData['marca']); ?>" 
                                               placeholder="Abarth" 
                                               class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                    </div>
                                    
                                    <div class="mb-4">
                                        <label for="modelo" class="block text-gray-700 font-medium mb-2">Modelo</label>
                                        <input type="text" id="modelo" name="modelo" value="<?php echo htmlspecialchars($formData['modelo']); ?>" 
                                               placeholder="shunia" 
                                               class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                    </div>
                                    
                                    <div class="grid grid-cols-2 gap-4">
                                        <div class="mb-4">
                                            <label for="año" class="block text-gray-700 font-medium mb-2">Año</label>
                                            <input type="text" id="año" name="año" value="<?php echo htmlspecialchars($formData['año']); ?>" 
                                                   placeholder="2015" 
                                                   class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                        </div>
                                        
                                        <div class="mb-4">
                                            <label for="color" class="block text-gray-700 font-medium mb-2">Color</label>
                                            <input type="text" id="color" name="color" value="<?php echo htmlspecialchars($formData['color']); ?>" 
                                                   placeholder="Rojo" 
                                                   class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                        </div>
                                    </div>
                                    
                                    <div class="grid grid-cols-2 gap-4">
                                        <div class="mb-4">
                                            <label for="puertas" class="block text-gray-700 font-medium mb-2">N° Puertas</label>
                                            <input type="text" id="puertas" name="puertas" value="<?php echo htmlspecialchars($formData['puertas']); ?>" 
                                                   placeholder="4" 
                                                   class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                        </div>
                                        
                                        <div class="mb-4">
                                            <label for="cilindros" class="block text-gray-700 font-medium mb-2">Cilindros</label>
                                            <input type="text" id="cilindros" name="cilindros" value="<?php echo htmlspecialchars($formData['cilindros']); ?>" 
                                                   placeholder="20" 
                                                   class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                        </div>
                                    </div>
                                </div>

                            <?php elseif ($step === 2): ?>
                                <!-- Step 2: Additional Vehicle Information -->
                                <div class="space-y-4">
                                    <div class="grid grid-cols-2 gap-4">
                                        <div class="mb-4">
                                            <label for="caballos" class="block text-gray-700 font-medium mb-2">Caballos</label>
                                            <input type="text" id="caballos" name="caballos" value="<?php echo htmlspecialchars($formData['caballos']); ?>" 
                                                   placeholder="250" 
                                                   class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                        </div>
                                        
                                        <div class="mb-4">
                                            <label for="peso" class="block text-gray-700 font-medium mb-2">Peso descargado</label>
                                            <input type="text" id="peso" name="peso" value="<?php echo htmlspecialchars($formData['peso']); ?>" 
                                                   placeholder="250" 
                                                   class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                        </div>
                                    </div>
                                    
                                    <div class="grid grid-cols-2 gap-4">
                                        <div class="mb-4">
                                            <label for="capacidad" class="block text-gray-700 font-medium mb-2">Capacidad Máxima</label>
                                            <input type="text" id="capacidad" name="capacidad" value="<?php echo htmlspecialchars($formData['capacidad']); ?>" 
                                                   placeholder="1000" 
                                                   class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                        </div>
                                        
                                        <div class="mb-4">
                                            <label for="odometro" class="block text-gray-700 font-medium mb-2">Odómetro</label>
                                            <input type="text" id="odometro" name="odometro" value="<?php echo htmlspecialchars($formData['odometro']); ?>" 
                                                   placeholder="5542" 
                                                   class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                        </div>
                                    </div>
                                    
                                    <div class="grid grid-cols-2 gap-4">
                                        <div class="mb-4">
                                            <label for="titulo" class="block text-gray-700 font-medium mb-2">Título</label>
                                            <select id="titulo" name="titulo" 
                                                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                                <option value="Título" <?php echo $formData['titulo'] === 'Título' ? 'selected' : ''; ?>>Título</option>
                                                <option value="Opción 1" <?php echo $formData['titulo'] === 'Opción 1' ? 'selected' : ''; ?>>Opción 1</option>
                                                <option value="Opción 2" <?php echo $formData['titulo'] === 'Opción 2' ? 'selected' : ''; ?>>Opción 2</option>
                                            </select>
                                        </div>
                                        
                                        <div class="mb-4">
                                            <label for="estado" class="block text-gray-700 font-medium mb-2">Estado procedencia</label>
                                            <input type="text" id="estado" name="estado" value="<?php echo htmlspecialchars($formData['estado']); ?>" 
                                                   placeholder="2" 
                                                   class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                        </div>
                                    </div>
                                </div>

                            <?php elseif ($step === 3): ?>
                                <!-- Step 3: Owner Information -->
                                <div class="space-y-4">
                                    <div class="grid grid-cols-2 gap-4">
                                        <div class="mb-4">
                                            <label for="tipoId" class="block text-gray-700 font-medium mb-2">Identificación <span class="text-red-500">*</span></label>
                                            <select id="tipoId" name="tipoId" 
                                                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                                <option value="SSID" <?php echo $formData['tipoId'] === 'SSID' ? 'selected' : ''; ?>>SSID</option>
                                                <option value="Pasaporte" <?php echo $formData['tipoId'] === 'Pasaporte' ? 'selected' : ''; ?>>Pasaporte</option>
                                                <option value="Otro" <?php echo $formData['tipoId'] === 'Otro' ? 'selected' : ''; ?>>Otro</option>
                                            </select>
                                        </div>
                                        
                                        <div class="mb-4">
                                            <label for="numeroId" class="block text-gray-700 font-medium mb-2">Número de seguro social <span class="text-red-500">*</span></label>
                                            <input type="text" id="numeroId" name="numeroId" value="<?php echo htmlspecialchars($formData['numeroId']); ?>" 
                                                   placeholder="455655656" 
                                                   class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                        </div>
                                    </div>
                                    
                                    <div class="mb-4">
                                        <label for="nombres" class="block text-gray-700 font-medium mb-2">Nombres <span class="text-red-500">*</span></label>
                                        <input type="text" id="nombres" name="nombres" value="<?php echo htmlspecialchars($formData['nombres']); ?>" 
                                               placeholder="Renzo Manuel" 
                                               class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                    </div>
                                    
                                    <div class="mb-4">
                                        <label for="apellidoPaterno" class="block text-gray-700 font-medium mb-2">Apellido Paterno <span class="text-red-500">*</span></label>
                                        <input type="text" id="apellidoPaterno" name="apellidoPaterno" value="<?php echo htmlspecialchars($formData['apellidoPaterno']); ?>" 
                                               placeholder="Escobar" 
                                               class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                    </div>
                                    
                                    <div class="mb-4">
                                        <label for="apellidoMaterno" class="block text-gray-700 font-medium mb-2">Apellido Materno <span class="text-red-500">*</span></label>
                                        <input type="text" id="apellidoMaterno" name="apellidoMaterno" value="<?php echo htmlspecialchars($formData['apellidoMaterno']); ?>" 
                                               placeholder="Ochoa" 
                                               class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                    </div>
                                </div>

                            <?php elseif ($step === 4): ?>
                                <!-- Step 4: Residential Address -->
                                <div class="space-y-4">
                                    <div class="mb-4">
                                        <label for="urbanizacion" class="block text-gray-700 font-medium mb-2">Urbanización, Barrio, Condominio</label>
                                        <input type="text" id="urbanizacion" name="urbanizacion" value="<?php echo htmlspecialchars($formData['urbanizacion']); ?>" 
                                               placeholder="CORPAC" 
                                               class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                    </div>
                                    
                                    <div class="grid grid-cols-2 gap-4">
                                        <div class="mb-4">
                                            <label for="numero" class="block text-gray-700 font-medium mb-2">Número</label>
                                            <input type="text" id="numero" name="numero" value="<?php echo htmlspecialchars($formData['numero']); ?>" 
                                                   placeholder="1" 
                                                   class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                        </div>
                                        
                                        <div class="mb-4">
                                            <label for="calle" class="block text-gray-700 font-medium mb-2">Calle</label>
                                            <input type="text" id="calle" name="calle" value="<?php echo htmlspecialchars($formData['calle']); ?>" 
                                                   placeholder="CALLE 1" 
                                                   class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                        </div>
                                    </div>
                                    
                                    <div class="mb-4">
                                        <label for="municipio" class="block text-gray-700 font-medium mb-2">Municipio</label>
                                        <input type="text" id="municipio" name="municipio" value="<?php echo htmlspecialchars($formData['municipio']); ?>" 
                                               placeholder="SAN ISIDRO" 
                                               class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                    </div>
                                    
                                    <div class="mb-4">
                                        <label for="buzon" class="block text-gray-700 font-medium mb-2">Buzón</label>
                                        <input type="text" id="buzon" name="buzon" value="<?php echo htmlspecialchars($formData['buzon']); ?>" 
                                               placeholder="12145" 
                                               class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                    </div>
                                    
                                    <div class="mb-4">
                                        <label for="codigoPostal" class="block text-gray-700 font-medium mb-2">Código postal</label>
                                        <input type="text" id="codigoPostal" name="codigoPostal" value="<?php echo htmlspecialchars($formData['codigoPostal']); ?>" 
                                               placeholder="02154" 
                                               class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                    </div>
                                </div>

                            <?php elseif ($step === 5): ?>
                                <!-- Step 5: Postal Address -->
                                <div class="space-y-4">
                                    <div class="mb-4">
                                        <label for="apartado" class="block text-gray-700 font-medium mb-2">Apartado</label>
                                        <input type="text" id="apartado" name="apartado" value="<?php echo htmlspecialchars($formData['apartado']); ?>" 
                                               placeholder="SAN BORJA" 
                                               class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                    </div>
                                    
                                    <div class="mb-4">
                                        <label for="municipioPostal" class="block text-gray-700 font-medium mb-2">Municipio</label>
                                        <input type="text" id="municipioPostal" name="municipioPostal" value="<?php echo htmlspecialchars($formData['municipioPostal']); ?>" 
                                               placeholder="SAN JUAN" 
                                               class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                    </div>
                                    
                                    <div class="mb-4">
                                        <label for="buzonPostal" class="block text-gray-700 font-medium mb-2">Buzón</label>
                                        <input type="text" id="buzonPostal" name="buzonPostal" value="<?php echo htmlspecialchars($formData['buzonPostal']); ?>" 
                                               placeholder="54546566" 
                                               class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                    </div>
                                    
                                    <div class="mb-4">
                                        <label for="ciudadPostal" class="block text-gray-700 font-medium mb-2">Ciudad</label>
                                        <input type="text" id="ciudadPostal" name="ciudadPostal" value="<?php echo htmlspecialchars($formData['ciudadPostal']); ?>" 
                                               placeholder="SAN JUAN" 
                                               class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                    </div>
                                    
                                    <div class="mb-4">
                                        <label for="codigoPostalPostal" class="block text-gray-700 font-medium mb-2">Código postal</label>
                                        <input type="text" id="codigoPostalPostal" name="codigoPostalPostal" value="<?php echo htmlspecialchars($formData['codigoPostalPostal']); ?>" 
                                               placeholder="45454" 
                                               class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white">
                                    </div>
                                </div>
                            <?php endif; ?>
                        </div>
                    </div>

                    <!-- Navigation Buttons -->
                    <div class="flex flex-col-reverse md:flex-row md:justify-between mt-8 gap-4">
                        <?php if ($step > 1): ?>
                            <a href="index.php?page=duplicado-titulo&step=<?php echo $step - 1; ?>"
                               class="px-6 py-2 bg-white text-[#157a3c] border border-[#157a3c] rounded-full hover:bg-[#e8f8ee] transition-colors text-center">
                                Regresar
                            </a>
                        <?php else: ?>
                            <div></div>
                        <?php endif; ?>

                        <?php if ($step < 5): ?>
                            <button type="submit" 
                                    class="px-6 py-2 bg-[#157a3c] text-white rounded-full hover:bg-[#0e6631] transition-colors">
                                Siguiente
                            </button>
                        <?php else: ?>
                            <a href="index.php?page=duplicado-titulo-confirmacion" 
                               class="px-6 py-2 bg-[#157a3c] text-white rounded-full hover:bg-[#0e6631] transition-colors text-center">
                                Finalizar
                            </a>
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