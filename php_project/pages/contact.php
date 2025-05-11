<div class="min-h-screen bg-background-light">
    <div class="container mx-auto px-4 py-12">
        <div class="max-w-4xl mx-auto">
            <h1 class="text-3xl md:text-4xl font-bold text-text-primary mb-8 text-center">Contáctenos</h1>
            
            <div class="bg-white rounded-xl shadow-md overflow-hidden p-8 mb-12">
                <p class="text-text-gray mb-8 text-center">
                    Estamos aquí para ayudarte con cualquier duda o consulta que tengas sobre nuestros servicios.
                    Puedes comunicarte con nosotros a través de cualquiera de los siguientes medios.
                </p>
                
                <?php include_once 'components/contact.php'; ?>
            </div>
            
            <div class="mt-12 bg-white rounded-xl shadow-md overflow-hidden p-8">
                <h2 class="text-2xl font-bold text-text-primary mb-4 text-center">Nuestra Ubicación</h2>
                
                <div class="aspect-w-16 aspect-h-9 mb-6">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.661912202924!2d-99.16869708509426!3d19.427023546029434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff35f5bd1563%3A0x6c366f0e2de02ff7!2sEl%20%C3%81ngel%20de%20la%20Independencia!5e0!3m2!1ses-419!2smx!4v1623433739028!5m2!1ses-419!2smx" 
                        width="100%" 
                        height="450" 
                        style="border:0;" 
                        allowfullscreen="" 
                        loading="lazy">
                    </iframe>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 class="text-lg font-semibold text-text-primary mb-2">Horario de Atención</h3>
                        <ul class="text-text-gray space-y-1">
                            <li>Lunes - Viernes: 9:00 AM - 6:00 PM</li>
                            <li>Sábado: 10:00 AM - 2:00 PM</li>
                            <li>Domingo: Cerrado</li>
                        </ul>
                    </div>
                    
                    <div>
                        <h3 class="text-lg font-semibold text-text-primary mb-2">Dirección</h3>
                        <p class="text-text-gray">
                            123 Calle Principal<br>
                            Colonia Centro<br>
                            Ciudad de México, CP 12345<br>
                            México
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div> 