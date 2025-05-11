<div class="space-y-4">
    <h2 class="text-xl font-semibold text-[#1a602d] mb-4">Credenciales de Acceso</h2>
    
    <div>
        <label for="username" class="block text-sm font-medium text-[#224a33] mb-1">Nombre de usuario</label>
        <input 
            type="text" 
            id="username" 
            name="username" 
            class="form-input" 
            placeholder="Elija un nombre de usuario"
        >
        <p class="text-xs text-gray-500 mt-1">Solo puede contener letras, números y guiones bajos (_)</p>
    </div>
    
    <div>
        <div class="relative">
            <label for="password" class="block text-sm font-medium text-[#224a33] mb-1">Contraseña</label>
            <input 
                type="password" 
                id="password" 
                name="password" 
                class="form-input pr-10" 
                placeholder="Elija una contraseña segura"
            >
            <button 
                type="button" 
                id="toggle-password" 
                class="absolute right-3 top-9 text-gray-500"
            >
                <svg id="eye-icon" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                </svg>
                <svg id="eye-off-icon" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 hidden" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M3.28 2.22a.75.75 0 00-1.06 1.06l14.5 14.5a.75.75 0 101.06-1.06l-1.745-1.745a10.029 10.029 0 003.3-4.38 1.651 1.651 0 000-1.185A10.004 10.004 0 009.999 3a9.956 9.956 0 00-4.744 1.194L3.28 2.22zM7.752 6.69l1.092 1.092a2.5 2.5 0 013.374 3.373l1.091 1.092a4 4 0 00-5.557-5.557z" clip-rule="evenodd" />
                    <path d="M10.748 13.93l2.523 2.523a9.987 9.987 0 01-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 010-1.186A10.007 10.007 0 012.839 6.02L6.07 9.252a4 4 0 004.678 4.678z" />
                </svg>
            </button>
        </div>
        <p class="text-xs text-gray-500 mt-1">La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una minúscula, un número y un carácter especial</p>
    </div>
    
    <div class="flex gap-4 mt-8">
        <button onclick="prevStep()" class="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition duration-300">
            Anterior
        </button>
        <button onclick="goToStep(1)" class="w-full bg-[#1a602d] hover:bg-[#157a3c] text-white font-medium py-2 px-4 rounded-lg transition duration-300">
            Completar Registro
        </button>
    </div>
</div> 