<?php
session_start();

// Initialize form data from session or set defaults
$formData = $_SESSION['license_form_data'] ?? [
    // License type
    'licenseType' => 'driver',
    'licenseNumber' => '',
    'licenseCategory' => 'driver',
    
    // Personal identification
    'idType' => 'social',
    'idNumber' => '',
    
    // Legal status
    'legalStatus' => 'permanent',
    
    // Personal info
    'gender' => 'male',
    'organDonor' => false,
    'bloodType' => '',
    
    // Physical characteristics
    'height' => ['feet' => '5', 'inches' => '6'],
    'weight' => '',
    'complexion' => '',
    'hairColor' => '',
    'eyeColor' => '',
    
    // Address
    'residentialAddress' => [
        'urbanization' => '',
        'streetNumber' => '',
        'town' => '',
        'zipCode' => ''
    ],
    'mailingAddressSameAsResidential' => true,
    
    // Legal questions
    'licenseSuspended' => false,
    'suspensionReason' => '',
    'institutionalized' => false,
    'convictedDUI' => false,
    'convictionDateDUI' => '',
    'convictedNarcotics' => false,
    'convictionDateNarcotics' => '',
    'supportObligation' => false,
    'medicalDebt' => false
];

// Get current step from session or default to 1
$step = $_SESSION['license_form_step'] ?? 1;

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['action'])) {
        if ($_POST['action'] === 'next') {
            $step++;
        } elseif ($_POST['action'] === 'prev') {
            $step--;
        } elseif ($_POST['action'] === 'submit') {
            $step = 11; // Go to thank you page
        }
    }
    
    // Update form data in session
    $formData = array_merge($formData, $_POST);
    $_SESSION['license_form_data'] = $formData;
    $_SESSION['license_form_step'] = $step;
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
    $html .= "<label for=\"{$id}\" class=\"block text-gray-700 font-medium mb-2\">{$label}</label>";
    
    if ($type === 'select') {
        $html .= "<select id=\"{$id}\" name=\"{$name}\" class=\"{$baseClasses}\"" . ($required ? ' required' : '') . ">";
        foreach ($options as $option) {
            $selected = $value === $option['value'] ? ' selected' : '';
            $html .= "<option value=\"{$option['value']}\"{$selected}>{$option['label']}</option>";
        }
        $html .= "</select>";
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
$title = "License Renewal";
include_once '../components/header_procedure.php';

// Main container start
?>
<!DOCTYPE html>
<html lang="en" class="font-poppins">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Login - Tu Licencia</title>
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
                                <h2 class="text-4xl font-bold mt-6 text-[#157a3c] text-center">¡Hello <?php echo getUserName(); ?>!</h2>
                                <p class="text-lg text-center mt-2">Let's start by registering your account</p>
                            <?php elseif ($step === 11): ?>
                                <h2 class="text-4xl font-bold mb-4 text-[#157a3c]">Thank you!</h2>
                                <p class="text-xl text-gray-700 text-center max-w-2xl mb-6">
                                    Your information has been received and your request has been registered. 
                                    You will receive a confirmation email.
                                </p>
                            <?php else: ?>
                                <h2 class="text-4xl font-bold mt-6 text-[#157a3c] text-center">We continue</h2>
                            <?php endif; ?>
                        </div>

                        <!-- Right Content -->
                        <div>
                            <?php if ($step === 1): ?>
                                <!-- Step 1: License Type Selection -->
                                <div class="space-y-6">
                                    <div>
                                        <h3 class="text-lg font-medium mb-4">What Type of License Do You Need?</h3>
                                        <?php
                                        echo renderRadioGroup('licenseType', [
                                            ['value' => 'driver', 'label' => 'Driver license'],
                                            ['value' => 'realid', 'label' => 'Real ID Driver\'s License']
                                        ], $formData['licenseType']);
                                        ?>
                                    </div>

                                    <?php
                                    echo renderInputForm(
                                        'licenseNumber',
                                        'licenseNumber',
                                        'License number',
                                        'text',
                                        $formData['licenseNumber'],
                                        '3281192'
                                    );
                                    ?>

                                    <div>
                                        <h3 class="text-lg font-medium mb-4">What category does it belong to?</h3>
                                        <?php
                                        echo renderRadioGroup('licenseCategory', [
                                            ['value' => 'driver', 'label' => 'Driver'],
                                            ['value' => 'chofer', 'label' => 'Chofer']
                                        ], $formData['licenseCategory']);
                                        ?>
                                    </div>
                                </div>

                            <?php elseif ($step === 2): ?>
                                <!-- Step 2: ID Type Selection -->
                                <div class="space-y-6">
                                    <div>
                                        <h3 class="text-lg font-medium mb-4">What type of ID would you like to use?</h3>
                                        <?php
                                        echo renderRadioGroup('idType', [
                                            ['value' => 'social', 'label' => 'Social Security Number'],
                                            ['value' => 'passport', 'label' => 'Passport Number']
                                        ], $formData['idType']);
                                        ?>
                                    </div>

                                    <?php
                                    echo renderInputForm(
                                        'idNumber',
                                        'idNumber',
                                        $formData['idType'] === 'social' ? 'Social Security Number' : 'Passport Number',
                                        'text',
                                        $formData['idNumber'],
                                        $formData['idType'] === 'social' ? '123-45-6789' : 'AB1234567'
                                    );
                                    ?>
                                </div>

                            <?php elseif ($step === 3): ?>
                                <!-- Step 3: Legal Status -->
                                <div class="space-y-6">
                                    <?php
                                    echo renderInputForm(
                                        'legalStatus',
                                        'legalStatus',
                                        'Indicate the status of your legal presence in Puerto Rico',
                                        'select',
                                        $formData['legalStatus'],
                                        '',
                                        true,
                                        [
                                            ['value' => 'permanent', 'label' => 'Permanent Resident'],
                                            ['value' => 'citizen', 'label' => 'US Citizen'],
                                            ['value' => 'temporary', 'label' => 'Temporary Resident'],
                                            ['value' => 'other', 'label' => 'Other']
                                        ]
                                    );
                                    ?>
                                    <p class="text-sm text-gray-500 -mt-4">(Required by CESCO)</p>
                                </div>

                            <?php elseif ($step === 4): ?>
                                <!-- Step 4: Gender and Health Information -->
                                <div class="space-y-6">
                                    <div>
                                        <h3 class="text-lg font-medium mb-4">Gender</h3>
                                        <?php
                                        echo renderRadioGroup('gender', [
                                            ['value' => 'male', 'label' => 'Male'],
                                            ['value' => 'female', 'label' => 'Female']
                                        ], $formData['gender']);
                                        ?>
                                    </div>

                                    <div>
                                        <h3 class="text-lg font-medium mb-4">Do I want to be an Organ Donor?</h3>
                                        <?php
                                        echo renderRadioGroup('organDonor', [
                                            ['value' => 'true', 'label' => 'Yes'],
                                            ['value' => 'false', 'label' => 'No']
                                        ], $formData['organDonor'] ? 'true' : 'false');
                                        ?>
                                    </div>

                                    <?php
                                    echo renderInputForm(
                                        'bloodType',
                                        'bloodType',
                                        'Blood type',
                                        'select',
                                        $formData['bloodType'],
                                        '',
                                        false,
                                        [
                                            ['value' => '', 'label' => 'Select blood type'],
                                            ['value' => 'A+', 'label' => 'A+'],
                                            ['value' => 'A-', 'label' => 'A-'],
                                            ['value' => 'B+', 'label' => 'B+'],
                                            ['value' => 'B-', 'label' => 'B-'],
                                            ['value' => 'AB+', 'label' => 'AB+'],
                                            ['value' => 'AB-', 'label' => 'AB-'],
                                            ['value' => 'O+', 'label' => 'O+'],
                                            ['value' => 'O-', 'label' => 'O-']
                                        ]
                                    );
                                    ?>
                                </div>

                            <?php elseif ($step === 5): ?>
                                <!-- Step 5: Physical Characteristics -->
                                <div class="space-y-6">
                                    <div class="flex space-x-4">
                                        <?php
                                        $feetOptions = array_map(function($num) {
                                            return ['value' => (string)$num, 'label' => (string)$num];
                                        }, range(4, 7));

                                        $inchesOptions = array_map(function($num) {
                                            return ['value' => (string)$num, 'label' => (string)$num];
                                        }, range(0, 11));

                                        echo renderInputForm(
                                            'heightFeet',
                                            'height[feet]',
                                            'Stature (Feet)',
                                            'select',
                                            $formData['height']['feet'],
                                            '',
                                            true,
                                            $feetOptions,
                                            'flex-1'
                                        );

                                        echo renderInputForm(
                                            'heightInches',
                                            'height[inches]',
                                            'Stature (Inches)',
                                            'select',
                                            $formData['height']['inches'],
                                            '',
                                            true,
                                            $inchesOptions,
                                            'flex-1'
                                        );
                                        ?>
                                    </div>

                                    <div class="flex space-x-4">
                                        <?php
                                        echo renderInputForm(
                                            'weight',
                                            'weight',
                                            'Weight (Libras)',
                                            'number',
                                            $formData['weight'],
                                            '457',
                                            true,
                                            [],
                                            'flex-1'
                                        );

                                        echo renderInputForm(
                                            'complexion',
                                            'complexion',
                                            'Complexion',
                                            'select',
                                            $formData['complexion'],
                                            '',
                                            true,
                                            [
                                                ['value' => '', 'label' => 'Select'],
                                                ['value' => 'White', 'label' => 'White'],
                                                ['value' => 'Black', 'label' => 'Black'],
                                                ['value' => 'Hispanic', 'label' => 'Hispanic'],
                                                ['value' => 'Asian', 'label' => 'Asian'],
                                                ['value' => 'Other', 'label' => 'Other']
                                            ],
                                            'flex-1'
                                        );
                                        ?>
                                    </div>

                                    <div class="flex space-x-4">
                                        <?php
                                        echo renderInputForm(
                                            'hairColor',
                                            'hairColor',
                                            'Hair color',
                                            'select',
                                            $formData['hairColor'],
                                            '',
                                            true,
                                            [
                                                ['value' => '', 'label' => 'Select'],
                                                ['value' => 'Black', 'label' => 'Black'],
                                                ['value' => 'Brown', 'label' => 'Brown'],
                                                ['value' => 'Blonde', 'label' => 'Blonde'],
                                                ['value' => 'Red', 'label' => 'Red'],
                                                ['value' => 'Gray', 'label' => 'Gray'],
                                                ['value' => 'White', 'label' => 'White']
                                            ],
                                            'flex-1'
                                        );

                                        echo renderInputForm(
                                            'eyeColor',
                                            'eyeColor',
                                            'Eye color',
                                            'select',
                                            $formData['eyeColor'],
                                            '',
                                            true,
                                            [
                                                ['value' => '', 'label' => 'Select'],
                                                ['value' => 'Brown', 'label' => 'Brown'],
                                                ['value' => 'Blue', 'label' => 'Blue'],
                                                ['value' => 'Green', 'label' => 'Green'],
                                                ['value' => 'Hazel', 'label' => 'Hazel'],
                                                ['value' => 'Gray', 'label' => 'Gray'],
                                                ['value' => 'Black', 'label' => 'Black']
                                            ],
                                            'flex-1'
                                        );
                                        ?>
                                    </div>
                                </div>

                            <?php elseif ($step === 6): ?>
                                <!-- Step 6: Address Information -->
                                <div class="space-y-6">
                                    <?php
                                    echo renderInputForm(
                                        'residentialAddress_urbanization',
                                        'residentialAddress[urbanization]',
                                        'Urbanization/Development',
                                        'text',
                                        $formData['residentialAddress']['urbanization'],
                                        'e.g. Villa Andalucía'
                                    );

                                    echo renderInputForm(
                                        'residentialAddress_streetNumber',
                                        'residentialAddress[streetNumber]',
                                        'Street Number and Name',
                                        'text',
                                        $formData['residentialAddress']['streetNumber'],
                                        'e.g. 123 Main St'
                                    );

                                    echo renderInputForm(
                                        'residentialAddress_town',
                                        'residentialAddress[town]',
                                        'Town/City',
                                        'text',
                                        $formData['residentialAddress']['town'],
                                        'e.g. San Juan'
                                    );

                                    echo renderInputForm(
                                        'residentialAddress_zipCode',
                                        'residentialAddress[zipCode]',
                                        'Zip Code',
                                        'text',
                                        $formData['residentialAddress']['zipCode'],
                                        'e.g. 00926'
                                    );
                                    ?>
                                </div>

                            <?php elseif ($step === 7): ?>
                                <!-- Step 7: Mailing Address -->
                                <div class="space-y-6">
                                    <div>
                                        <h3 class="text-lg font-medium mb-4">
                                            Is your mailing address the same as your residential address?
                                        </h3>
                                        <?php
                                        echo renderRadioGroup('mailingAddressSameAsResidential', [
                                            ['value' => 'true', 'label' => 'Yes'],
                                            ['value' => 'false', 'label' => 'No']
                                        ], $formData['mailingAddressSameAsResidential'] ? 'true' : 'false');
                                        ?>
                                    </div>

                                    <div>
                                        <p class="text-md text-gray-700">
                                            We will continue with the data of your previously registered 
                                            <span class="font-semibold">residencial address</span> 😊
                                        </p>
                                    </div>
                                </div>

                            <?php elseif ($step === 8): ?>
                                <!-- Step 8: Legal Questions Part 1 -->
                                <div class="space-y-6">
                                    <div>
                                        <h3 class="text-lg font-medium mb-4">
                                            Has your license been suspended in Puerto Rico?
                                        </h3>
                                        <?php
                                        echo renderRadioGroup('licenseSuspended', [
                                            ['value' => 'true', 'label' => 'Yes'],
                                            ['value' => 'false', 'label' => 'No']
                                        ], $formData['licenseSuspended'] ? 'true' : 'false');
                                        ?>
                                    </div>

                                    <?php if ($formData['licenseSuspended']): ?>
                                        <?php
                                        echo renderInputForm(
                                            'suspensionReason',
                                            'suspensionReason',
                                            'Reason',
                                            'select',
                                            $formData['suspensionReason'],
                                            '',
                                            true,
                                            [
                                                ['value' => '', 'label' => 'Select reason'],
                                                ['value' => 'Point system', 'label' => 'Point system'],
                                                ['value' => 'DUI', 'label' => 'DUI'],
                                                ['value' => 'Unpaid tickets', 'label' => 'Unpaid tickets'],
                                                ['value' => 'Other', 'label' => 'Other']
                                            ]
                                        );
                                        ?>
                                    <?php endif; ?>

                                    <div>
                                        <h3 class="text-lg font-medium mb-4">
                                            Have you been institutionalized for mental disorders?
                                        </h3>
                                        <?php
                                        echo renderRadioGroup('institutionalized', [
                                            ['value' => 'true', 'label' => 'Yes'],
                                            ['value' => 'false', 'label' => 'No']
                                        ], $formData['institutionalized'] ? 'true' : 'false');
                                        ?>
                                    </div>
                                </div>

                            <?php elseif ($step === 9): ?>
                                <!-- Step 9: Legal Questions Part 2 -->
                                <div class="space-y-6">
                                    <div>
                                        <h3 class="text-lg font-medium mb-4">
                                            Have you been convicted of using intoxicating beverages?
                                        </h3>
                                        <?php
                                        echo renderRadioGroup('convictedDUI', [
                                            ['value' => 'true', 'label' => 'Yes'],
                                            ['value' => 'false', 'label' => 'No']
                                        ], $formData['convictedDUI'] ? 'true' : 'false');
                                        ?>
                                    </div>

                                    <?php if ($formData['convictedDUI']): ?>
                                        <?php
                                        echo renderInputForm(
                                            'convictionDateDUI',
                                            'convictionDateDUI',
                                            'Date',
                                            'date',
                                            $formData['convictionDateDUI']
                                        );
                                        ?>
                                    <?php endif; ?>
                                </div>

                            <?php elseif ($step === 10): ?>
                                <!-- Step 10: Final Questions -->
                                <div class="space-y-6">
                                    <div>
                                        <h3 class="text-lg font-medium mb-4">
                                            Have you been convicted under the Narcotics Act?
                                        </h3>
                                        <?php
                                        echo renderRadioGroup('convictedNarcotics', [
                                            ['value' => 'true', 'label' => 'Yes'],
                                            ['value' => 'false', 'label' => 'No']
                                        ], $formData['convictedNarcotics'] ? 'true' : 'false');
                                        ?>
                                    </div>

                                    <?php if ($formData['convictedNarcotics']): ?>
                                        <?php
                                        echo renderInputForm(
                                            'convictionDateNarcotics',
                                            'convictionDateNarcotics',
                                            'Date',
                                            'date',
                                            $formData['convictionDateNarcotics']
                                        );
                                        ?>
                                    <?php endif; ?>
                                </div>

                            <?php elseif ($step === 11): ?>
                                <!-- Step 11: Thank You -->
                                <div class="text-center">
                                    <p class="text-xl text-gray-700 text-center max-w-2xl mb-6">
                                        The next step is to upload your documents and photos. It's quick and easy!
                                    </p>
                                    
                                    <div class="flex flex-col items-center gap-4">
                                        <a href="license-renew-upload.php"
                                           class="inline-block px-8 py-3 bg-[#157a3c] text-white rounded-full hover:bg-[#1a602d] transition-colors">
                                            Let's start
                                        </a>
                                        
                                        <a href="/dashboard"
                                           class="text-[#157a3c] underline">
                                            I'm tired, I'd rather do it later
                                        </a>
                                    </div>
                                </div>
                            <?php endif; ?>
                        </div>
                    </div>

                    <?php if ($step < 11): ?>
                        <!-- Navigation Buttons -->
                        <div class="flex flex-col-reverse md:flex-row md:justify-between mt-8 gap-4">
                            <?php if ($step > 1): ?>
                                <button type="submit" 
                                        name="action" 
                                        value="prev"
                                        class="px-6 py-2 bg-white text-[#1a602d] border border-[#1a602d] rounded-full hover:bg-[#e8f8ee] transition-colors">
                                    Previous
                                </button>
                            <?php else: ?>
                                <div></div>
                            <?php endif; ?>

                            <button type="submit" 
                                    name="action" 
                                    value="<?php echo $step === 10 ? 'submit' : 'next'; ?>"
                                    class="px-6 py-2 bg-[#1a602d] text-white rounded-full hover:bg-[#144823] transition-colors">
                                <?php echo $step === 10 ? 'Submit' : 'Next'; ?>
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