/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date May 16 2021 21:16:21 GMT+05:30
 * @modify date May 16 2021 21:16:21 GMT+05:30
 * @desc Hook to get current screen with breakpoint
 */

import { Theme, useTheme, useMediaQuery } from "@material-ui/core";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";

type BreakpointOrNull = Breakpoint | null;

const useScreenWidth: () => Breakpoint = (): Breakpoint => {
  const theme: Theme = useTheme();
  const keys: Breakpoint[] = [...theme.breakpoints.keys].reverse();
  return (
    keys.reduce((output: BreakpointOrNull, key: Breakpoint) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.up(key));
      return !output && matches ? key : output;
    }, null) || "xs"
  );
};

export default useScreenWidth;
