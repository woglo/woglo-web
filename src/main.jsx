import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import TagManager from 'react-gtm-module'
import './index.css'
import { Toaster } from 'sonner'

const gtmId = 'G-1F8CN96GZY'; 

const Root = () => {
  useEffect(() => {
    TagManager.initialize({ gtmId });
  }, []);

  return (
    <React.StrictMode>
      <Toaster richColors position="top-right" />
      <App />
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);
