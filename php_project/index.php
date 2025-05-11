<?php
// Main entry point for the application
$page = isset($_GET['page']) ? $_GET['page'] : 'home';

// Include header
include_once 'includes/header.php';

// Display logout success message if applicable
if (isset($_GET['logout']) && $_GET['logout'] === 'success') {
    echo '<div class="container mx-auto px-4 py-3">
            <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                Has cerrado sesión exitosamente.
            </div>
          </div>';
}

// Route to the correct page
switch ($page) {
    case 'home':
        include_once 'pages/home.php';
        break;
    case 'register':
        include_once 'pages/register.php';
        break;
    case 'login':
        include_once 'pages/login.php';
        break;
    case 'privacy-policy':
        include_once 'pages/privacy-policy.php';
        break;
    case 'terms-conditions':
        include_once 'pages/terms-condition.php';
        break;
    case 'example':
        include_once 'pages/example-page.php';
        break;
    case 'user-dashboard':
        include_once 'pages/user-dashboard.php';
        break;
    case 'twostepauth':
        include_once 'pages/two-step-authentication.php';
        break;
    case 'procedures':
        include_once 'pages/procedures.php';
        break;
    case 'license-renewal':
        include_once 'pages/license-renewal.php';
        break;
    case 'license-renewal-form':
        include_once 'pages/license-renewal-form.php';
        break;
    case 'license-renewal-upload':
        include_once 'pages/license-renewal-upload.php';
        break;
    case 'vehicle-transfer':
        include_once 'pages/vehicle-transfer.php';
        break;
    case 'how-it-works':
        include_once 'pages/how-it-works.php';
        break;
    case 'contact':
        include_once 'pages/contact.php';
        break;
    default:
        include_once 'pages/home.php';
        break;
}

// Include footer
include_once 'includes/footer.php';
?> 