/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date Apr 17 2021 21:24:27 GMT+05:30
 * @modify date Aug 11 2021 21:18:04 GMT+05:30
 * @desc App root component
 */

import {
  createTheme,
  CssBaseline,
  IconButton,
  Slide,
  Snackbar,
  Theme,
  ThemeProvider,
  useMediaQuery,
} from "@material-ui/core";
import { CloseRounded } from "@material-ui/icons";
import axios, { AxiosResponse } from "axios";
import localforage from "localforage";
import React, { Dispatch, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";

import "./App.scss";
import SnackbarContext, { snackbarInitialState } from "./contexts/Snackbar";
import Layout from "./layout/Layout/Layout";
import LocalForageKeys from "./models/LocalForage";
import DashboardLazy from "./pages/Dashboard/Dashboard.lazy";
import { StoreDispatch } from "./store";
import { getThemeTypeSelector, setThemeType, ThemeType } from "./store/settings/themeType";
import palette from "./styles/constants/palette/palette.module.scss";

interface VersionInfo {
  version: string;
  buildTimestamp: number;
}

const App: React.FC = () => {
  const prefersDarkMode: boolean = useMediaQuery("(prefers-color-scheme: dark)");
  const dispatch: Dispatch<StoreDispatch> = useDispatch<Dispatch<StoreDispatch>>();
  const themeType: ThemeType = useSelector(getThemeTypeSelector);
  const [snackbarOpen, snackbarOpenSet]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] =
    useState<boolean>(false);
  const [snackbarMessage, snackbarMessageSet]: [string, React.Dispatch<React.SetStateAction<string>>] =
    useState<string>("");
  const [snackbarDurationMS, snackbarDurationMSSet]: [number, React.Dispatch<React.SetStateAction<number>>] =
    useState<number>(0);

  const closeSnackbar: () => void = () => {
    snackbarOpenSet(snackbarInitialState.snackbarOpen);
    setTimeout(() => {
      snackbarMessageSet(snackbarInitialState.snackbarMessage);
      snackbarDurationMSSet(snackbarInitialState.snackbarDurationMS);
    }, 225);
  };

  const openSnackbar: (message: string, durationMs?: number) => void = (message, durationMs) => {
    if (snackbarOpen) {
      closeSnackbar();
      setTimeout(() => {
        snackbarOpenSet(true);
        snackbarMessageSet(message);
        snackbarDurationMSSet(durationMs !== undefined && durationMs >= 0 ? durationMs : 0);
      }, 300);
    } else {
      snackbarOpenSet(true);
      snackbarMessageSet(message);
      snackbarDurationMSSet(durationMs !== undefined && durationMs >= 0 ? durationMs : 0);
    }
  };

  const theme: Theme = useMemo(
    () =>
      createTheme({
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
          error: {
            light: palette.errorLight,
            main: palette.errorMain,
            dark: palette.errorDark,
            contrastText: palette.errorContrastText,
          },
          success: {
            light: palette.successLight,
            main: palette.successMain,
            dark: palette.successDark,
            contrastText: palette.successContrastText,
          },
          type: themeType,
        },
      }),
    [themeType]
  );

  useEffect(() => {
    localforage.getItem<ThemeType>(LocalForageKeys.SETTINGS__GLOBAL__THEME_TYPE).then((type: ThemeType | null) => {
      dispatch(setThemeType(type ?? (prefersDarkMode ? "dark" : "light")));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersDarkMode]);

  useEffect(() => {
    axios
      .get<VersionInfo>("/assets/version-info.json")
      .then((res: AxiosResponse<VersionInfo>) => res.data)
      .then((data: VersionInfo) => {
        if (data?.version && data?.buildTimestamp) {
          closeSnackbar();
          // eslint-disable-next-line no-console
          console.log(`Version: ${data.version}, Built time: ${new Date(data.buildTimestamp)}`);
        }
      })
      .catch(() => {
        openSnackbar("Something went wrong! Please refresh to try again...", 6000);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <QueryParamProvider ReactRouterRoute={Route}>
          <SnackbarContext.Provider
            value={{ snackbarOpen, snackbarMessage, snackbarDurationMS, openSnackbar, closeSnackbar }}
          >
            <Layout>
              <Switch>
                <Route exact path="/" render={() => <Redirect to="/dashboard" />} />

                <Route exact path="/dashboard">
                  <DashboardLazy />
                </Route>
              </Switch>
            </Layout>
          </SnackbarContext.Provider>
        </QueryParamProvider>
      </BrowserRouter>

      <Snackbar
        open={snackbarOpen}
        onClose={() => closeSnackbar()}
        autoHideDuration={snackbarDurationMS || undefined}
        TransitionComponent={Slide}
        message={snackbarMessage}
        action={
          <>
            <IconButton size="small" aria-label="close" color="inherit" onClick={() => closeSnackbar()}>
              <CloseRounded fontSize="small" />
            </IconButton>
          </>
        }
      />
    </ThemeProvider>
  );
};

export default App;
