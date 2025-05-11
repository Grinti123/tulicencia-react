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
<div class="min-h-screen bg-white">
    <main>
        <!-- Hero section -->
        <section class="bg-gradient-to-b from-[#ffffff] to-[#60f88b] rounded-b-[50px] pt-6 md:pt-20 pb-12 md:pb-50">
            <div class="container mx-auto xl:max-w-7xl px-4 hero-container">
                <?php include_once 'components/hero.php'; ?>
            </div>
        </section>
        
        <!-- Features section -->
        <?php include_once 'components/features.php'; ?>
        
        <!-- How It Works section -->
        <?php include_once 'components/how_it_works.php'; ?>
        
        <!-- Service Selection section -->
        <section class="bg-background-white py-16">
            <?php include_once 'components/service_selection.php'; ?>
        </section>
        
        <!-- FAQ section -->
        <section class="bg-background-white py-16">
            <div class="container mx-auto px-4">
                <?php include_once 'components/faq.php'; ?>
            </div>
        </section>
        
        <!-- Contact section -->
        <?php include_once 'components/contact.php'; ?>
    </main>
</div>

<!-- Page-specific script -->
<script>
document.addEventListener('DOMContentLoaded', function() {
    // Any home page specific JavaScript can go here
    console.log('Home page loaded');
});
</script> 