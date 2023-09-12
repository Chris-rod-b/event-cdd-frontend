import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { EventContextProvider } from './context/EventContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <EventContextProvider>
      <App />
    </EventContextProvider>
  </React.StrictMode>
);
