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
        include_once 'pages/procedures/license-renewal.php';
        break;
    case 'license-renewal-form':
        include_once 'pages/procedures/license-renew-form.php';
        break;
    case 'license-renewal-upload':
        include_once 'pages/procedures/license-renew-upload.php';
        break;
    case 'record-choferil':
        include_once 'pages/procedures/record-choferil.php';
        break;
    case 'record-choferil-signature':
        include_once 'pages/procedures/record-choferil-signature.php';
        break;
    case 'record-choferil-success':
        include_once 'pages/procedures/record-choferil-success.php';
        break;
    case 'duplicado-titulo':
        include_once 'pages/procedures/duplicado-titulo.php';
        break;
    case 'duplicado-titulo-signature':
        include_once 'pages/procedures/duplicado-titulo-signature.php';
        break;
    case 'duplicado-titulo-upload':
        include_once 'pages/procedures/duplicado-titulo-upload.php';
        break;
    case 'duplicado-titulo-success':
        include_once 'pages/procedures/duplicado-titulo-success.php';
        break;
    case 'duplicado-titulo-confirmacion':
        include_once 'pages/procedures/duplicado-titulo-confirmacion.php';
        break;
    case 'tablillas-incapacidad':
        include_once 'pages/procedures/tablillas-incapacidad.php';
        break;
    case 'tablillas-incapacidad-confirmacion':
        include_once 'pages/procedures/tablillas-incapacidad-confirmacion.php';
        break;
    case 'tablillas-incapacidad-upload':
        include_once 'pages/procedures/tablillas-incapacidad-upload.php';
        break;
    case 'tablillas-incapacidad-success':
        include_once 'pages/procedures/tablillas-incapacidad-success.php';
        break;
    case 'licencia-reciprocidad':
        include_once 'pages/procedures/licencia-reciprocidad.php';
        break;
    case 'licencia-reciprocidad-confirmacion':
        include_once 'pages/procedures/licencia-reciprocidad-confirmacion.php';
        break;
    case 'licencia-reciprocidad-upload':
        include_once 'pages/procedures/licencia-reciprocidad-upload.php';
        break;
    case 'licencia-reciprocidad-selfie':
        include_once 'pages/procedures/licencia-reciprocidad-selfie.php';
        break;
    case 'licencia-reciprocidad-firma':
        include_once 'pages/procedures/licencia-reciprocidad-firma.php';
        break;
    case 'licencia-reciprocidad-documentos':
        include_once 'pages/procedures/licencia-reciprocidad-documentos.php';
        break;
    case 'licencia-reciprocidad-documentos-final':
        include_once 'pages/procedures/licencia-reciprocidad-documentos-final.php';
        break;
    case 'licencia-reciprocidad-success':
        include_once 'pages/procedures/licencia-reciprocidad-success.php';
        break;
    case 'vehicle-transfer':
        include_once 'pages/procedures/vehicle-transfer.php';
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