import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom"
import { ColorModeContextProvider } from "./components/ThemeContext/ThemeContext";
import { StyledEngineProvider } from '@mui/material/styles';
import App from "./components/App";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <StyledEngineProvider>
        <ColorModeContextProvider>
          <App/>
        </ColorModeContextProvider>
      </StyledEngineProvider>
    </HashRouter>
  </React.StrictMode>
);