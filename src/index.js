import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CustomThemeProvider from './theme';
import { CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import store from './app/store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <CustomThemeProvider>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <App />
        <Toaster
          position="top-center"
        />
      </LocalizationProvider>
    </CustomThemeProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
