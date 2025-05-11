<?php
/**
 * HeaderProcedure - Reusable header component for procedure pages
 * Based on the same styling as HeaderRegister but with dashboard button
 * 
 * @param string $title - Optional title to display (e.g. "License Renewal")
 * @param string $dashboardLink - Link target for the dashboard button (defaults to "/dashboard")
 */

// Default values
$title = $title ?? '';
$dashboardLink = $dashboardLink ?? '/dashboard';
?>

<header class="fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 bg-white shadow-sm">
    <div class="flex justify-between items-center px-4 py-2 md:py-3 md:px-6 max-w-7xl mx-auto">
        <div class="flex items-center">
            <a href="/" class="flex items-center">
                <img src="../assets/img/Mesa2.png" alt="Logo" class="w-32 md:w-39">
            </a>
            
            <?php if ($title): ?>
                <div class="ml-4 md:ml-6 pl-4 md:pl-6 border-l border-gray-300">
                    <h1 class="text-sm md:text-base font-medium text-gray-700"><?php echo htmlspecialchars($title); ?></h1>
                </div>
            <?php endif; ?>
        </div>

        <!-- Desktop Navigation - Dashboard button -->
        <nav class="hidden md:flex items-center">
            <a
                href="<?php echo htmlspecialchars($dashboardLink); ?>"
                class="border border-[#157a3c] text-[#157a3c] hover:bg-[#157a3c] hover:text-white px-5 py-2 rounded-full text-sm font-medium transition-colors"
            >
                Mi panel
            </a>
        </nav>

        <!-- Mobile Navigation -->
        <nav class="md:hidden flex items-center">
            <a
                href="<?php echo htmlspecialchars($dashboardLink); ?>"
                class="border border-[#157a3c] text-[#157a3c] hover:bg-[#157a3c] hover:text-white px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
            >
                Mi panel
            </a>
        </nav>
    </div>
</header>

<!-- Spacer to prevent content from hiding behind fixed header -->
<div class="h-[60px] md:h-[72px]"></div> 