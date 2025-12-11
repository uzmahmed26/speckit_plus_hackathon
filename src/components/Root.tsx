// frontend/src/components/Root.tsx
import React, { ReactNode } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

interface RootProps {
  children: ReactNode;
}

export default function Root({ children }: RootProps): ReactNode {
  const { siteConfig } = useDocusaurusContext();

  // Inject API keys and backend URL into window for client-side use
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).GEMINI_API_KEY = siteConfig.customFields?.geminiApiKey;
      (window as any).BACKEND_API_URL = siteConfig.customFields?.backendApiUrl || 'http://localhost:8000';
    }
  }, [siteConfig]);

  return <>{children}</>;
}