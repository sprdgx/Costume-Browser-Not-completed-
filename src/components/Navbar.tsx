import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Home, Search, Globe, Star, Settings } from 'lucide-react';

interface NavbarProps {
  updateTab: (tabId: string, url: string) => void;
  activeTabId: string;
  toggleSettings: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ updateTab, activeTabId, toggleSettings }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTabId) {
      updateTab(activeTabId, url);
    }
    setUrl('');
  };

  return (
    <nav className="flex items-center p-2 bg-gray-800 text-white">
      <div className="flex space-x-2">
        <button className="p-1 hover:bg-gray-700 rounded"><ArrowLeft size={20} /></button>
        <button className="p-1 hover:bg-gray-700 rounded"><ArrowRight size={20} /></button>
        <button className="p-1 hover:bg-gray-700 rounded"><RotateCw size={20} /></button>
        <button className="p-1 hover:bg-gray-700 rounded" onClick={() => updateTab(activeTabId, 'sp://home.cool')}><Home size={20} /></button>
      </div>
      <form onSubmit={handleSubmit} className="flex-1 flex items-center mx-4">
        <div className="relative flex-1">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Search or enter URL (e.g., sp://website.cool)"
            className="w-full py-1 px-3 pr-10 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <Search size={18} className="text-gray-400" />
          </button>
        </div>
      </form>
      <div className="flex space-x-2">
        <button className="p-1 hover:bg-gray-700 rounded"><Star size={20} /></button>
        <button className="p-1 hover:bg-gray-700 rounded"><Globe size={20} /></button>
        <button 
          className="p-1 hover:bg-gray-700 rounded"
          onClick={toggleSettings}
        >
          <Settings size={20} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;