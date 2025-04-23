import React, { useState, useEffect } from 'react';

/**
 * TabButton component
 */
const TabButton = ({ 
  id, 
  label, 
  active, 
  onClick,
  className = '' 
}) => {
  return (
    <button
      onClick={() => onClick(id)}
      className={`font-medium px-[37.5px] py-[7.7px] m-1 rounded-[38.6px] border-2 transition-all duration-300 ${
        active
          ? 'bg-[#147A31] text-white shadow-md'
          : 'border-[#147A31] text-[#147A31] bg-white hover:bg-[#147A31] hover:text-white hover:shadow-lg'
      } ${className}`}
    >
      {label}
    </button>
  );
};

/**
 * Reusable Tabs component
 * 
 * @param {Object} props - Component props
 * @param {Array} props.tabs - Array of tab objects with id, label, and content
 * @param {string} [props.defaultTab] - ID of the default active tab
 * @param {string} [props.className] - Additional CSS classes for the container
 * @param {string} [props.tabsClassName] - Additional CSS classes for the tabs container
 * @param {string} [props.contentClassName] - Additional CSS classes for the content container
 * @param {Function} [props.onChange] - Callback when tab changes
 */
const Tabs = ({
  tabs,
  defaultTab,
  className = '',
  tabsClassName = '',
  contentClassName = '',
  onChange
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || (tabs[0] && tabs[0].id));

  useEffect(() => {
    if (defaultTab) {
      setActiveTab(defaultTab);
    }
  }, [defaultTab]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (onChange) {
      onChange(tabId);
    }
  };

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content;

  return (
    <div className={className}>
      {/* Tab Navigation */}
      <div className={`w-full mx-auto flex flex-row lg:justify-center items-center lg:gap-[12px] gap-4 max-w-[1200px] overflow-x-scroll no-scrollbar ${tabsClassName}`}>
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            id={tab.id}
            label={tab.label}
            active={activeTab === tab.id}
            onClick={handleTabChange}
          />
        ))}
      </div>

      {/* Tab Content */}
      <div className={contentClassName}>
        {activeTabContent}
      </div>
    </div>
  );
};

export default Tabs; 