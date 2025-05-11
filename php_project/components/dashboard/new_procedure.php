<?php
// Start the session if not already started
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Define routes for each procedure based on the tr_id
$procedureRoutes = [
    1 => '/pages/license-renew-form.php',
    2 => '/procedures/duplicate-license',
    3 => '/procedures/reciprocity-license',
    4 => '/procedures/vehicle-transfer',
    5 => '/procedures/title-management',
    6 => '/procedures/tablillas-incapacidad',
    7 => '/procedures/liens',
    8 => '/procedures/drivers-record'
];

// Check if form was submitted and prepare JavaScript redirect
$redirectScript = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $selectedProcedure = $_POST['selected_procedure'] ?? '';
    if ($selectedProcedure && isset($procedureRoutes[$selectedProcedure])) {
        $targetRoute = $procedureRoutes[$selectedProcedure];
        $redirectScript = "<script>window.location.href = '$targetRoute';</script>";
    }
}

// Mock data for procedures - simulating the useProcedures hook data
$procedures = [
    // License Procedures
    [
        'tr_id' => 1,
        'name' => 'License Renewal',
        'type' => 'license'
    ],
    [
        'tr_id' => 2,
        'name' => 'Duplicate License',
        'type' => 'license'
    ],
    [
        'tr_id' => 3,
        'name' => 'Reciprocity License',
        'type' => 'license'
    ],
    // Vehicle Procedures
    [
        'tr_id' => 4,
        'name' => 'Vehicle Transfer',
        'type' => 'vehicle'
    ],
    [
        'tr_id' => 5,
        'name' => 'Title Management',
        'type' => 'vehicle'
    ],
    [
        'tr_id' => 6,
        'name' => 'Tablillas Incapacidad',
        'type' => 'vehicle'
    ],
    [
        'tr_id' => 7,
        'name' => 'Liens',
        'type' => 'vehicle'
    ],
    [
        'tr_id' => 8,
        'name' => 'Drivers Record',
        'type' => 'vehicle'
    ]
];

// Group procedures by type
$licenseOptions = array_filter($procedures, function($proc) {
    return $proc['type'] === 'license';
});

$vehicleOptions = array_filter($procedures, function($proc) {
    return $proc['type'] === 'vehicle';
});

// Output the redirect script if needed
echo $redirectScript;
?>

<div class="p-6 bg-gradient-to-br from-[#e8f8ee] via-white to-[#e8f8ee] rounded-lg shadow-lg w-full">
    <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-semibold text-[#157a3c]">Select a procedure</h2>
        <a href="/procedures" class="inline-flex items-center px-4 py-2 border border-[#157a3c] text-[#157a3c] rounded-lg hover:bg-[#e8f8ee] transition-colors">
            Browse All Procedures
        </a>
    </div>

    <form method="POST" id="procedureForm">
        <div class="grid md:grid-cols-2 gap-6">
            <!-- License Procedures -->
            <div class="bg-white p-6 rounded-lg shadow-sm">
                <div class="flex items-center justify-center mb-4">
                    <div class="w-[170px] h-[170px]">
                        <dotlottie-player
                            src="../../json/chicolentes.json"
                            background="transparent"
                            speed="1"
                            class="w-full h-full"
                            loop
                            autoplay
                        ></dotlottie-player>
                    </div>
                </div>
                <h3 class="font-medium text-gray-800 mb-3">License Procedures</h3>
                <?php if (!empty($licenseOptions)): ?>
                    <div class="space-y-2">
                        <?php foreach ($licenseOptions as $option): ?>
                            <label class="flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-50">
                                <input type="radio" 
                                       name="selected_procedure" 
                                       value="<?php echo $option['tr_id']; ?>"
                                       class="form-radio h-4 w-4 text-[#157a3c] border-gray-300 focus:ring-[#157a3c]"
                                       onchange="handleProcedureSelection(this)">
                                <span class="ml-3"><?php echo $option['name']; ?></span>
                            </label>
                        <?php endforeach; ?>
                    </div>
                <?php else: ?>
                    <p class="text-gray-500 text-sm">No license procedures available</p>
                <?php endif; ?>
            </div>

            <!-- Vehicle Procedures -->
            <div class="bg-white p-6 rounded-lg shadow-sm">
                <div class="flex items-center justify-center mb-4">
                    <div class="w-[170px] h-[170px]">
                        <dotlottie-player
                            src="../../json/carrito.json"
                            background="transparent"
                            speed="1"
                            class="w-full h-full"
                            loop
                            autoplay
                        ></dotlottie-player>
                    </div>
                </div>
                <h3 class="font-medium text-gray-800 mb-3">Vehicle Procedures</h3>
                <?php if (!empty($vehicleOptions)): ?>
                    <div class="space-y-2">
                        <?php foreach ($vehicleOptions as $option): ?>
                            <label class="flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-50">
                                <input type="radio" 
                                       name="selected_procedure" 
                                       value="<?php echo $option['tr_id']; ?>"
                                       class="form-radio h-4 w-4 text-[#157a3c] border-gray-300 focus:ring-[#157a3c]"
                                       onchange="handleProcedureSelection(this)">
                                <span class="ml-3"><?php echo $option['name']; ?></span>
                            </label>
                        <?php endforeach; ?>
                    </div>
                <?php else: ?>
                    <p class="text-gray-500 text-sm">No vehicle procedures available</p>
                <?php endif; ?>
            </div>
        </div>

        <button type="submit" 
                id="startProcedureBtn"
                disabled
                class="mt-6 mx-auto block px-6 py-2 bg-[#157a3c] text-white rounded-lg hover:bg-[#1a602d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            Start procedure
        </button>
    </form>
</div>

<script>
function handleProcedureSelection(radio) {
    const startButton = document.getElementById('startProcedureBtn');
    startButton.disabled = !radio.checked;
}

// Optional: Add loading animation
document.getElementById('procedureForm').addEventListener('submit', function() {
    const startButton = document.getElementById('startProcedureBtn');
    startButton.innerHTML = `
        <div class="flex items-center">
            <div class="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
            Processing...
        </div>
    `;
    startButton.disabled = true;
});
</script> 