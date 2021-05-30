/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date Apr 17 2021 21:24:27 GMT+05:30
 * @modify date May 30 2021 18:40:22 GMT+05:30
 * @desc App root component
 */

import {
  createMuiTheme,
  CssBaseline,
  IconButton,
  PaletteType,
  Slide,
  Snackbar,
  Theme,
  ThemeProvider,
  useMediaQuery,
} from "@material-ui/core";
import { CloseRounded } from "@material-ui/icons";
import axios, { AxiosResponse } from "axios";
import localForage from "localforage";
import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import "./App.scss";
import DarkModeContext, { darkModeContextInitialState } from "./contexts/DarkMode";
import Layout from "./layout/Layout/Layout";
import { DarkMode } from "./models/DarkMode";
import LocalForageKeys from "./models/LocalForage";
import DashboardLazy from "./pages/Dashboard/Dashboard.lazy";
import palette from "./styles/constants/palette/palette.module.scss";

interface VersionInfo {
  version: string;
  buildTimestamp: number;
}

const App: React.FC = () => {
  const prefersDarkMode: boolean = useMediaQuery("(prefers-color-scheme: dark)");
  const [darkModeSelection, darkModeSelectionSet]: [DarkMode, React.Dispatch<React.SetStateAction<DarkMode>>] =
    useState<DarkMode>(darkModeContextInitialState.darkModeSelection ?? prefersDarkMode);
  const [verionInfoErrorSnackbarOpen, verionInfoErrorSnackbarOpenSet] = useState<boolean>(false);

  const darkModeSelectionUpdate: (selection: DarkMode) => void = (selection) => {
    darkModeSelectionSet(selection);
    localForage.setItem(LocalForageKeys.SETTINGS__GLOBAL__DARK_MODE, selection);
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
    localForage.getItem<DarkMode>(LocalForageKeys.SETTINGS__GLOBAL__DARK_MODE).then((darkMode) => {
      darkModeSelectionUpdate(darkMode ?? prefersDarkMode);
    });
  }, [prefersDarkMode]);

  useEffect(() => {
    axios
      .get<VersionInfo>("/assets/version-info.json")
      .then((res: AxiosResponse<VersionInfo>) => res.data)
      .then((data: VersionInfo) => {
        if (data?.version && data?.buildTimestamp) {
          verionInfoErrorSnackbarOpenSet(false);
          // eslint-disable-next-line no-console
          console.log(`Version: ${data.version}, Built time: ${new Date(data.buildTimestamp)}`);
        }
      })
      .catch(() => {
        verionInfoErrorSnackbarOpenSet(true);
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <DarkModeContext.Provider value={{ darkModeSelection, darkModeSelectionUpdate }}>
          <Layout>
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/dashboard" />} />

              <Route exact path="/dashboard">
                <DashboardLazy />
              </Route>
            </Switch>
          </Layout>
        </DarkModeContext.Provider>
      </BrowserRouter>

      <Snackbar
        open={verionInfoErrorSnackbarOpen}
        onClose={() => verionInfoErrorSnackbarOpenSet(false)}
        autoHideDuration={6000}
        TransitionComponent={Slide}
        message="Something went wrong! Please refresh to try again..."
        action={
          <>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => verionInfoErrorSnackbarOpenSet(false)}
            >
              <CloseRounded fontSize="small" />
            </IconButton>
          </>
        }
      />
    </ThemeProvider>
  );
};

export default App;
