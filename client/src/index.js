import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
// import './index-pers.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from "./redux/store";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import { FallbackLoading } from './loader/FallbackLoading';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Localisaton
i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ['en', 'ru'],
    fallbackLng: "ru",
    detection: {
      order: ['cookie', 'localStorage', 'htmlTag', 'path', 'subdomain'],
      caches: ['cookie']
    },
    backend: {
      loadPath: '/assets/locales/{{lng}}/translation.json',
    },
  });

root.render(
  <Suspense fallback={<FallbackLoading />} >
    <Provider store={store}>
      <App />
    </Provider>
  </Suspense>
);

reportWebVitals();