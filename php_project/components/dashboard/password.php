<?php
// Initialize form data
$formData = [
    'currentPassword' => '',
    'newPassword' => '',
    'confirmPassword' => ''
];

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $formData = [
        'currentPassword' => $_POST['currentPassword'] ?? '',
        'newPassword' => $_POST['newPassword'] ?? '',
        'confirmPassword' => $_POST['confirmPassword'] ?? ''
    ];
    
    // Log form submission (matching React behavior)
    echo "<script>console.log('Form submitted:', " . json_encode($formData) . ");</script>";
}

// Function to render password input with toggle
function renderPasswordInput($id, $name, $label, $value, $placeholder) {
    $baseClasses = "w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c] bg-white";
    
    return "
        <div>
            <label for=\"{$id}\" class=\"block text-[#1a602d] font-medium mb-2\">{$label}</label>
            <div class=\"relative\">
                <input 
                    type=\"password\"
                    id=\"{$id}\"
                    name=\"{$name}\"
                    value=\"{$value}\"
                    placeholder=\"{$placeholder}\"
                    class=\"{$baseClasses}\"
                >
                <button 
                    type=\"button\"
                    onclick=\"togglePassword('{$id}')\"
                    class=\"absolute inset-y-0 right-0 pr-3 flex items-center\"
                >
                    <svg id=\"{$id}-icon-show\" class=\"h-5 w-5 text-gray-400 hidden\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">
                        <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M15 12a3 3 0 11-6 0 3 3 0 016 0z\" />
                        <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z\" />
                    </svg>
                    <svg id=\"{$id}-icon-hide\" class=\"h-5 w-5 text-gray-400\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">
                        <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21\" />
                    </svg>
                </button>
            </div>
        </div>
    ";
}
?>

<div class="p-6 bg-gradient-to-br from-[#e8f8ee] via-white to-[#e8f8ee] rounded-lg shadow-lg w-full">
    <h2 class="text-xl font-semibold text-gray-800 mb-4">Update Password</h2>
    
    <form method="POST" class="space-y-4">
        <?php
        echo renderPasswordInput(
            'currentPassword',
            'currentPassword',
            'Current Password',
            $formData['currentPassword'],
            'Enter current password'
        );

        echo renderPasswordInput(
            'newPassword',
            'newPassword',
            'New Password',
            $formData['newPassword'],
            'Enter new password'
        );

        echo renderPasswordInput(
            'confirmPassword',
            'confirmPassword',
            'Confirm New Password',
            $formData['confirmPassword'],
            'Confirm new password'
        );
        ?>

        <button type="submit" 
                class="w-full px-6 py-2 bg-[#1a602d] text-white rounded-full hover:bg-[#144823] transition-colors">
                Update Password
            </button>
    </form>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    form.addEventListener('submit', function(e) {
        // Log form submission like in React
        console.log('Form submitted');
    });
});

// Password toggle functionality
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const showIcon = document.getElementById(`${inputId}-icon-show`);
    const hideIcon = document.getElementById(`${inputId}-icon-hide`);
    
    if (input.type === 'password') {
        input.type = 'text';
        showIcon.classList.remove('hidden');
        hideIcon.classList.add('hidden');
    } else {
        input.type = 'password';
        showIcon.classList.add('hidden');
        hideIcon.classList.remove('hidden');
    }
}
</script>