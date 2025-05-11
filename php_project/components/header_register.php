<header class="fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 bg-white">
    <div class="flex justify-between items-center px-4 py-2 md:py-3 md:px-6 max-w-7xl mx-auto">
        <div class="flex items-center">
            <a href="index.php" class="flex items-center">
                <img src="../assets/img/Mesa2.png" alt="Logo" class="w-32 md:w-39">
            </a>
        </div>

        <!-- Desktop Navigation - Only Register and Login buttons -->
        <nav class="hidden md:flex items-center gap-4">
            <a
                href="index.php?page=register"
                class="text-[#157a3c] hover:text-[#0e6631] text-sm font-medium"
            >
                Registrarse
            </a>
            <a
                href="index.php?page=login"
                class="border border-[#157a3c] text-[#157a3c] hover:bg-[#157a3c] hover:text-white px-5 py-2 rounded-full text-sm font-medium transition-colors"
            >
                Ingresar
            </a>
        </nav>

        <!-- Mobile Navigation - Simplified for register/login pages -->
        <nav class="md:hidden flex items-center gap-4">
            <a
                href="index.php?page=register"
                class="text-[#157a3c] hover:text-[#0e6631] text-sm font-medium"
            >
                Registrarse
            </a>
            <a
                href="index.php?page=login"
                class="border border-[#157a3c] text-[#157a3c] hover:bg-[#157a3c] hover:text-white px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
            >
                Ingresar
            </a>
        </nav>
    </div>
</header>

