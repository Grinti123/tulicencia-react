<?php
// Start session if not already started
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Initialize error variable
$error = null;

// Check login submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';
    
    // Hardcoded credentials
    $valid_username = "admin";
    $valid_password = "admin123";
    
    if ($username === $valid_username && $password === $valid_password) {
        $_SESSION['logged_in'] = true;
        $_SESSION['username'] = $username;
        header('Location: ../index.php?page=user-dashboard');
        exit();
    } else {
        $_SESSION['login_error'] = 'invalid';
        header('Location: ../index.php?page=login');
        exit();
    }
}

// If someone tries to access this file directly
header('Location: ../index.php?page=login');
exit();
?> 