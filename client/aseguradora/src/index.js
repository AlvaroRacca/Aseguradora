// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { PhotoProvider } from './components/Foto/PhotoContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <PhotoProvider>  {/* Envuelve tu aplicación con PhotoProvider */}
        <App />
      </PhotoProvider>
    
  </React.StrictMode>,
  document.getElementById('root')
);
