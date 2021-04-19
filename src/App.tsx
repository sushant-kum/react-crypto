import { createMuiTheme, CssBaseline, PaletteType, Theme, ThemeProvider, useMediaQuery } from "@material-ui/core";
import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import "./App.scss";
import DarkModeContext, { darkModeContextInitialState } from "./contexts/DarkMode";
import Layout from "./layout/Layout/Layout";
import { DarkMode } from "./models/DarkMode";
import LocalStorageKeys from "./models/LocalStorage";
import palette from "./styles/constants/palette/palette.module.scss";

const App: React.FC = () => {
  const prefersDarkMode: boolean = useMediaQuery("(prefers-color-scheme: dark)");
  const [darkModeSelection, darkModeSelectionSet]: [
    DarkMode,
    React.Dispatch<React.SetStateAction<DarkMode>>
  ] = useState<DarkMode>(darkModeContextInitialState.darkModeSelection ?? prefersDarkMode);
  const darkModeSelectionUpdate: (selection: boolean) => void = (selection: boolean): void => {
    darkModeSelectionSet(selection);
    window.localStorage.setItem(LocalStorageKeys.CONFIG__DARKMODE, selection ? "true" : "false");
  };
  const themeType: (selection: DarkMode, preference: boolean) => PaletteType | undefined = (selection, preference) => {
    return selection ?? preference ? "dark" : "light";
  };
  const theme: Theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          primary: {
            light: palette.primaryLight,
            main: palette.primaryMain,
            dark: palette.primaryDark,
            contrastText: palette.primaryContrastText,
          },
          secondary: {
            light: palette.secondaryLight,
            main: palette.secondaryMain,
            dark: palette.secondaryDark,
            contrastText: palette.secondaryContrastText,
          },
          type: themeType(darkModeSelection, prefersDarkMode),
        },
      }),
    [darkModeSelection, prefersDarkMode]
  );

  useEffect(() => {
    if (prefersDarkMode && !window.localStorage.getItem(LocalStorageKeys.CONFIG__DARKMODE)) {
      darkModeSelectionUpdate(prefersDarkMode);
    }
  }, [prefersDarkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <DarkModeContext.Provider value={{ darkModeSelection, darkModeSelectionUpdate }}>
          <Layout>
            <Switch>
              <Route exact path="/">
                <Redirect to="/dashboard" />
              </Route>
              {/* <Route exact path="/notes">
              <Notes />
            </Route> */}
            </Switch>
          </Layout>
        </DarkModeContext.Provider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
