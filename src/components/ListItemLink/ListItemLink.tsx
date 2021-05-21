/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date Apr 24 2021 18:14:19 GMT+05:30
 * @modify date May 21 2021 12:34:29 GMT+05:30
 * @desc ListItemLink
 */

import { ListItem, ListItemProps } from "@material-ui/core";
import { Omit } from "@material-ui/types";
import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useMemo } from "react";
import { Link, LinkProps } from "react-router-dom";

import styles from "./ListItemLink.module.scss";

interface ListItemLinkProps extends React.HTMLAttributes<HTMLElement> {
  to: string;
  button?: never;
  component?: React.ForwardRefExoticComponent<unknown>;
}

const ListItemLink: React.FC<ListItemProps<"li", ListItemLinkProps>> = ({ children, to, ...props }) => {
  const renderLink = useMemo(
    () =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      React.forwardRef<any, Omit<LinkProps, "to">>((itemProps, ref) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <Link to={to} key={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <li key={to} data-testid="ListItemLink">
      <ListItem
        className={classNames(styles.ListItemLink, props.className)}
        button
        component={renderLink}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      >
        {children}
      </ListItem>
    </li>
  );
};

ListItemLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

ListItemLink.defaultProps = {
  className: undefined,
};

export default ListItemLink;
