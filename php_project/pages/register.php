<?php
// Initialize session if not already started
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Handle step navigation via GET parameter
if (isset($_GET['step'])) {
    $_SESSION['registration_step'] = (int)$_GET['step'];
    // Make sure step is within valid range
    if ($_SESSION['registration_step'] < 1 || $_SESSION['registration_step'] > 4) {
        $_SESSION['registration_step'] = 1;
    }
}

// Set default step if not set
if (!isset($_SESSION['registration_step'])) {
    $_SESSION['registration_step'] = 1;
}

$step = $_SESSION['registration_step'];

// Get towns data for step 2
$towns = [
    ['pl_id' => 1, 'pl_nombre' => 'San Juan'],
    ['pl_id' => 2, 'pl_nombre' => 'Bayamón'],
    ['pl_id' => 3, 'pl_nombre' => 'Carolina'],
    ['pl_id' => 4, 'pl_nombre' => 'Ponce'],
    ['pl_id' => 5, 'pl_nombre' => 'Caguas'],
    ['pl_id' => 6, 'pl_nombre' => 'Guaynabo'],
    ['pl_id' => 7, 'pl_nombre' => 'Mayagüez'],
    ['pl_id' => 8, 'pl_nombre' => 'Trujillo Alto'],
    ['pl_id' => 9, 'pl_nombre' => 'Arecibo'],
    ['pl_id' => 10, 'pl_nombre' => 'Fajardo']
];
?>
<!-- Include DotLottie Player -->
<script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.js"></script>

<?php include 'components/header_register.php'; ?>

<div class="grid md:grid-cols-5 gap-8 items-start px-4 md:px-6 max-w-7xl mx-auto py-10 rounded-[20rem]">
    <!-- Left side - Animation and Text -->
    <div class="order-1 md:col-span-2 flex flex-col items-center justify-start md:sticky md:top-24 fade-in" style="animation-duration: 1s;">
        <div class="h-[200px] md:h-[300px] mb-4 md:mb-6">
            <dotlottie-player
                src="/json/chicolentes.json"
                autoplay
                loop
            ></dotlottie-player>
        </div>
        <div class="text-center" id="stepTitle">
            <h1 class="text-3xl md:text-5xl font-bold text-[#1a602d] mb-3 md:mb-4">¡Bienvenido!</h1>
            <p class="text-base md:text-lg text-[#224a33]">Vamos a comenzar con tu registro. Completa tus datos personales.</p>
        </div>
    </div>

    <!-- Right side - Form -->
    <div class="order-2 md:col-span-3 fade-in" style="animation-duration: 1s;">
        <div class="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100 w-full max-w-3xl mx-auto">
            <!-- Progress indicator -->
            <div class="flex justify-center mb-6">
                <div class="flex items-center w-full max-w-xs">
                    <?php for ($i = 1; $i <= 4; $i++) { ?>
                        <div id="step-indicator-<?php echo $i; ?>" class="flex items-center justify-center w-8 h-8 rounded-full border-2 
                            <?php echo $i == 1 ? 'bg-[#1a602d] text-white border-[#1a602d]' : 'bg-white text-gray-500 border-gray-300'; ?>">
                            <?php echo $i; ?>
                        </div>
                        <?php if ($i < 4) { ?>
                            <div id="step-line-<?php echo $i; ?>" class="flex-1 h-1 mx-2 bg-gray-300"></div>
                        <?php } ?>
                    <?php } ?>
                </div>
            </div>
            
            <!-- Form Steps Container -->
            <div id="registration-steps">
                <div id="step1" class="step-content">
                    <?php include 'registration/step1.php'; ?>
                </div>
                <div id="step2" class="step-content hidden">
                    <?php include 'registration/step2.php'; ?>
                </div>
                <div id="step3" class="step-content hidden">
                    <?php include 'registration/step3.php'; ?>
                </div>
                <div id="step4" class="step-content hidden">
                    <?php include 'registration/step4.php'; ?>
                </div>
            </div>
        </div>
    </div>
</div>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 135" fill="none">
    <defs>
        <linearGradient id="wave-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#e8f8ee" />
            <stop offset="100%" stop-color="#ffffff" />
        </linearGradient>
    </defs>
    <path fill="url(#wave-gradient)" d="M1440 135V57.8C798.3 193.6 358.2-153.2 0 87.6V135h1440Z"></path>
</svg>

<style>
    .fade-in {
        opacity: 0;
        animation: fadeIn ease forwards;
    }
    
    @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
    }
    
    .form-input {
        width: 100%;
        padding: 0.5rem 1rem;
        border: 1px solid #d1d5db;
        border-radius: 0.5rem;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }
    
    .form-input:focus {
        outline: none;
        ring: 2px;
        ring-color: #1a602d;
        border-color: transparent;
    }
    
    .step-content {
        transition: all 0.3s ease-in-out;
    }
    
    .step-content.hidden {
        display: none;
    }
</style>

<script>
// Make navigation functions globally available
function nextStep() {
    const currentStep = getCurrentStep();
    if (currentStep < 4) {
        showStep(currentStep + 1);
    }
}

function prevStep() {
    const currentStep = getCurrentStep();
    if (currentStep > 1) {
        showStep(currentStep - 1);
    }
}

function goToStep(step) {
    if (step >= 1 && step <= 4) {
        showStep(step);
    }
}

function getCurrentStep() {
    for (let i = 1; i <= 4; i++) {
        if (!document.getElementById(`step${i}`).classList.contains('hidden')) {
            return i;
        }
    }
    return 1;
}

function showStep(step) {
    // Hide all steps
    document.querySelectorAll('.step-content').forEach(content => {
        content.classList.add('hidden');
    });
    
    // Show the target step
    document.getElementById(`step${step}`).classList.remove('hidden');
    
    // Update progress indicators
    updateStepIndicators(step);
    
    // Update step title
    updateStepTitle(step);
}

function updateStepIndicators(step) {
    for (let i = 1; i <= 4; i++) {
        const indicator = document.getElementById(`step-indicator-${i}`);
        const line = document.getElementById(`step-line-${i}`);
        
        if (i <= step) {
            indicator.classList.remove('bg-white', 'text-gray-500', 'border-gray-300');
            indicator.classList.add('bg-[#1a602d]', 'text-white', 'border-[#1a602d]');
            if (line && i < step) {
                line.classList.remove('bg-gray-300');
                line.classList.add('bg-[#1a602d]');
            }
        } else {
            indicator.classList.remove('bg-[#1a602d]', 'text-white', 'border-[#1a602d]');
            indicator.classList.add('bg-white', 'text-gray-500', 'border-gray-300');
            if (line) {
                line.classList.remove('bg-[#1a602d]');
                line.classList.add('bg-gray-300');
            }
        }
    }
}

function updateStepTitle(step) {
    const stepTitles = {
        1: {
            title: '¡Bienvenido!',
            subtitle: 'Vamos a comenzar con tu registro. Completa tus datos personales.'
        },
        2: {
            title: '¡Hola!',
            subtitle: 'Ingresa tu número de licencia si tienes una y los 4 últimos números del Seguro Social.'
        },
        3: {
            title: '¡Ya casi terminamos!',
            subtitle: 'Por favor, completa tu información de contacto y características personales.'
        },
        4: {
            title: '¡Un último paso!',
            subtitle: 'Crea tus credenciales para acceder a tu cuenta de Tu Licencia.'
        }
    };
    
    const titleContainer = document.getElementById('stepTitle');
    const stepInfo = stepTitles[step];
    
    titleContainer.innerHTML = `
        <h1 class="text-3xl md:text-5xl font-bold text-[#1a602d] mb-3 md:mb-4">${stepInfo.title}</h1>
        <p class="text-base md:text-lg text-[#224a33]">${stepInfo.subtitle}</p>
    `;
}

// Input formatting and validation
document.addEventListener('DOMContentLoaded', function() {
    // Phone number formatter
    const phoneInput = document.getElementById('phoneNumber');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length === 0) {
                e.target.value = '';
            } else if (value.length <= 3) {
                e.target.value = `(${value}`;
            } else if (value.length <= 6) {
                e.target.value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
            } else {
                e.target.value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
            }
        });
    }
    
    // Password visibility toggle
    const togglePassword = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eye-icon');
    const eyeOffIcon = document.getElementById('eye-off-icon');
    
    if (togglePassword && passwordInput && eyeIcon && eyeOffIcon) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Toggle icons
            eyeIcon.classList.toggle('hidden');
            eyeOffIcon.classList.toggle('hidden');
        });
    }
    
    // Input normalizers
    const alphabeticInputs = document.querySelectorAll('.alphabetic-only');
    alphabeticInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, '');
        });
    });
    
    const numericInputs = document.querySelectorAll('.numeric-only');
    numericInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
        });
    });
    
    const usernameInput = document.getElementById('username');
    if (usernameInput) {
        usernameInput.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/[^a-zA-Z0-9_]/g, '');
        });
    }
});
</script>

<?php include 'includes/footer.php'; ?> 