<?php
// Define the FAQ data structure exactly like in the React component
$tabs = [
  ['id' => 'general', 'label' => 'General'],
  ['id' => 'proceso', 'label' => 'Proceso'],
  ['id' => 'tiempo', 'label' => 'Tiempo'],
  ['id' => 'costos', 'label' => 'Costos'],
];

$faqItemsByCategory = [
  'general' => [
    [
      'id' => 'general-1',
      'title' => '¿Qué servicios ofrecen?',
      'content' => 'Ofrecemos servicios completos de gestión de licencias de conducir, incluyendo renovaciones, duplicados, y trámites iniciales. Nuestro objetivo es hacer el proceso lo más sencillo y eficiente posible.',
    ],
    [
      'id' => 'general-2',
      'title' => '¿Cómo funciona el servicio?',
      'content' => 'Nuestro servicio es 100% digital. Primero, eliges el tipo de trámite que necesitas. Luego, subes los documentos requeridos y realizas el pago. Nosotros nos encargamos de todo el proceso y te mantenemos informado en cada paso.',
    ],
  ],
  'proceso' => [
    [
      'id' => 'proceso-1',
      'title' => '¿Qué documentos necesito?',
      'content' => 'Los documentos requeridos varían según el trámite. Generalmente, necesitarás tu identificación oficial, comprobante de domicilio y tu licencia actual (en caso de renovación). Te guiaremos sobre los documentos específicos durante el proceso.',
    ],
    [
      'id' => 'proceso-2',
      'title' => '¿Cómo subo mis documentos?',
      'content' => 'Puedes subir tus documentos directamente a través de nuestra plataforma digital. Aceptamos archivos en formato PDF, JPG o PNG. Si tienes problemas, nuestro equipo de soporte está disponible para ayudarte.',
    ],
  ],
  'tiempo' => [
    [
      'id' => 'tiempo-1',
      'title' => '¿En cuánto tiempo recibo mi licencia?',
      'content' => 'El tiempo de entrega varía según el tipo de trámite. Para renovaciones simples, el proceso puede tomar entre 7 a 10 días hábiles. Para trámites más complejos que requieren verificación adicional, puede tomar hasta 15 días hábiles.',
    ],
    [
      'id' => 'tiempo-2',
      'title' => '¿Cuánto tiempo dura el examen médico?',
      'content' => 'El examen médico en línea generalmente toma entre 15 a 20 minutos. Para exámenes presenciales, debes considerar un tiempo aproximado de 30 a 45 minutos incluyendo el tiempo de espera.',
    ],
  ],
  'costos' => [
    [
      'id' => 'costos-1',
      'title' => '¿Cuáles son los costos de los trámites?',
      'content' => 'Los costos varían según el tipo de trámite. Nuestras tarifas incluyen todos los sellos y aranceles gubernamentales, más nuestra comisión por gestión. En tu cuenta podrás ver un desglose detallado de todos los costos asociados a tu trámite específico.',
    ],
    [
      'id' => 'costos-2',
      'title' => '¿Qué métodos de pago aceptan?',
      'content' => 'Aceptamos múltiples formas de pago, incluyendo tarjetas de crédito/débito, transferencias bancarias y pagos en efectivo a través de diversos puntos de pago. Todas las transacciones son seguras y recibirás un comprobante de pago.',
    ],
  ],
];
?>

<div class="fade-in">
  <div class="text-center mb-8">
    <h2 class="text-3xl font-bold text-primary">Preguntas frecuentes</h2>
  </div>

  <!-- Tabs Component -->
  <div class="mt-[30px] px-[16px] pb-8">
    <!-- Tabs Header -->
    <div class="flex flex-wrap justify-center gap-2 md:gap-4 mb-6">
      <?php foreach ($tabs as $tab): ?>
        <button 
          class="tab-button px-6 py-2 rounded-full transition-colors duration-200 ease-in-out <?= $tab['id'] === 'general' ? 'active bg-[#147A31] text-white' : 'text-[#147A31] border border-[#147A31] hover:bg-[#147A31] hover:text-white' ?>" 
          data-tab="<?= $tab['id'] ?>"
        >
          <?= $tab['label'] ?>
        </button>
      <?php endforeach; ?>
    </div>

    <!-- Tabs Content -->
    <div class="flex flex-wrap justify-center w-full mb-8">
      <?php foreach ($tabs as $tab): ?>
        <div class="tab-content <?= $tab['id'] === 'general' ? 'active' : 'hidden' ?> w-full px-4 md:px-6 lg:px-[10rem]" id="<?= $tab['id'] ?>-content">
          <div class="accordion mt-6 space-y-4">
            <?php foreach ($faqItemsByCategory[$tab['id']] as $item): ?>
              <div class="accordion-item bg-white rounded-lg shadow-md transition-all duration-200" id="<?= $item['id'] ?>">
                <button class="accordion-header flex justify-between items-center w-full text-left p-5 hover:bg-gray-50 transition-colors duration-200">
                  <h3 class="text-lg font-medium text-gray-900"><?= $item['title'] ?></h3>
                  <svg class="accordion-icon w-5 h-5 text-[#147A31] transform transition-transform duration-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div class="accordion-content hidden">
                  <div class="px-5 pb-5">
                    <p class="text-gray-600"><?= $item['content'] ?></p>
                  </div>
                </div>
              </div>
            <?php endforeach; ?>
          </div>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</div>

<style>
.fade-in {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.tab-button {
  font-weight: 500;
  min-width: 120px;
}

.tab-button.active {
  background-color: #147A31;
  color: white;
}

.tab-content {
  display: none;
}

.tab-content.active {
  display: block;
  animation: fadeContent 0.3s ease-out;
}

@keyframes fadeContent {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.accordion-item {
  overflow: hidden;
}

.accordion-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
}

.accordion-content.active {
  max-height: 500px;
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
  // Tab functionality
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');
  
  const handleTabChange = (tabId) => {
    // Remove active class from all buttons and contents
    tabButtons.forEach(btn => {
      btn.classList.remove('active', 'bg-[#147A31]', 'text-white');
      btn.classList.add('text-[#147A31]', 'border', 'border-[#147A31]');
    });
    
    tabContents.forEach(content => {
      content.classList.remove('active');
      content.classList.add('hidden');
    });
    
    // Add active class to current button and content
    const activeButton = document.querySelector(`[data-tab="${tabId}"]`);
    activeButton.classList.add('active', 'bg-[#147A31]', 'text-white');
    activeButton.classList.remove('text-[#147A31]', 'border', 'border-[#147A31]');
    
    const activeContent = document.getElementById(`${tabId}-content`);
    activeContent.classList.add('active');
    activeContent.classList.remove('hidden');
  };
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabId = button.getAttribute('data-tab');
      handleTabChange(tabId);
    });
  });
  
  // Accordion functionality
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const accordionItem = header.parentElement;
      const content = accordionItem.querySelector('.accordion-content');
      const icon = header.querySelector('.accordion-icon');
      
      // Close other items
      const parentAccordion = accordionItem.parentElement;
      const siblingItems = parentAccordion.querySelectorAll('.accordion-item');
      
      siblingItems.forEach(item => {
        if (item !== accordionItem) {
          const siblingContent = item.querySelector('.accordion-content');
          const siblingIcon = item.querySelector('.accordion-icon');
          siblingContent.classList.remove('active');
          siblingContent.classList.add('hidden');
          siblingIcon.classList.remove('rotate-180');
        }
      });
      
      // Toggle current item
      content.classList.toggle('hidden');
      content.classList.toggle('active');
      icon.classList.toggle('rotate-180');
    });
  });
});
</script> 