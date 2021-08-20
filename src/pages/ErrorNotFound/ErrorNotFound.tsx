/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date Jul 01 2021 16:48:44 GMT+05:30
 * @modify date Aug 20 2021 17:34:06 GMT+05:30
 * @desc ErrorNotFound
 */

import { Button, Divider, Typography } from "@material-ui/core";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";
import { ArrowBackIosRounded, DashboardRounded } from "@material-ui/icons";
import classNames from "classnames";
import PropTypes from "prop-types";
import React, { Dispatch, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import productLogo from "../../assets/images/logo.svg";
import titleBase from "../../constants/AppStates";
import useScreenWidth from "../../hooks/useScreenWidth";
import { StoreDispatch } from "../../store";
import { setAppSubtitle } from "../../store/appStates/appSubTitle";

import styles from "./ErrorNotFound.module.scss";

const ErrorNotFound: React.FC<React.HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const screenWidth: Breakpoint = useScreenWidth();
  const history = useHistory();
  const dispatch: Dispatch<StoreDispatch> = useDispatch<Dispatch<StoreDispatch>>();

  useEffect(() => {
    dispatch(setAppSubtitle("Page Not Found"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classNames(styles.ErrorNotFound, props.className)} data-testid="ErrorNotFound">
      <section className={styles.ErrorNotFound__content}>
        <section className={styles.ErrorNotFound__content__title}>
          <img
            className={styles.ErrorNotFound__content__title__logo}
            src={productLogo}
            width="40"
            height="40"
            alt={titleBase}
          />
          <Typography className={styles.ErrorNotFound__content__title__text} variant="h5" color="primary">
            {titleBase}
          </Typography>
        </section>

        <Typography className={styles.ErrorNotFound__content__404} variant="h1">
          404
        </Typography>

        {screenWidth === "xs" ? (
          <Divider className={styles.ErrorNotFound__content__divider} orientation="horizontal" />
        ) : (
          <Divider className={styles.ErrorNotFound__content__divider} orientation="vertical" />
        )}

        <section className={styles.ErrorNotFound__content__body}>
          <Typography className={styles.ErrorNotFound__content__body__heading} variant="h5">
            SORRY!
          </Typography>
          <Typography className={styles.ErrorNotFound__content__body__text}>
            The Page You&apos;re Looking For Was Not Found
          </Typography>
          <section className={styles.ErrorNotFound__content__body__actions}>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<ArrowBackIosRounded />}
              onClick={() => history.goBack()}
            >
              Go Back
            </Button>

            {screenWidth !== "xs" && (
              <Button
                variant="contained"
                color="primary"
                disableElevation
                endIcon={<DashboardRounded />}
                component={Link}
                to="/dashboard"
              >
                Go to Dashboard
              </Button>
            )}
          </section>
        </section>
      </section>
    </div>
  );
};

ErrorNotFound.propTypes = {
  className: PropTypes.string,
};

ErrorNotFound.defaultProps = {
  className: undefined,
};

export default ErrorNotFound;
