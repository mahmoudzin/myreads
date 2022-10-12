import React, {useState, useMemo, createContext} from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';


export const ColorModeContext = createContext("light");

export const ColorModeContextProvider = ({children}) => {
  
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(()=> ({
      toggleColorMode: () => {
          setMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
      },
      mode
  }), [mode]);

  const theme = useMemo (
      ()=> createTheme ({
        palette: {
          primary: {
            main: mode === 'light' ? '#efe5da' : '#262829',
          },
          secondary:{
            main: '#9182b9',
          },
          error:{
            main: '#f06267'
          },
          background: {
          ...(mode === 'dark' ? 
              {
                default: '#1f2021',
                paper: '#262829',
              } 
              :{
                default: '#fcf8f5',
                paper: '#efe5da',
            }),
          },
          text: {
          ...(mode === 'light' ? 
              {
                primary: '#7e6b63',
                secondary: '#bba38f',
              }
              :{
                primary: '#fec903',
                secondary: '#fff',
              }),
            },
          }, 
          makePointer:{
            cursor: 'pointer',
          }           
      }), [mode]);
      
  return (
      <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
              {children}
          </ThemeProvider>
      </ColorModeContext.Provider>
  );
};