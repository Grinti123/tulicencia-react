<div class="container mx-auto px-4 py-12">
  <div class="text-center mb-8 md:mb-12">
    <h2 class="text-2xl md:text-3xl font-bold text-green-700 mb-2">¿Estás Listo?</h2>
    <p class="text-gray-900">Selecciona el servicio que necesitas:</p>
  </div>

  <!-- Service Selection Buttons -->
  <div class="flex flex-row justify-center gap-4 md:gap-32 mb-6 md:mb-16">
    <!-- Trámites de personas option -->
    <div class="fade-in flex flex-col items-center relative">
      <div class="w-40 h-40 md:w-56 md:h-56 mb-3 md:mb-8 flex items-center justify-center">
        <dotlottie-player
          src="/json/chicolentes.json"
          autoplay
          loop
        ></dotlottie-player>
      </div>

      <button
        onclick="setActiveService('personas')"
        id="btn-personas"
        class="btn-secondary whitespace-nowrap px-4 py-2 rounded-full border border-green-700 text-green-700 hover:bg-green-700 hover:text-white transition-colors"
      >
        Trámites de personas
      </button>
    </div>

    <!-- Trámites de vehículos option -->
    <div class="fade-in flex flex-col items-center relative" style="animation-duration: 1.2s">
      <div class="w-40 h-40 md:w-56 md:h-56 mb-3 md:mb-8 flex items-center justify-center">
        <dotlottie-player
          src="/json/carrito.json"
          autoplay
          loop
        ></dotlottie-player>
      </div>

      <button
        onclick="setActiveService('vehiculos')"
        id="btn-vehiculos"
        class="btn-secondary whitespace-nowrap px-4 py-2 rounded-full border border-green-700 text-green-700 hover:bg-green-700 hover:text-white transition-colors"
      >
        Trámites de vehículos
      </button>
    </div>
  </div>

  <!-- Service Details Sections -->
  <div class="mt-6 md:mt-8">
    <!-- Trámites de personas details -->
    <div
      id="service-personas"
      class="transition-opacity duration-500 ease-in-out opacity-0 hidden"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center">
        <!-- Image and Text Column -->
        <div class="bg-white rounded-3xl shadow-md p-6 flex flex-col">
          <div class="w-40 h-40 md:w-48 md:h-48 mb-3 md:mb-4 mx-auto">
            <dotlottie-player
              src="/json/chicolentes.json"
              autoplay
              loop
            ></dotlottie-player>
          </div>

          <h3 class="text-lg md:text-xl font-semibold text-gray-800 mt-2 md:mt-4 mb-2 md:mb-3">
            Trámites de personas
          </h3>
          <p class="text-gray-600 text-sm md:text-base mb-4 md:mb-6">
            Gestionamos tus trámites desde la solicitud hasta la entrega de documentos.
          </p>

          <button
            onclick="handleProcedureSelect(event)"
            id="btn-start-personas"
            class="btn-primary px-4 py-2 bg-green-700 text-white rounded-full hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled
          >
            ¡Iniciar ahora!
          </button>
        </div>

        <!-- RadioGroup Options Column -->
        <div class="bg-[#e9f2e7] rounded-3xl p-4 md:p-8 relative overflow-hidden">
          <h3 class="text-xl font-semibold text-gray-800 mb-4">Servicios de Licencia</h3>
          <div class="bg-white rounded-xl shadow p-4 md:p-6">
            <div id="license-options-loading" class="hidden">
              <div class="flex justify-center py-4">
                <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-green-700"></div>
              </div>
            </div>
            <div id="license-options-error" class="hidden">
              <div class="text-red-500 p-2">Error al cargar las opciones</div>
            </div>
            <div id="license-options" class="space-y-3">
              <!-- Radio options for license procedures -->
              <label class="flex items-center space-x-3 cursor-pointer">
                <input type="radio" name="tramite-persona" value="renovacion" class="form-radio text-green-700 h-5 w-5" onchange="setSelectedPersonalOption(this.value)">
                <span class="text-gray-700">Renovación de Licencia</span>
              </label>
              <label class="flex items-center space-x-3 cursor-pointer">
                <input type="radio" name="tramite-persona" value="primera-vez" class="form-radio text-green-700 h-5 w-5" onchange="setSelectedPersonalOption(this.value)">
                <span class="text-gray-700">Licencia por Primera Vez</span>
              </label>
              <label class="flex items-center space-x-3 cursor-pointer">
                <input type="radio" name="tramite-persona" value="duplicado" class="form-radio text-green-700 h-5 w-5" onchange="setSelectedPersonalOption(this.value)">
                <span class="text-gray-700">Duplicado de Licencia</span>
              </label>
              <label class="flex items-center space-x-3 cursor-pointer">
                <input type="radio" name="tramite-persona" value="cambio-categoria" class="form-radio text-green-700 h-5 w-5" onchange="setSelectedPersonalOption(this.value)">
                <span class="text-gray-700">Cambio de Categoría</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Trámites de vehículos details -->
    <div
      id="service-vehiculos"
      class="transition-opacity duration-500 ease-in-out opacity-0 hidden"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center">
        <!-- Image and Text Column -->
        <div class="bg-white rounded-3xl shadow-md p-6 flex flex-col">
          <div class="w-40 h-40 md:w-48 md:h-48 mb-3 md:mb-4 mx-auto">
            <dotlottie-player
              src="/json/carrito.json"
              autoplay
              loop
            ></dotlottie-player>
          </div>

          <h3 class="text-lg md:text-xl font-semibold text-gray-800 mt-2 md:mt-4 mb-2 md:mb-3">
            Trámites de vehículos
          </h3>
          <p class="text-gray-600 text-sm md:text-base mb-4 md:mb-6">
            Gestionamos tus trámites vehiculares con rapidez y eficiencia.
          </p>

          <button
            onclick="handleProcedureSelect(event)"
            id="btn-start-vehiculos"
            class="btn-primary px-4 py-2 bg-green-700 text-white rounded-full hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled
          >
            ¡Iniciar ahora!
          </button>
        </div>

        <!-- RadioGroup Options Column -->
        <div class="bg-[#e9f2e7] rounded-3xl p-4 md:p-8 relative overflow-hidden">
          <h3 class="text-xl font-semibold text-gray-800 mb-4">Servicios de Vehículos</h3>
          <div class="bg-white rounded-xl shadow p-4 md:p-6">
            <div id="vehicle-options-loading" class="hidden">
              <div class="flex justify-center py-4">
                <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-green-700"></div>
              </div>
            </div>
            <div id="vehicle-options-error" class="hidden">
              <div class="text-red-500 p-2">Error al cargar las opciones</div>
            </div>
            <div id="vehicle-options" class="space-y-3">
              <!-- Radio options for vehicle procedures -->
              <label class="flex items-center space-x-3 cursor-pointer">
                <input type="radio" name="tramite-vehiculo" value="transferencia" class="form-radio text-green-700 h-5 w-5" onchange="setSelectedVehicleOption(this.value)">
                <span class="text-gray-700">Transferencia de Vehículo</span>
              </label>
              <label class="flex items-center space-x-3 cursor-pointer">
                <input type="radio" name="tramite-vehiculo" value="placas-nuevas" class="form-radio text-green-700 h-5 w-5" onchange="setSelectedVehicleOption(this.value)">
                <span class="text-gray-700">Placas Nuevas</span>
              </label>
              <label class="flex items-center space-x-3 cursor-pointer">
                <input type="radio" name="tramite-vehiculo" value="duplicado-placas" class="form-radio text-green-700 h-5 w-5" onchange="setSelectedVehicleOption(this.value)">
                <span class="text-gray-700">Duplicado de Placas</span>
              </label>
              <label class="flex items-center space-x-3 cursor-pointer">
                <input type="radio" name="tramite-vehiculo" value="revision" class="form-radio text-green-700 h-5 w-5" onchange="setSelectedVehicleOption(this.value)">
                <span class="text-gray-700">Revisión Técnica</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .fade-in {
    animation: fadeIn 1s ease-in-out;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .btn-primary {
    @apply px-4 py-2 bg-green-700 text-white rounded-full hover:bg-green-800 transition-colors;
  }
  
  .btn-secondary {
    @apply px-4 py-2 rounded-full border border-green-700 text-green-700 hover:bg-green-700 hover:text-white transition-colors;
  }
  
  .form-radio {
    appearance: none;
    border-radius: 50%;
    width: 1.25rem;
    height: 1.25rem;
    border: 2px solid #d1d5db;
    transition: all 0.2s ease-in-out;
  }
  
  .form-radio:checked {
    border-color: #147A31;
    background-color: #147A31;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='4'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
  }
</style>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    // State variables
    let activeService = null;
    let selectedPersonalOption = '';
    let selectedVehicleOption = '';
    
    // Get DOM elements
    const btnPersonas = document.getElementById('btn-personas');
    const btnVehiculos = document.getElementById('btn-vehiculos');
    const servicePersonas = document.getElementById('service-personas');
    const serviceVehiculos = document.getElementById('service-vehiculos');
    const btnStartPersonas = document.getElementById('btn-start-personas');
    const btnStartVehiculos = document.getElementById('btn-start-vehiculos');
    
    // Set active service function
    window.setActiveService = function(service) {
      activeService = service;
      
      // Update button styles
      if (service === 'personas') {
        btnPersonas.classList.remove('btn-secondary');
        btnPersonas.classList.add('bg-green-700', 'text-white');
        btnVehiculos.classList.add('btn-secondary');
        btnVehiculos.classList.remove('bg-green-700', 'text-white');
        
        // Show personas section
        servicePersonas.classList.remove('hidden', 'opacity-0');
        servicePersonas.classList.add('opacity-100');
        
        // Hide vehiculos section
        serviceVehiculos.classList.add('hidden', 'opacity-0');
        serviceVehiculos.classList.remove('opacity-100');
      } else if (service === 'vehiculos') {
        btnVehiculos.classList.remove('btn-secondary');
        btnVehiculos.classList.add('bg-green-700', 'text-white');
        btnPersonas.classList.add('btn-secondary');
        btnPersonas.classList.remove('bg-green-700', 'text-white');
        
        // Show vehiculos section
        serviceVehiculos.classList.remove('hidden', 'opacity-0');
        serviceVehiculos.classList.add('opacity-100');
        
        // Hide personas section
        servicePersonas.classList.add('hidden', 'opacity-0');
        servicePersonas.classList.remove('opacity-100');
      }
    };
    
    // Set selected personal option
    window.setSelectedPersonalOption = function(value) {
      selectedPersonalOption = value;
      btnStartPersonas.disabled = !value;
    };
    
    // Set selected vehicle option
    window.setSelectedVehicleOption = function(value) {
      selectedVehicleOption = value;
      btnStartVehiculos.disabled = !value;
    };
    
    // Handle procedure select
    window.handleProcedureSelect = function(e) {
      e.preventDefault();
      
      // Check if user is authenticated
      const isAuthenticated = <?php echo isset($_SESSION['user_id']) ? 'true' : 'false'; ?>;
      
      if (isAuthenticated) {
        // If authenticated, redirect to new procedure page
        window.location.href = 'index.php?page=new-procedure';
      } else {
        // If not authenticated, redirect to login page
        window.location.href = 'index.php?page=login';
      }
    };
  });
</script> 