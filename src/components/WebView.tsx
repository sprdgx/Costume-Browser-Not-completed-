import React from 'react';
import { Tab } from '../types';

interface WebViewProps {
  tabs: Tab[];
  activeTabId: string;
  updateTab: (tabId: string, url: string) => void;
}

const WebView: React.FC<WebViewProps> = ({ tabs, activeTabId, updateTab }) => {
  const activeTab = tabs.find(tab => tab.id === activeTabId);

  if (!activeTab) {
    return <div className="flex-grow bg-background flex items-center justify-center text-muted-foreground">No active tab</div>;
  }

  if (activeTab.content) {
    return (
      <div className="flex-grow bg-background">
        <iframe
          srcDoc={activeTab.content}
          className="w-full h-full border-none"
          title={activeTab.title}
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    );
  }

  return (
    <div className="flex-grow bg-background">
      <iframe
        src={activeTab.url}
        className="w-full h-full border-none"
        title={activeTab.title}
        onLoad={(e) => {
          const iframe = e.target as HTMLIFrameElement;
          updateTab(activeTabId, iframe.src);
        }}
      />
    </div>
  );
};

export default WebView;