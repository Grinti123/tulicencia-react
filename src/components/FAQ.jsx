import React, { useState } from 'react';

const FAQ = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [expandedItems, setExpandedItems] = useState({});

  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'proceso', label: 'Proceso' },
    { id: 'tiempo', label: 'Tiempo' },
    { id: 'costos', label: 'Costos' },
  ];

  const faqItems = [
    {
      id: 'faq-1',
      question: '¿En cuánto tiempo recibo mi licencia?',
      answer: 'El tiempo de entrega varía según el tipo de trámite. Para renovaciones simples, el proceso puede tomar entre 7 a 10 días hábiles. Para trámites más complejos que requieren verificación adicional, puede tomar hasta 15 días hábiles.',
    },
    {
      id: 'faq-2',
      question: '¿Puedo recibir el examen medico "online"?',
      answer: 'Sí, ofrecemos exámenes médicos a través de consultas por video con médicos certificados. Este servicio está disponible para ciertos trámites de renovación. Sin embargo, para licencias iniciales o algunos casos especiales, puede ser necesario un examen médico presencial.',
    },
    {
      id: 'faq-3',
      question: '¿Cuáles son los costos de los trámites?',
      answer: 'Los costos varían según el tipo de trámite. Nuestras tarifas incluyen todos los sellos y aranceles gubernamentales, más nuestra comisión por gestión. En tu cuenta podrás ver un desglose detallado de todos los costos asociados a tu trámite específico.',
    },
    {
      id: 'faq-4',
      question: '¿Puedo recibir ayuda de un representante?',
      answer: 'Absolutamente. Contamos con representantes disponibles por teléfono, chat y WhatsApp para asistirte en cada paso del proceso. Puedes comunicarte con nuestro equipo en horario laboral o programar una cita virtual para recibir atención personalizada.',
    },
  ];

  const toggleAccordion = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Section Title */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-green-700">Preguntas frecuentes</h2>
        </div>

        {/* Tab Navigation */}
        <div className="w-full mx-auto flex flex-row lg:justify-center items-center lg:gap-[12px] gap-4 max-w-[1200px] overflow-x-scroll no-scrollbar mt-[50px] px-[16px] pb-20">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`font-medium px-[37.5px] py-[7.7px] m-1 rounded-[38.6px] border-2 transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-[#147A31] text-white shadow-md'
                  : 'border-[#147A31] text-[#147A31] bg-white hover:bg-[#147A31] hover:text-white hover:shadow-lg'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {/* FAQ Accordion */}
          <div className="mx-auto w-full max-w-[100%]">
            <div className="space-y-4">
              {faqItems.map((item) => (
                <div key={item.id} className="rounded-2xl overflow-hidden transition-all duration-300">
                  <button
                    className="flex justify-between items-center w-full text-left focus:outline-none group p-4 hover:bg-[#f8f7ff]"
                    onClick={() => toggleAccordion(item.id)}
                    aria-expanded={expandedItems[item.id]}
                    aria-controls={item.id}
                  >
                    <h3 className="text-lg font-bold text-[#1a602d]">
                      {item.question}
                    </h3>
                    <svg
                      className={`w-6 h-6 text-[#1a602d] transform transition-transform duration-200 ${
                        expandedItems[item.id] ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <div
                    id={item.id}
                    className={`transition-all duration-300 ${
                      expandedItems[item.id] ? 'block' : 'hidden'
                    }`}
                  >
                    <div className="p-4 bg-[#f8f7ff]">
                      <p className="text-gray-600">{item.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ; 