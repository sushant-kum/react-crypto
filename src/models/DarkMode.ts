/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date Apr 19 2021 18:17:11 GMT+05:30
 * @modify date Apr 19 2021 18:17:11 GMT+05:30
 * @desc Data models related to dark mode
 */

export type DarkMode = boolean | undefined;

/**
 * Data model for DarkModeContext value
 *
 * @author Sushant Kumar<sushant.kumar@soroco.com>
 * @export
 * @interface DarkModeContextValue
 */
export interface DarkModeContextValue {
  darkModeSelection: DarkMode;
  darkModeSelectionUpdate?: (selection: boolean) => void;
}
