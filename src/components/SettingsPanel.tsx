import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface SettingsPanelProps {
  customDomains: Record<string, string>;
  onAddDomain: (domain: string, url: string) => void;
  onRemoveDomain: (domain: string) => void;
  onClose: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  customDomains,
  onAddDomain,
  onRemoveDomain,
  onClose,
}) => {
  const [newDomain, setNewDomain] = useState('');
  const [newUrl, setNewUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newDomain && newUrl) {
      onAddDomain(newDomain, newUrl);
      setNewDomain('');
      setNewUrl('');
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-background border-l border-border shadow-xl">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-xl font-semibold">Custom Domains</h2>
        <button
          onClick={onClose}
          className="p-1 hover:bg-secondary rounded-full"
        >
          <X size={20} />
        </button>
      </div>

      <div className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <div>
            <label className="block text-sm font-medium mb-1">Custom Domain</label>
            <Input
              type="text"
              placeholder="e.g., mysite.cool"
              value={newDomain}
              onChange={(e) => setNewDomain(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Raw GitHub URL</label>
            <Input
              type="text"
              placeholder="https://raw.githubusercontent.com/..."
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            <Plus size={16} className="mr-2" />
            Add Domain
          </Button>
        </form>

        <div className="space-y-4">
          <h3 className="font-medium">Registered Domains</h3>
          {Object.entries(customDomains).map(([domain, url]) => (
            <div
              key={domain}
              className="flex items-start justify-between p-3 bg-secondary rounded-lg"
            >
              <div className="space-y-1">
                <p className="font-medium">{domain}</p>
                <p className="text-sm text-muted-foreground break-all">{url}</p>
              </div>
              <button
                onClick={() => onRemoveDomain(domain)}
                className="p-1 hover:bg-destructive hover:text-destructive-foreground rounded"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;