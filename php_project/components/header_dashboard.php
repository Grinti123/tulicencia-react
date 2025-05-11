<?php
// Start session if not already started
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Check if user is logged in, if not redirect to login page
if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {
    header('Location: login.php');
    exit();
}

// Check if page has been scrolled for styling
$hasScrolledClass = isset($_COOKIE['has_scrolled']) && $_COOKIE['has_scrolled'] === 'true' ? 'shadow-md bg-opacity-95' : '';
?>

<!-- Dashboard Header -->
<header class="fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 backdrop-blur-sm bg-white <?php echo $hasScrolledClass; ?>">
    <div class="flex justify-between items-center px-4 py-2 md:py-3 md:px-6 max-w-7xl mx-auto">
        <div class="flex items-center gap-2">
            <!-- Hamburger Menu - Only visible on small screens -->
            <button 
                id="menu-toggle"
                class="md:hidden flex items-center justify-center p-2 text-gray-700 hover:text-[#0e6631] focus:outline-none"
                aria-label="Toggle menu"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
            
            <a href="index.php" class="flex items-center">
                <img src="../assets/img/Mesa2.png" alt="Logo" class="w-32 md:w-39" />
            </a>
        </div>

        <!-- Desktop Navigation -->
        <nav class="flex items-center gap-4">
            <a
                href="new-procedure.php"
                class="bg-[#0e6631] text-white hover:bg-[#0a4f25] px-5 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                New Procedure
            </a>
            
            <a
                href="logout.php"
                class="text-[#0e6631] hover:text-[#0a4f25] px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 border border-[#0e6631] hover:bg-[#f3f4f6]"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
            </a>
        </nav>
    </div>
</header>

<!-- Spacer to prevent content from hiding behind fixed header -->
<div class="h-[60px] md:h-[72px]"></div>

<script>
// Handle scroll effect
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    let scrollTimeout;

    function handleScroll() {
        clearTimeout(scrollTimeout);
        
        if (window.scrollY > 10) {
            document.cookie = "has_scrolled=true;path=/";
            header.classList.add('shadow-md', 'bg-opacity-95');
        } else {
            document.cookie = "has_scrolled=false;path=/";
            header.classList.remove('shadow-md', 'bg-opacity-95');
        }

        scrollTimeout = setTimeout(() => {
            document.cookie = "has_scrolled=" + (window.scrollY > 10) + ";path=/";
        }, 100);
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
});

// Handle mobile menu toggle
document.getElementById('menu-toggle').addEventListener('click', function() {
    const menuButton = this;
    const svg = menuButton.querySelector('svg');
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    
    if (!isOpen) {
        svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />';
        menuButton.setAttribute('aria-expanded', 'true');
        // Add your menu open logic here
    } else {
        svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
        menuButton.setAttribute('aria-expanded', 'false');
        // Add your menu close logic here
    }
});
</script> 