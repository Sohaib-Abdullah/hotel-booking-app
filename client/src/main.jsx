import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { SearchContextProvider } from "./context/SearchContext.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <SearchContextProvider>
        <App />
        <ToastContainer position="bottom-right" theme="dark" autoClose={3000} />
      </SearchContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
