import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import TagManager from 'react-gtm-module'
import './index.css'
import { Toaster } from 'sonner'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './utils/store.js'
import { Provider } from 'react-redux';

const gtmId = 'G-1F8CN96GZY'; 

const Root = () => {
  useEffect(() => {
    TagManager.initialize({ gtmId });
  }, []);

  return (
    <React.StrictMode>
      <Toaster richColors position="top-right" />
      <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
      </PersistGate>
      </Provider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);
