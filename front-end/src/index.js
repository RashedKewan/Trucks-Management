import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style.css";

import UserProvider from "./Pages/Website/Context/UserContext";
import "@fortawesome/fontawesome-free/css/all.min.css"; 
import "mdb-react-ui-kit/dist/css/mdb.rtl.min.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'

import reportWebVitals from "./reportWebVitals";

import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import HttpApi from 'i18next-http-backend'
import i18next from 'i18next'

i18next
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'ar', 'he'],
    fallbackLng: 'en',
    debug: false,
    // Options for language detector
    detection: {
      order: ['path', 'cookie', 'htmlTag'],
      caches: ['cookie'],
    },
    react: { useSuspense: true },
    backend: {
      loadPath: '/Assets/locales/{{lng}}/translation.json',
    },
  })


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
