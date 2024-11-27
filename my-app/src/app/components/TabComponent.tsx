import { useState } from 'react';
import { FaMoneyBillWave } from 'react-icons/fa'; // Assuming the emoji in the image represents money

const TabComponent = () => {
    const [activeTab, setActiveTab] = useState('Open');

    const tabs = ['Open', 'In Review', 'Completed'];

    return (
        <div className="border-b border-gray-300 flex items-center justify-between w-full px-4">
            <div className="flex items-center space-x-4">
                {/* Icon and Bounties Text */}
                <div className="flex items-center space-x-1">
                    <FaMoneyBillWave className="text-2xl" />
                    <span className="font-semibold text-lg">Bounties</span>
                </div>

                {/* Tab Navigation */}
                {tabs.map((tab) => (
                    <div
                        key={tab}
                        className={`cursor-pointer px-4 py-2 relative ${activeTab === tab ? 'font-semibold text-black' : 'text-gray-500'}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                        {activeTab === tab && (
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500" />
                        )}
                    </div>
                ))}
            </div>

            {/* View All Link */}
            <a href="#" className="text-blue-500 text-sm hover:underline">View All</a>
        </div>
    );
};

export default TabComponent;
