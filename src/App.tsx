import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import TabBar from './components/TabBar';
import WebView from './components/WebView';
import SettingsPanel from './components/SettingsPanel';
import { Tab } from './types';
import { saveCustomDomain, loadCustomDomains, fetchGitHubContent } from './utils/electronBridge';

function App() {
  const [tabs, setTabs] = useState<Tab[]>([{ id: '1', url: 'sp://home.cool', title: 'Home' }]);
  const [activeTabId, setActiveTabId] = useState('1');
  const [showSettings, setShowSettings] = useState(false);
  const [customDomains, setCustomDomains] = useState<Record<string, string>>({});

  useEffect(() => {
    loadCustomDomains().then(setCustomDomains);
  }, []);

  const addTab = () => {
    const newTab: Tab = { id: Date.now().toString(), url: 'sp://home.cool', title: 'New Tab' };
    setTabs([...tabs, newTab]);
    setActiveTabId(newTab.id);
  };

  const closeTab = (id: string) => {
    const newTabs = tabs.filter(tab => tab.id !== id);
    setTabs(newTabs);
    if (activeTabId === id && newTabs.length > 0) {
      setActiveTabId(newTabs[newTabs.length - 1].id);
    }
  };

  const updateTab = async (tabId: string, url: string) => {
    let resolvedUrl = url;
    let title = 'Loading...';
    let content = '';

    if (url.startsWith('sp://')) {
      const domain = url.split('://')[1];
      if (customDomains[domain]) {
        resolvedUrl = customDomains[domain];
        content = await fetchGitHubContent(resolvedUrl);
        title = `${domain} - Custom Domain`;
      } else if (domain === 'home.cool') {
        content = getHomePageContent();
        title = 'Home';
      } else {
        title = 'Unknown Domain';
        content = `<h1>404 - Domain Not Found</h1><p>The domain "${domain}" is not registered.</p>`;
      }
    }

    setTabs(tabs.map(tab => tab.id === tabId ? { ...tab, url: resolvedUrl, title, content } : tab));
  };

  const handleAddDomain = async (domain: string, url: string) => {
    await saveCustomDomain(url, domain);
    setCustomDomains({ ...customDomains, [domain]: url });
  };

  const handleRemoveDomain = async (domain: string) => {
    const newDomains = { ...customDomains };
    delete newDomains[domain];
    localStorage.setItem('customDomains', JSON.stringify(newDomains));
    setCustomDomains(newDomains);
  };

  const getHomePageContent = () => {
    return `
      <html>
        <head>
          <title>Home</title>
          <style>
            body { 
              font-family: system-ui, -apple-system, sans-serif;
              max-width: 800px;
              margin: 0 auto;
              padding: 2rem;
              background: #f9fafb;
              color: #1f2937;
            }
            .container {
              background: white;
              padding: 2rem;
              border-radius: 0.5rem;
              box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            }
            h1 { 
              color: #111827;
              font-size: 2rem;
              margin-bottom: 1.5rem;
            }
            .domains {
              display: grid;
              gap: 1rem;
            }
            .domain-card {
              background: #f3f4f6;
              padding: 1rem;
              border-radius: 0.375rem;
              transition: transform 0.2s;
            }
            .domain-card:hover {
              transform: translateY(-2px);
            }
            .domain-name {
              font-weight: 600;
              color: #4f46e5;
              margin-bottom: 0.5rem;
            }
            .domain-url {
              color: #6b7280;
              font-size: 0.875rem;
              word-break: break-all;
            }
            .empty-state {
              text-align: center;
              padding: 2rem;
              color: #6b7280;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Welcome to Your Browser</h1>
            <div class="domains">
              ${Object.entries(customDomains).length > 0 
                ? Object.entries(customDomains).map(([domain, url]) => `
                    <div class="domain-card">
                      <div class="domain-name">sp://${domain}</div>
                      <div class="domain-url">${url}</div>
                    </div>
                  `).join('')
                : `<div class="empty-state">
                    <p>No custom domains registered yet.</p>
                    <p>Click the settings icon to add your first domain!</p>
                  </div>`
              }
            </div>
          </div>
        </body>
      </html>
    `;
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar
        updateTab={updateTab}
        activeTabId={activeTabId}
        toggleSettings={() => setShowSettings(!showSettings)}
      />
      <TabBar
        tabs={tabs}
        activeTabId={activeTabId}
        setActiveTabId={setActiveTabId}
        addTab={addTab}
        closeTab={closeTab}
      />
      <div className="flex flex-1 relative">
        <WebView tabs={tabs} activeTabId={activeTabId} updateTab={updateTab} />
        {showSettings && (
          <SettingsPanel
            customDomains={customDomains}
            onAddDomain={handleAddDomain}
            onRemoveDomain={handleRemoveDomain}
            onClose={() => setShowSettings(false)}
          />
        )}
      </div>
    </div>
  );
}

export default App;