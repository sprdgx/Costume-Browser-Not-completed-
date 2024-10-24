import React, { useState } from 'react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface DomainMappingFormProps {
  onSave: (githubUrl: string, customDomain: string) => void;
}

const DomainMappingForm: React.FC<DomainMappingFormProps> = ({ onSave }) => {
  const [githubUrl, setGithubUrl] = useState('');
  const [customDomain, setCustomDomain] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (githubUrl && customDomain) {
      onSave(githubUrl, customDomain);
      setGithubUrl('');
      setCustomDomain('');
    }
  };

  return (
    <div className="w-64 bg-background border-l border-border p-4">
      <h2 className="text-lg font-semibold mb-4">Add Custom Domain</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          value={githubUrl}
          onChange={(e) => setGithubUrl(e.target.value)}
          placeholder="GitHub Raw URL"
        />
        <Input
          type="text"
          value={customDomain}
          onChange={(e) => setCustomDomain(e.target.value)}
          placeholder="Custom Domain (e.g., mysite.cool)"
        />
        <Button type="submit" className="w-full">
          Add Domain
        </Button>
      </form>
    </div>
  );
};

export default DomainMappingForm;