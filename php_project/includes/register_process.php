<?php
// Start session if not already started
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Get form data
    $first_name = isset($_POST['first_name']) ? trim($_POST['first_name']) : '';
    $last_name = isset($_POST['last_name']) ? trim($_POST['last_name']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
    $password = isset($_POST['password']) ? $_POST['password'] : '';
    $confirm_password = isset($_POST['confirm_password']) ? $_POST['confirm_password'] : '';
    $terms = isset($_POST['terms']) ? true : false;
    
    // Basic validation
    if (empty($first_name) || empty($last_name) || empty($email) || empty($password) || empty($confirm_password)) {
        header("Location: ../index.php?page=register&error=empty");
        exit();
    }
    
    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        header("Location: ../index.php?page=register&error=email");
        exit();
    }
    
    // Check if passwords match
    if ($password !== $confirm_password) {
        header("Location: ../index.php?page=register&error=password");
        exit();
    }
    
    // Check if terms are accepted
    if (!$terms) {
        header("Location: ../index.php?page=register&error=terms");
        exit();
    }
    
    // In a real application, you would:
    // 1. Check if the email already exists in the database
    // 2. Hash the password securely (using password_hash)
    // 3. Insert the new user into the database
    // 4. Send a verification email
    
    // For this example, we'll simulate a successful registration
    
    // Mock check if email exists (in a real app, this would query a database)
    $emailExists = mockCheckEmailExists($email);
    
    if ($emailExists) {
        header("Location: ../index.php?page=register&error=email");
        exit();
    }
    
    // Mock user creation (in a real app, this would insert into a database)
    $userId = mockCreateUser($first_name, $last_name, $email, $phone, $password);
    
    if ($userId) {
        // Set session variables for the newly registered user
        $_SESSION['user_id'] = $userId;
        $_SESSION['user_email'] = $email;
        $_SESSION['user_name'] = $first_name . ' ' . $last_name;
        $_SESSION['logged_in'] = true;
        
        // Redirect to dashboard or verification page
        header("Location: ../index.php?page=user-dashboard");
        exit();
    } else {
        // If there was an error creating the user
        header("Location: ../index.php?page=register&error=unknown");
        exit();
    }
} else {
    // If someone tries to access this file directly without submitting the form
    header("Location: ../index.php?page=register");
    exit();
}

/**
 * Mock function to check if an email already exists
 * In a real application, this would query a database
 */
function mockCheckEmailExists($email) {
    // Mock existing emails (in a real app, this would come from a database)
    $existingEmails = ['usuario@ejemplo.com', 'admin@tulicencia.com'];
    
    return in_array($email, $existingEmails);
}

/**
 * Mock function to create a new user
 * In a real application, this would insert into a database
 */
function mockCreateUser($first_name, $last_name, $email, $phone, $password) {
    // In a real app, you would:
    // 1. Hash the password: $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    // 2. Insert the user into the database
    // 3. Return the new user ID or false if there was an error
    
    // For this example, we'll just return a mock user ID
    return 1000; // Simulating a new user ID
}
?> 