import axios from 'axios';

export const fetchPageTitle = async (url: string): Promise<string> => {
  try {
    const response = await axios.get(url);
    const match = response.data.match(/<title>(.*?)<\/title>/);
    return match ? match[1] : url;
  } catch (error) {
    console.error('Error fetching page title:', error);
    return url;
  }
};

export const saveCustomDomain = async (githubUrl: string, customDomain: string): Promise<void> => {
  // In a real Electron app, this would interact with the main process
  // For now, we'll use localStorage to persist the data
  const domains = JSON.parse(localStorage.getItem('customDomains') || '{}');
  domains[customDomain] = githubUrl;
  localStorage.setItem('customDomains', JSON.stringify(domains));
  console.log(`Saved custom domain: ${customDomain} -> ${githubUrl}`);
};

export const loadCustomDomains = async (): Promise<Record<string, string>> => {
  // In a real Electron app, this would interact with the main process
  // For now, we'll use localStorage to retrieve the data
  const domains = JSON.parse(localStorage.getItem('customDomains') || '{}');
  return domains;
};

export const fetchGitHubContent = async (url: string): Promise<string> => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching GitHub content:', error);
    return `
      <html>
        <head>
          <title>Error</title>
        </head>
        <body>
          <h1>Error fetching content</h1>
          <p>Unable to load content from ${url}</p>
        </body>
      </html>
    `;
  }
};