<?php
// Start session if not already started
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Check if user is logged in
if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {
    header('Location: /login.php');
    exit();
}

// Get user data from session
$userData = null;
if (isset($_SESSION['user'])) {
    try {
        $userData = json_decode($_SESSION['user'], true);
    } catch (Exception $e) {
        error_log('Error parsing user data: ' . $e->getMessage());
    }
}

// Function to get formatted user name
function getUserName($userData) {
    if (!$userData) return 'Usuario';
    
    $userItem = $userData['item'] ?? [];
    $firstName = $userItem['cl_nombre'] ?? '';
    $lastName = $userItem['cl_primerApellido'] ?? '';
    $secondLastName = $userItem['cl_segundoApellido'] ?? '';
    
    if ($firstName && ($lastName || $secondLastName)) {
        return trim("$firstName $lastName $secondLastName");
    } elseif ($firstName) {
        return $firstName;
    } elseif (isset($userItem['cl_nombreUsuario'])) {
        return $userItem['cl_nombreUsuario'];
    }
    return 'Usuario';
}

// Function to check if a section is active
function isActive($section) {
    $currentPage = $_GET['section'] ?? 'procedures';
    return $currentPage === $section ? 'bg-[#1a602d] text-white' : 'bg-white text-[#1a602d] hover:bg-[#e8f8ee]';
}

$userName = getUserName($userData);
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
    <link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
/>
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.js"></script>
    <script src="https://unpkg.com/@lottiefiles/lottie-interactivity@latest/dist/lottie-interactivity.min.js"></script>
</head>
<body class="font-poppins bg-gray-50">

<?php include dirname(__FILE__) . '/../components/header_dashboard.php'; ?>

<div class="min-h-screen">
    <div class="container mx-auto px-4">
        <div class="py-4 lg:py-8 flex flex-col md:flex-row gap-4 lg:gap-8">
            <!-- Left Column - Navigation Menu -->
            <div id="sideMenu" class="w-full md:w-auto lg:w-90 md:flex-shrink-0 p-4 lg:p-6 rounded-xl shadow-lg bg-gradient-to-br from-[#e8f8ee] via-white to-[#e8f8ee] border border-[#e8f8ee] md:sticky md:top-4">
                <!-- User Profile Section -->
                <div class="flex flex-col items-center space-y-4 mb-6 lg:mb-8">
                    <div class="relative group">
                        <div class="w-14 h-14 lg:w-16 lg:h-16 rounded-full overflow-hidden">
                            <img
                                src="../assets/img/avatar.jpg"
                                alt="User Avatar"
                                id="userAvatar"
                                class="w-full h-full object-cover"
                            />
                        </div>
                        <label class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                            <input
                                type="file"
                                accept="image/*"
                                id="avatarInput"
                                class="hidden"
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 lg:h-6 lg:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </label>
                    </div>
                    <div>
                        <h1 class="text-lg font-bold text-[#1a602d]">Hola, <?php echo htmlspecialchars($userName); ?></h1>
                    </div>
                </div>

                <!-- Navigation Menu -->
                <div class="flex flex-col space-y-2">
                    <a href="user-dashboard.php?section=procedures" class="block">
                        <button class="w-full py-2 lg:py-3 flex items-center justify-start px-3 lg:px-4 cursor-pointer text-sm lg:text-base rounded-full border border-[#1a602d] transition-colors <?php echo isActive('procedures'); ?>">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 lg:h-6 lg:w-6 mr-2 lg:mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            My Procedures
                        </button>
                    </a>

                    <a href="user-dashboard.php?section=profile" class="block">
                        <button class="w-full py-2 lg:py-3 flex items-center justify-start px-3 lg:px-4 cursor-pointer text-sm lg:text-base rounded-full border border-[#1a602d] transition-colors <?php echo isActive('profile'); ?>">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 lg:h-6 lg:w-6 mr-2 lg:mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Your Profile
                        </button>
                    </a>

                    <a href="user-dashboard.php?section=password" class="block">
                        <button class="w-full py-2 lg:py-3 flex items-center justify-start px-3 lg:px-4 cursor-pointer text-sm lg:text-base rounded-full border border-[#1a602d] transition-colors <?php echo isActive('password'); ?>">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 lg:h-6 lg:w-6 mr-2 lg:mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                            </svg>
                            Update Password
                        </button>
                    </a>

                    <a href="user-dashboard.php?section=new-procedure" class="block">
                        <button class="w-full py-2 lg:py-3 flex items-center justify-start px-3 lg:px-4 cursor-pointer text-sm lg:text-base rounded-full border border-[#1a602d] transition-colors <?php echo isActive('new-procedure'); ?>">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 lg:h-6 lg:w-6 mr-2 lg:mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                            </svg>
                            New Procedure
                        </button>
                    </a>

                    <a href="user-dashboard.php?section=payments" class="block">
                        <button class="w-full py-2 lg:py-3 flex items-center justify-start px-3 lg:px-4 cursor-pointer text-sm lg:text-base rounded-full border border-[#1a602d] transition-colors <?php echo isActive('payments'); ?>">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 lg:h-6 lg:w-6 mr-2 lg:mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                            My Payments
                        </button>
                    </a>

                    <a href="../logout.php" class="block">
                        <button class="w-full py-2 lg:py-3 flex items-center justify-start px-3 lg:px-4 cursor-pointer text-sm lg:text-base rounded-full border border-[#1a602d] transition-colors bg-white text-[#1a602d] hover:bg-[#e8f8ee]">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 lg:h-6 lg:w-6 mr-2 lg:mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Sign Out
                        </button>
                    </a>
                </div>
            </div>

            <!-- Right Column - Main Content -->
            
                <?php
                $currentPage = $_GET['section'] ?? 'procedures';
                $componentFile = match($currentPage) {
                    'procedures' => 'procedures.php',
                    'profile' => 'profile.php',
                    'password' => 'password.php',
                    'new-procedure' => 'new_procedure.php',
                    'payments' => 'payments.php',
                    default => 'procedures.php'
                };
                
                $componentPath = dirname(__FILE__) . "/../components/dashboard/{$componentFile}";
                if (file_exists($componentPath)) {
                    include $componentPath;
                } else {
                    echo '<div class="text-center text-red-600">Component not found</div>';
                }
                ?>
            
        </div>
    </div>
</div>

<script>
// Handle avatar change
document.getElementById('avatarInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('userAvatar').src = e.target.result;
            
            // Here you could add AJAX call to upload the image to server
            // const formData = new FormData();
            // formData.append('avatar', file);
            // fetch('upload_avatar.php', {
            //     method: 'POST',
            //     body: formData
            // });
        };
        reader.readAsDataURL(file);
    }
});

// Handle mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.getElementById('menu-toggle');
    const sideMenu = document.getElementById('sideMenu');
    
    if (menuButton && sideMenu) {
        menuButton.addEventListener('click', function() {
            sideMenu.classList.toggle('hidden');
        });
    }

    // Prevent form submission on button clicks in navigation
    document.querySelectorAll('#sideMenu button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const link = this.closest('a');
            if (link) {
                window.location.href = link.href;
            }
        });
    });
});
</script>

</body>
</html> 