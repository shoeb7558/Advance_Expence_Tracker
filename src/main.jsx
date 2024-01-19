import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AuthContextProvider } from './Context/AuthContext.jsx';
import { Provider } from 'react-redux';
import store from './store'; // Import your Redux store

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <AuthContextProvider> 
      <React.StrictMode>
        <Provider store={store}>
        <App />
        </Provider>
      </React.StrictMode>
      </AuthContextProvider> 

);
