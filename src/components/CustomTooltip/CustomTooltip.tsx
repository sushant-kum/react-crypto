/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date Jun 05 2021 13:14:51 GMT+05:30
 * @modify date Jun 05 2021 13:14:51 GMT+05:30
 * @desc CustomTooltip
 */

import { Theme, Tooltip, withStyles } from "@material-ui/core";

const CustomTooltip = withStyles((theme: Theme) => ({
  arrow: {
    color: theme.palette.grey[700],
  },
  tooltip: {
    backgroundColor: theme.palette.grey[700],
  },
}))(Tooltip);

export default CustomTooltip;
