<div class="space-y-4">
    <h2 class="text-xl font-semibold text-[#1a602d] mb-4">Información de Identificación</h2>
    
    <div>
        <label for="licenseNumber" class="block text-sm font-medium text-[#224a33] mb-1">Número de licencia</label>
        <input 
            type="text" 
            id="licenseNumber" 
            name="licenseNumber" 
            class="form-input numeric-only" 
            placeholder="Ingrese su número de licencia" 
            maxlength="7"
        >
    </div>
    
    <div>
        <label for="ssn" class="block text-sm font-medium text-[#224a33] mb-1">Últimos 4 dígitos del SSN</label>
        <input 
            type="text" 
            id="ssn" 
            name="ssn" 
            class="form-input numeric-only" 
            placeholder="Ingrese últimos 4 dígitos del SSN" 
            maxlength="4"
        >
    </div>
    
    <div class="grid md:grid-cols-2 gap-4">
        <div>
            <label for="pueblo" class="block text-sm font-medium text-[#224a33] mb-1">Pueblo</label>
            <select 
                id="pueblo" 
                name="pueblo" 
                class="form-input"
            >
                <option value="">Seleccione un pueblo</option>
                <?php foreach ($towns as $town): ?>
                    <option value="<?php echo $town['pl_id']; ?>">
                        <?php echo $town['pl_nombre']; ?>
                    </option>
                <?php endforeach; ?>
            </select>
        </div>
        
        <div>
            <label for="zipCode" class="block text-sm font-medium text-[#224a33] mb-1">Código postal</label>
            <input 
                type="text" 
                id="zipCode" 
                name="zipCode" 
                class="form-input numeric-only" 
                placeholder="00000" 
                maxlength="5"
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

<script>
// Update hidden puebloName field when pueblo selection changes
document.addEventListener('DOMContentLoaded', function() {
    const puebloSelect = document.getElementById('pueblo');
    const puebloNameInput = document.getElementById('puebloName');
    
    if (puebloSelect && puebloNameInput) {
        puebloSelect.addEventListener('change', function() {
            const selectedOption = puebloSelect.options[puebloSelect.selectedIndex];
            puebloNameInput.value = selectedOption.text;
        });
    }
});
</script> 