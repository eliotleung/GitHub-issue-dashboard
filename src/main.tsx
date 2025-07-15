import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import 'tailwindcss/tailwind.css';
import 'github-markdown-css/github-markdown.css';
import { marked } from 'marked';

// Attach marked to window for global use
(window as unknown as { marked: typeof marked }).marked = marked;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
