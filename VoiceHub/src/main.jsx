import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { Provider } from "react-redux";
import store from './redux/store/store'
import { CloudinaryContext } from 'cloudinary-react';

const { VITE_CLOUD_NAME } = import.meta.env;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <CloudinaryContext cloudName={VITE_CLOUD_NAME}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CloudinaryContext>
    </Provider>
  </React.StrictMode>,
)
