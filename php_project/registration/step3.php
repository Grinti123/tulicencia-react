<div class="space-y-4">
    <h2 class="text-xl font-semibold text-[#1a602d] mb-4">Información de Contacto</h2>
    
    <div class="grid md:grid-cols-2 gap-4">
        <div>
            <label for="birthDate" class="block text-sm font-medium text-[#224a33] mb-1">Fecha de nacimiento</label>
            <input 
                type="date" 
                id="birthDate" 
                name="birthDate" 
                class="form-input"
            >
        </div>
        
        <div>
            <label for="phoneNumber" class="block text-sm font-medium text-[#224a33] mb-1">Teléfono</label>
            <input 
                type="text" 
                id="phoneNumber" 
                name="phoneNumber" 
                class="form-input" 
                placeholder="(XXX) XXX-XXXX"
            >
        </div>
    </div>
    
    <div>
        <label for="email" class="block text-sm font-medium text-[#224a33] mb-1">Correo electrónico</label>
        <input 
            type="email" 
            id="email" 
            name="email" 
            class="form-input" 
            placeholder="Ingrese su correo electrónico"
        >
    </div>
    
    <div>
        <label for="address" class="block text-sm font-medium text-[#224a33] mb-1">Dirección</label>
        <input 
            type="text" 
            id="address" 
            name="address" 
            class="form-input" 
            placeholder="Ingrese su dirección"
        >
    </div>
    
    <h2 class="text-xl font-semibold text-[#1a602d] pt-4 mb-4">Características Físicas</h2>
    
    <div>
        <label for="gender" class="block text-sm font-medium text-[#224a33] mb-1">Género</label>
        <select 
            id="gender" 
            name="gender" 
            class="form-input"
        >
            <option value="">Seleccione género</option>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
            <option value="O">Otro</option>
        </select>
    </div>
    
    <div class="grid md:grid-cols-3 gap-4">
        <div>
            <label for="height" class="block text-sm font-medium text-[#224a33] mb-1">Altura (cm)</label>
            <input 
                type="text" 
                id="height" 
                name="height" 
                class="form-input numeric-only" 
                placeholder="175"
            >
        </div>
        
        <div>
            <label for="weight" class="block text-sm font-medium text-[#224a33] mb-1">Peso (kg)</label>
            <input 
                type="text" 
                id="weight" 
                name="weight" 
                class="form-input numeric-only" 
                placeholder="70"
            >
        </div>
        
        <div>
            <label for="skinColor" class="block text-sm font-medium text-[#224a33] mb-1">Color de piel</label>
            <input 
                type="text" 
                id="skinColor" 
                name="skinColor" 
                class="form-input alphabetic-only" 
                placeholder="Ingrese color de piel"
            >
        </div>
    </div>
    
    <div class="grid md:grid-cols-2 gap-4">
        <div>
            <label for="hairColor" class="block text-sm font-medium text-[#224a33] mb-1">Color de pelo</label>
            <input 
                type="text" 
                id="hairColor" 
                name="hairColor" 
                class="form-input alphabetic-only" 
                placeholder="Ingrese color de pelo"
            >
        </div>
        
        <div>
            <label for="eyeColor" class="block text-sm font-medium text-[#224a33] mb-1">Color de ojos</label>
            <input 
                type="text" 
                id="eyeColor" 
                name="eyeColor" 
                class="form-input alphabetic-only" 
                placeholder="Ingrese color de ojos"
            >
        </div>
    </div>
    
    <div class="flex gap-4 mt-8">
        <button onclick="prevStep()" class="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition duration-300">
            Anterior
        </button>
        <button onclick="nextStep()" class="w-full bg-[#1a602d] hover:bg-[#157a3c] text-white font-medium py-2 px-4 rounded-lg transition duration-300">
            Siguiente
        </button>
    </div>
</div> 