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

  // FAQ items data
  const faqItems = [
    {
      id: 'faq-1',
      title: '¿En cuánto tiempo recibo mi licencia?',
      content: 'El tiempo de entrega varía según el tipo de trámite. Para renovaciones simples, el proceso puede tomar entre 7 a 10 días hábiles. Para trámites más complejos que requieren verificación adicional, puede tomar hasta 15 días hábiles.',
    },
    {
      id: 'faq-2',
      title: '¿Puedo recibir el examen medico "online"?',
      content: 'Sí, ofrecemos exámenes médicos a través de consultas por video con médicos certificados. Este servicio está disponible para ciertos trámites de renovación. Sin embargo, para licencias iniciales o algunos casos especiales, puede ser necesario un examen médico presencial.',
    },
    {
      id: 'faq-3',
      title: '¿Cuáles son los costos de los trámites?',
      content: 'Los costos varían según el tipo de trámite. Nuestras tarifas incluyen todos los sellos y aranceles gubernamentales, más nuestra comisión por gestión. En tu cuenta podrás ver un desglose detallado de todos los costos asociados a tu trámite específico.',
    },
    {
      id: 'faq-4',
      title: '¿Puedo recibir ayuda de un representante?',
      content: 'Absolutamente. Contamos con representantes disponibles por teléfono, chat y WhatsApp para asistirte en cada paso del proceso. Puedes comunicarte con nuestro equipo en horario laboral o programar una cita virtual para recibir atención personalizada.',
    },
  ];

  // Create tab content with accordion for each tab
  const tabsWithContent = tabs.map(tab => ({
    ...tab,
    content: (
      <div className="w-full px-4 md:px-6 lg:px-[10rem]">
        <Accordion items={faqItems} allowMultiple={false} className="mt-6" />
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