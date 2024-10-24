import React from 'react';
import { X, Plus, Globe } from 'lucide-react';
import { Tab } from '../types';

interface TabBarProps {
  tabs: Tab[];
  activeTabId: string;
  setActiveTabId: (id: string) => void;
  addTab: () => void;
  closeTab: (id: string) => void;
}

const TabBar: React.FC<TabBarProps> = ({ tabs, activeTabId, setActiveTabId, addTab, closeTab }) => {
  return (
    <div className="flex bg-gray-200 p-1 overflow-x-auto">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`flex items-center px-3 py-1 mr-1 rounded-t-lg cursor-pointer ${
            activeTabId === tab.id ? 'bg-white' : 'bg-gray-300 hover:bg-gray-100'
          }`}
          onClick={() => setActiveTabId(tab.id)}
        >
          {tab.favicon ? (
            <img src={tab.favicon} alt="" className="w-4 h-4 mr-2" />
          ) : (
            <Globe className="w-4 h-4 mr-2" />
          )}
          <span className="max-w-xs truncate">{tab.title}</span>
          <button
            className="ml-2 p-1 rounded-full hover:bg-gray-200"
            onClick={(e) => {
              e.stopPropagation();
              closeTab(tab.id);
            }}
          >
            <X size={12} />
          </button>
        </div>
      ))}
      <button
        className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 hover:bg-gray-400"
        onClick={addTab}
      >
        <Plus size={16} />
      </button>
    </div>
  );
};

export default TabBar;