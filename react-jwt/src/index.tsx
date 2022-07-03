import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import {Provider} from 'react-redux';
import store from './store';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginPage from './pages/login';
import SignUp from './pages/sign-up';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<App />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-center" />
    </Provider>
  </React.StrictMode>
);
