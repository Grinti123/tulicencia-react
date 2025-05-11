<div class="space-y-4">
    <h2 class="text-xl font-semibold text-[#1a602d] mb-4">Información Personal</h2>
    
    <div class="grid md:grid-cols-2 gap-4">
        <div>
            <label for="firstName" class="block text-sm font-medium text-[#224a33] mb-1">Nombre</label>
            <input 
                type="text" 
                id="firstName" 
                name="firstName" 
                class="form-input alphabetic-only" 
                placeholder="Ingrese su nombre" 
            >
        </div>
        
        <div>
            <label for="middleName" class="block text-sm font-medium text-[#224a33] mb-1">Segundo nombre</label>
            <input 
                type="text" 
                id="middleName" 
                name="middleName" 
                class="form-input alphabetic-only" 
                placeholder="Opcional" 
            >
        </div>
    </div>
    
    <div class="grid md:grid-cols-2 gap-4">
        <div>
            <label for="paternalLastName" class="block text-sm font-medium text-[#224a33] mb-1">Apellido paterno</label>
            <input 
                type="text" 
                id="paternalLastName" 
                name="paternalLastName" 
                class="form-input alphabetic-only" 
                placeholder="Ingrese su apellido paterno" 
            >
        </div>
        
        <div>
            <label for="maternalLastName" class="block text-sm font-medium text-[#224a33] mb-1">Apellido materno</label>
            <input 
                type="text" 
                id="maternalLastName" 
                name="maternalLastName" 
                class="form-input alphabetic-only" 
                placeholder="Ingrese su apellido materno" 
            >
        </div>
    </div>
    
    <div class="flex justify-end mt-8">
        <button onclick="nextStep()" class="w-full bg-[#1a602d] hover:bg-[#157a3c] text-white font-medium py-2 px-4 rounded-lg transition duration-300">
            Siguiente
        </button>
    </div>
</div> 