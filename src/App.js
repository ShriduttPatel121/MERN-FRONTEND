import React from "react";
import Main from "./Main/Main";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette : {
    primary : {
      main : '#0a4e6b',
      light : '#457a99',
      dark : '#002640'
    },
    secondary : {
      main : '#65f384',
      light : '#9dffb5',
      dark : '#20bf55'
    }
  }
})
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Main />
    </ThemeProvider>
  );
}

export default App;
