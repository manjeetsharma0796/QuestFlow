import React, { useState } from 'react';

const OpportunityTabs = () => {
  const [activeTab, setActiveTab] = useState('All Opportunities');

  const tabs = ['All Opportunities', 'Content', 'Design', 'Development', 'Other'];

  return (
    <div className="flex justify-center space-x-4 mt-8">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`py-2 px-4 rounded-full transition-all duration-300 ease-in-out ${
            activeTab === tab
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-white text-gray-600 border border-gray-300'
          }`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default OpportunityTabs;
