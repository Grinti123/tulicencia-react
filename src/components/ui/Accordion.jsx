import React, { useState } from 'react';

/**
 * Accordion Item Component 
 */
const AccordionItem = ({ 
  title, 
  content, 
  isOpen, 
  onClick,
  titleClassName = '',
  contentClassName = ''
}) => {
  return (
    <div className="rounded-2xl overflow-hidden transition-all duration-300 w-full">
      <button
        className="flex justify-between items-center w-full text-left focus:outline-none group p-3 px-10 md:p-4 hover:bg-[#f8f7ff]"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <h3 className={`text-base md:text-lg font-bold text-[#1a602d] pr-4 ${titleClassName}`}>
          {title}
        </h3>
        <svg
          className={`flex-shrink-0 w-5 h-5 md:w-6 md:h-6 text-[#1a602d] transform transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
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
        className={`transition-all duration-300 ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        <div className={`p-3 md:p-4 bg-[#f8f7ff] ${contentClassName}`}>
          {typeof content === 'string' ? (
            <p className="text-gray-600 text-sm md:text-base">{content}</p>
          ) : (
            content
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Reusable Accordion component
 * 
 * @param {Object} props - Component props
 * @param {Array} props.items - Array of items with title and content
 * @param {boolean} [props.allowMultiple=false] - Whether multiple items can be open at once
 * @param {string} [props.className] - Additional CSS classes for the accordion container
 * @param {string} [props.titleClassName] - Additional CSS classes for all titles
 * @param {string} [props.contentClassName] - Additional CSS classes for all content sections
 */
const Accordion = ({
  items,
  allowMultiple = false,
  className = '',
  titleClassName = '',
  contentClassName = ''
}) => {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (id) => {
    if (allowMultiple) {
      setOpenItems(prev => ({
        ...prev,
        [id]: !prev[id]
      }));
    } else {
      setOpenItems(prev => {
        // If item is already open, close it
        if (prev[id]) {
          return { [id]: false };
        }
        // Otherwise close all and open this one
        return { [id]: true };
      });
    }
  };

  return (
    <div className={`space-y-3 md:space-y-4 w-full ${className}`}>
      {items.map((item, index) => (
        <AccordionItem
          key={item.id || index}
          title={item.title || item.question}
          content={item.content || item.answer}
          isOpen={!!openItems[item.id || index]}
          onClick={() => toggleItem(item.id || index)}
          titleClassName={titleClassName}
          contentClassName={contentClassName}
        />
      ))}
    </div>
  );
};

export default Accordion; 