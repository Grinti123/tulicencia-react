<?php
// Get user data from localStorage equivalent (session)
$userData = isset($_SESSION['user']) ? json_decode($_SESSION['user'], true) : null;

// Initialize default form data
$formData = [
    'cl_nombre' => '',
    'cl_segundoNombre' => '',
    'cl_primerApellido' => '',
    'cl_segundoApellido' => '',
    'cl_correo' => '',
    'cl_numeroTelefono' => '',
    'cl_direccion' => '',
    'cl_numeroLicencia' => '',
    'cl_numeroSeguro' => '',
    'cl_nombreUsuario' => '',
    'cl_zip' => '',
    'cl_fechaNacimiento' => ''
];

// If user data exists, populate form data
if ($userData) {
    $userItem = $userData['item'] ?? [];
    $formData = [
        'cl_nombre' => $userItem['cl_nombre'] ?? '',
        'cl_segundoNombre' => $userItem['cl_segundoNombre'] ?? '',
        'cl_primerApellido' => $userItem['cl_primerApellido'] ?? '',
        'cl_segundoApellido' => $userItem['cl_segundoApellido'] ?? '',
        'cl_correo' => $userItem['cl_correo'] ?? '',
        'cl_numeroTelefono' => $userItem['cl_numeroTelefono'] ?? '',
        'cl_direccion' => $userItem['cl_direccion'] ?? '',
        'cl_numeroLicencia' => $userItem['cl_numeroLicencia'] ?? '',
        'cl_numeroSeguro' => $userItem['cl_numeroSeguro'] ?? '',
        'cl_nombreUsuario' => $userItem['cl_nombreUsuario'] ?? '',
        'cl_zip' => $userItem['cl_zip'] ?? '',
        'cl_fechaNacimiento' => isset($userItem['cl_fechaNacimiento']) ? explode('T', $userItem['cl_fechaNacimiento'])[0] : ''
    ];
}

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Update user data
    $updatedUserData = [
        'item' => $_POST
    ];
    
    $_SESSION['user'] = json_encode($updatedUserData);
    $formData = $_POST;
    
    // Show success message via JavaScript
    echo "<script>alert('Profile updated successfully!');</script>";
}

// Function to render input field with exact React styling
function renderInputForm($id, $name, $label, $type, $value, $placeholder = '', $disabled = false, $className = '') {
    $baseClasses = "w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c]";
    $inputClasses = $disabled ? $baseClasses . " bg-gray-100 cursor-not-allowed" : $baseClasses . " bg-white";
    $containerClasses = $className ? $className : '';
    
    return "
        <div class=\"{$containerClasses}\">
            <label for=\"{$id}\" class=\"block text-[#1a602d] font-medium mb-2\">{$label}</label>
            <input 
                type=\"{$type}\"
                id=\"{$id}\"
                name=\"{$name}\"
                value=\"{$value}\"
                placeholder=\"{$placeholder}\"
                class=\"{$inputClasses}\"
                " . ($disabled ? 'disabled' : '') . "
            >
        </div>
    ";
}
?>

<div class="p-6 bg-gradient-to-br from-[#e8f8ee] via-white to-[#e8f8ee] rounded-lg shadow-lg w-full">
    <h2 class="text-xl font-semibold text-gray-800 mb-4">Your Profile</h2>
    
    <form method="POST" class="space-y-6">
        <!-- Personal Information -->
        <div>
            <h3 class="text-md font-medium text-gray-700 mb-3">Personal Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <?php
                echo renderInputForm(
                    'cl_nombre',
                    'cl_nombre',
                    'First Name',
                    'text',
                    $formData['cl_nombre'],
                    'Enter first name'
                );

                echo renderInputForm(
                    'cl_segundoNombre',
                    'cl_segundoNombre',
                    'Middle Name',
                    'text',
                    $formData['cl_segundoNombre'],
                    'Enter middle name'
                );

                echo renderInputForm(
                    'cl_primerApellido',
                    'cl_primerApellido',
                    'First Last Name',
                    'text',
                    $formData['cl_primerApellido'],
                    'Enter first last name'
                );

                echo renderInputForm(
                    'cl_segundoApellido',
                    'cl_segundoApellido',
                    'Second Last Name',
                    'text',
                    $formData['cl_segundoApellido'],
                    'Enter second last name'
                );

                echo renderInputForm(
                    'cl_fechaNacimiento',
                    'cl_fechaNacimiento',
                    'Date of Birth',
                    'date',
                    $formData['cl_fechaNacimiento']
                );
                ?>
            </div>
        </div>

        <!-- Contact Information -->
        <div>
            <h3 class="text-md font-medium text-gray-700 mb-3">Contact Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <?php
                echo renderInputForm(
                    'cl_correo',
                    'cl_correo',
                    'Email',
                    'email',
                    $formData['cl_correo'],
                    'Enter email address'
                );

                echo renderInputForm(
                    'cl_numeroTelefono',
                    'cl_numeroTelefono',
                    'Phone Number',
                    'tel',
                    $formData['cl_numeroTelefono'],
                    'Enter phone number'
                );

                echo renderInputForm(
                    'cl_direccion',
                    'cl_direccion',
                    'Address',
                    'text',
                    $formData['cl_direccion'],
                    'Enter address',
                    false,
                    'md:col-span-2'
                );

                echo renderInputForm(
                    'cl_zip',
                    'cl_zip',
                    'ZIP/Postal Code',
                    'text',
                    $formData['cl_zip'],
                    'Enter ZIP code'
                );
                ?>
            </div>
        </div>

        <!-- Account Information -->
        <div>
            <h3 class="text-md font-medium text-gray-700 mb-3">Account Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <?php
                echo renderInputForm(
                    'cl_nombreUsuario',
                    'cl_nombreUsuario',
                    'Username',
                    'text',
                    $formData['cl_nombreUsuario'],
                    'Enter username',
                    true
                );

                echo renderInputForm(
                    'cl_numeroLicencia',
                    'cl_numeroLicencia',
                    'License Number',
                    'text',
                    $formData['cl_numeroLicencia'],
                    'Enter license number'
                );

                echo renderInputForm(
                    'cl_numeroSeguro',
                    'cl_numeroSeguro',
                    'Insurance Number',
                    'text',
                    $formData['cl_numeroSeguro'],
                    'Enter insurance number'
                );
                ?>
            </div>
        </div>

        <div class="flex justify-end gap-4">
            <button type="button" 
                    onclick="window.history.back()" 
                    class="px-6 py-2 bg-white text-[#1a602d] border border-[#1a602d] rounded-full hover:bg-[#e8f8ee] transition-colors">
                Cancel
            </button>
            <button type="submit" 
                    class="px-6 py-2 bg-[#1a602d] text-white rounded-full hover:bg-[#144823] transition-colors">
                Save Changes
            </button>
        </div>
    </form>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    form.addEventListener('submit', function(e) {
        // Form validation can be added here if needed
        console.log('Form submitted');
    });
});
</script> 