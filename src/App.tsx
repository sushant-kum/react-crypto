/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date Apr 17 2021 21:24:27 GMT+05:30
 * @modify date May 16 2021 21:24:27 GMT+05:30
 * @desc App root component
 */

import { createMuiTheme, CssBaseline, PaletteType, Theme, ThemeProvider, useMediaQuery } from "@material-ui/core";
import localForage from "localforage";
import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import "./App.scss";
import DarkModeContext, { darkModeContextInitialState } from "./contexts/DarkMode";
import Layout from "./layout/Layout/Layout";
import { DarkMode } from "./models/DarkMode";
import LocalForageKeys from "./models/LocalForage";
import Dashboard from "./pages/Dashboard/Dashboard.lazy";
import palette from "./styles/constants/palette/palette.module.scss";

const App: React.FC = () => {
  const prefersDarkMode: boolean = useMediaQuery("(prefers-color-scheme: dark)");
  const [darkModeSelection, darkModeSelectionSet]: [
    DarkMode,
    React.Dispatch<React.SetStateAction<DarkMode>>
  ] = useState<DarkMode>(darkModeContextInitialState.darkModeSelection ?? prefersDarkMode);

  const darkModeSelectionUpdate: (selection: DarkMode) => void = (selection: DarkMode): void => {
    darkModeSelectionSet(selection);
    localForage.setItem(LocalForageKeys.CONFIG__DARKMODE, selection);
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
    localForage.getItem<DarkMode>(LocalForageKeys.CONFIG__DARKMODE).then((darkMode) => {
      darkModeSelectionUpdate(darkMode ?? prefersDarkMode);
    });
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
              <Route exact path="/dashboard">
                <Dashboard />
              </Route>
            </Switch>
          </Layout>
        </DarkModeContext.Provider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
