import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Ensure Open Graph and Twitter image URLs use the active host origin if deployed on custom domain
if (typeof window !== 'undefined') {
  const origin = window.location.origin;
  const setMetaAttr = (selector: string, attr: string, value: string) => {
    const el = document.querySelector(selector);
    if (el) el.setAttribute(attr, value);
  };
  setMetaAttr('meta[property="og:url"]', 'content', window.location.href);
  setMetaAttr('meta[property="og:image"]', 'content', `${origin}/og-image.jpg`);
  setMetaAttr('meta[property="og:image:secure_url"]', 'content', `${origin}/og-image.jpg`);
  setMetaAttr('meta[name="twitter:image"]', 'content', `${origin}/og-image.jpg`);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
