/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date Jun 04 2021 19:08:08 GMT+05:30
 * @modify date Jun 04 2021 19:08:08 GMT+05:30
 * @desc SnackbarContextValue
 */

export interface SnackbarContextValue {
  snackbarOpen: boolean;
  snackbarMessage: string;
  snackbarDurationMS: number;
  openSnackbar?: (message: string, durationMs?: number) => void;
  closeSnackbar?: () => void;
}
