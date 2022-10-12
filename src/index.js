import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"
import { ColorModeContextProvider } from "./components/ThemeContext/ThemeContext";
import { StyledEngineProvider } from '@mui/material/styles';
import App from "./components/App";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <StyledEngineProvider>
        <ColorModeContextProvider>
          <App/>
        </ColorModeContextProvider>
      </StyledEngineProvider>
    </BrowserRouter>
  </React.StrictMode>
);