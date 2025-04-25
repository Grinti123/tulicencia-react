import React, { useState } from 'react';
import { Accordion, Tabs } from './ui';

/**
 * FAQ component using reusable UI components
 */
const FAQ = () => {
  const [activeTab, setActiveTab] = useState('general');

  // Tab data
  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'proceso', label: 'Proceso' },
    { id: 'tiempo', label: 'Tiempo' },
    { id: 'costos', label: 'Costos' },
  ];

  // FAQ items data organized by categories
  const faqItemsByCategory = {
    general: [
      {
        id: 'general-1',
        title: '¿Qué servicios ofrecen?',
        content: 'Ofrecemos servicios completos de gestión de licencias de conducir, incluyendo renovaciones, duplicados, y trámites iniciales. Nuestro objetivo es hacer el proceso lo más sencillo y eficiente posible.',
      },
      {
        id: 'general-2',
        title: '¿Cómo funciona el servicio?',
        content: 'Nuestro servicio es 100% digital. Primero, eliges el tipo de trámite que necesitas. Luego, subes los documentos requeridos y realizas el pago. Nosotros nos encargamos de todo el proceso y te mantenemos informado en cada paso.',
      },
    ],
    proceso: [
      {
        id: 'proceso-1',
        title: '¿Qué documentos necesito?',
        content: 'Los documentos requeridos varían según el trámite. Generalmente, necesitarás tu identificación oficial, comprobante de domicilio y tu licencia actual (en caso de renovación). Te guiaremos sobre los documentos específicos durante el proceso.',
      },
      {
        id: 'proceso-2',
        title: '¿Cómo subo mis documentos?',
        content: 'Puedes subir tus documentos directamente a través de nuestra plataforma digital. Aceptamos archivos en formato PDF, JPG o PNG. Si tienes problemas, nuestro equipo de soporte está disponible para ayudarte.',
      },
    ],
    tiempo: [
      {
        id: 'tiempo-1',
        title: '¿En cuánto tiempo recibo mi licencia?',
        content: 'El tiempo de entrega varía según el tipo de trámite. Para renovaciones simples, el proceso puede tomar entre 7 a 10 días hábiles. Para trámites más complejos que requieren verificación adicional, puede tomar hasta 15 días hábiles.',
      },
      {
        id: 'tiempo-2',
        title: '¿Cuánto tiempo dura el examen médico?',
        content: 'El examen médico en línea generalmente toma entre 15 a 20 minutos. Para exámenes presenciales, debes considerar un tiempo aproximado de 30 a 45 minutos incluyendo el tiempo de espera.',
      },
    ],
    costos: [
      {
        id: 'costos-1',
        title: '¿Cuáles son los costos de los trámites?',
        content: 'Los costos varían según el tipo de trámite. Nuestras tarifas incluyen todos los sellos y aranceles gubernamentales, más nuestra comisión por gestión. En tu cuenta podrás ver un desglose detallado de todos los costos asociados a tu trámite específico.',
      },
      {
        id: 'costos-2',
        title: '¿Qué métodos de pago aceptan?',
        content: 'Aceptamos múltiples formas de pago, incluyendo tarjetas de crédito/débito, transferencias bancarias y pagos en efectivo a través de diversos puntos de pago. Todas las transacciones son seguras y recibirás un comprobante de pago.',
      },
    ],
  };

  // Create tab content with accordion for each tab
  const tabsWithContent = tabs.map(tab => ({
    ...tab,
    content: (
      <div className="w-full px-4 md:px-6 lg:px-[10rem]">
        <Accordion items={faqItemsByCategory[tab.id]} allowMultiple={false} className="mt-6" />
      </div>
    )
  }));

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-green-700">Preguntas frecuentes</h2>
      </div>

      <Tabs 
        tabs={tabsWithContent}
        defaultTab={activeTab}
        onChange={handleTabChange}
        tabsClassName="mt-[30px] px-[16px] pb-8"
        contentClassName="flex flex-wrap justify-center w-full mb-8"
      />
    </>
  );
};

export default FAQ;