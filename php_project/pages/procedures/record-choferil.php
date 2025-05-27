<?php
// Remove session_start() since it's already started elsewhere
// session_start();

// Initialize form data from session or set defaults
$formData = $_SESSION['record_choferil_data'] ?? [
    // Registration information
    'registrationNumber' => '',
    'serialNumber' => '',
    'issueDate' => '',
    'expirationDate' => '',
    
    // Personal information
    'firstName' => '',
    'lastName' => '',
    'residentialAddress' => '',
    'postalAddress' => '',
    'requestPurpose' => '',
];

// Get current step from session or default to 1
$step = $_SESSION['record_choferil_step'] ?? 1;

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['action'])) {
        if ($_POST['action'] === 'next') {
            $step++;
        } elseif ($_POST['action'] === 'prev') {
            $step--;
        } elseif ($_POST['action'] === 'submit') {
            $step = 3; // Go to thank you page
        }
    }
    
    // Update form data in session
    $formData = array_merge($formData, $_POST);
    $_SESSION['record_choferil_data'] = $formData;
    $_SESSION['record_choferil_step'] = $step;
}

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

// Helper function to render input field
function renderInputForm($id, $name, $label, $type = 'text', $value = '', $placeholder = '', $required = true, $options = [], $className = '') {
    $baseClasses = "w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white";
    
    $html = "<div class=\"{$className}\">";
    $html .= "<label for=\"{$id}\" class=\"block text-gray-700 font-medium mb-2\">{$label} " . ($required ? '<span class="text-purple-500">*</span>' : '') . "</label>";
    
    if ($type === 'select') {
        $html .= "<select id=\"{$id}\" name=\"{$name}\" class=\"{$baseClasses}\"" . ($required ? ' required' : '') . ">";
        foreach ($options as $option) {
            $selected = $value === $option['value'] ? ' selected' : '';
            $html .= "<option value=\"{$option['value']}\"{$selected}>{$option['label']}</option>";
        }
        $html .= "</select>";
    } elseif ($type === 'date') {
        $html .= "<input 
            type=\"{$type}\"
            id=\"{$id}\"
            name=\"{$name}\"
            value=\"{$value}\"
            placeholder=\"{$placeholder}\"
            class=\"{$baseClasses}\"" .
            ($required ? ' required' : '') .
            ">";
    } elseif ($type === 'textarea') {
        $html .= "<textarea
            id=\"{$id}\"
            name=\"{$name}\"
            placeholder=\"{$placeholder}\"
            class=\"{$baseClasses} h-32\"" .
            ($required ? ' required' : '') .
            ">{$value}</textarea>";
    } else {
        $html .= "<input 
            type=\"{$type}\"
            id=\"{$id}\"
            name=\"{$name}\"
            value=\"{$value}\"
            placeholder=\"{$placeholder}\"
            class=\"{$baseClasses}\"" .
            ($required ? ' required' : '') .
            ">";
    }
    
    $html .= "</div>";
    return $html;
}

// Helper function to render radio group
function renderRadioGroup($name, $options, $selectedValue, $className = '') {
    $html = "<div class=\"space-y-2 {$className}\">";
    foreach ($options as $option) {
        $checked = $selectedValue === $option['value'] ? ' checked' : '';
        $html .= "
            <label class=\"flex items-center space-x-3 cursor-pointer\">
                <input
                    type=\"radio\"
                    name=\"{$name}\"
                    value=\"{$option['value']}\"
                    {$checked}
                    class=\"h-5 w-5 text-[#157a3c] focus:ring-[#157a3c] border-gray-300\"
                >
                <span class=\"text-gray-700\">{$option['label']}</span>
            </label>
        ";
    }
    $html .= "</div>";
    return $html;
}

// Set the title for the header
$title = "Record Choferil";
// Include header using the correct path (same as other procedure files)
include_once 'components/header_procedure.php';

// Main container start
?>
<!DOCTYPE html>
<html lang="en" class="font-poppins">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Record Choferil - Tu Licencia</title>
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
                <form method="POST" action="">
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
                                <h2 class="text-4xl font-bold mt-6 text-[#157a3c] text-center">¡Continuemos!</h2>
                                <p class="text-lg text-center mt-2">Let's continue with your Record Choferil request</p>
                            <?php elseif ($step === 3): ?>
                                <h2 class="text-4xl font-bold mb-4 text-[#157a3c]">¡Gracias!</h2>
                                <p class="text-xl text-gray-700 text-center max-w-2xl mb-6">
                                    Su información fue recibida y su solicitud registrada. Recibirás un e-mail con la confirmación.
                                </p>
                            <?php else: ?>
                                <h2 class="text-4xl font-bold mt-6 text-[#157a3c] text-center">¡Ya casi terminamos!</h2>
                                <p class="text-lg text-center mt-2">Ingrese información del solicitante</p>
                            <?php endif; ?>
                        </div>

                        <!-- Right Content -->
                        <div>
                            <?php if ($step === 1): ?>
                                <!-- Step 1: Registration Information -->
                                <div class="space-y-6">
                                    <?php
                                    echo renderInputForm(
                                        'registrationNumber',
                                        'registrationNumber',
                                        'Número de registro',
                                        'text',
                                        $formData['registrationNumber'],
                                        '7896325478521425'
                                    );
                                    
                                    echo renderInputForm(
                                        'serialNumber',
                                        'serialNumber',
                                        'Número de serie',
                                        'text',
                                        $formData['serialNumber'],
                                        '454548'
                                    );
                                    
                                    echo renderInputForm(
                                        'issueDate',
                                        'issueDate',
                                        'Fecha expedición',
                                        'date',
                                        $formData['issueDate']
                                    );
                                    
                                    echo renderInputForm(
                                        'expirationDate',
                                        'expirationDate',
                                        'Fecha expiración',
                                        'date',
                                        $formData['expirationDate']
                                    );
                                    ?>
                                </div>

                            <?php elseif ($step === 2): ?>
                                <!-- Step 2: Personal Information -->
                                <div class="space-y-6">
                                    <?php
                                    echo renderInputForm(
                                        'firstName',
                                        'firstName',
                                        'Nombres',
                                        'text',
                                        $formData['firstName'],
                                        'Renzo Manuel'
                                    );
                                    
                                    echo renderInputForm(
                                        'lastName',
                                        'lastName',
                                        'Apellidos',
                                        'text',
                                        $formData['lastName'],
                                        'Escobar Ochoa'
                                    );
                                    
                                    echo renderInputForm(
                                        'residentialAddress',
                                        'residentialAddress',
                                        'Dirección residencial',
                                        'text',
                                        $formData['residentialAddress'],
                                        'SURQUILLO'
                                    );
                                    
                                    echo renderInputForm(
                                        'postalAddress',
                                        'postalAddress',
                                        'Dirección postal',
                                        'text',
                                        $formData['postalAddress'],
                                        '54544'
                                    );
                                    
                                    echo renderInputForm(
                                        'requestPurpose',
                                        'requestPurpose',
                                        'Propósito de solicitud',
                                        'textarea',
                                        $formData['requestPurpose'],
                                        'Explique brevemente el propósito de su solicitud'
                                    );
                                    ?>
                                </div>

                            <?php elseif ($step === 3): ?>
                                <!-- Step 3: Thank You -->
                                <div class="text-center">
                                    <p class="text-xl text-gray-700 text-center max-w-2xl mb-6">
                                        El siguiente paso será firmar su solicitud. ¡Es fácil y rápido!
                                    </p>
                                    
                                    <div class="flex flex-col items-center gap-4">
                                        <a href="index.php?page=record-choferil-signature"
                                           class="inline-block px-8 py-3 bg-[#157a3c] text-white rounded-full hover:bg-[#1a602d] transition-colors">
                                            Continuar a la firma
                                        </a>
                                        
                                        <a href="/dashboard"
                                           class="text-[#157a3c] underline">
                                            Estoy cansado, prefiero hacerlo después
                                        </a>
                                    </div>
                                </div>
                            <?php endif; ?>
                        </div>
                    </div>

                    <?php if ($step < 3): ?>
                        <!-- Navigation Buttons -->
                        <div class="flex flex-col-reverse md:flex-row md:justify-between mt-8 gap-4">
                            <?php if ($step > 1): ?>
                                <button type="submit" 
                                        name="action" 
                                        value="prev"
                                        class="px-6 py-2 bg-white text-[#1a602d] border border-[#1a602d] rounded-full hover:bg-[#e8f8ee] transition-colors">
                                    Regresar
                                </button>
                            <?php else: ?>
                                <div></div>
                            <?php endif; ?>

                            <button type="submit" 
                                    name="action" 
                                    value="<?php echo $step === 2 ? 'submit' : 'next'; ?>"
                                    class="px-6 py-2 bg-[#1a602d] text-white rounded-full hover:bg-[#144823] transition-colors">
                                <?php echo $step === 2 ? 'Finalizar' : 'Siguiente'; ?>
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