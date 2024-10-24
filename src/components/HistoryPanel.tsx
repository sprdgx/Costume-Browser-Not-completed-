import React from 'react';
import { Clock } from 'lucide-react';

const HistoryPanel: React.FC = () => {
  // Mock history data
  const historyItems = [
    { id: 1, title: 'Google', url: 'https://www.google.com', timestamp: '2 hours ago' },
    { id: 2, title: 'YouTube', url: 'https://www.youtube.com', timestamp: '3 hours ago' },
    { id: 3, title: 'GitHub', url: 'https://github.com', timestamp: 'Yesterday' },
  ];

  return (
    <div className="w-64 bg-background border-l border-border overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">History</h2>
        <ul className="space-y-2">
          {historyItems.map((item) => (
            <li key={item.id} className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
              <div>
                <div className="text-sm font-medium">{item.title}</div>
                <div className="text-xs text-muted-foreground">{item.url}</div>
                <div className="text-xs text-muted-foreground">{item.timestamp}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HistoryPanel;