/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date May 16 2021 21:20:12 GMT+05:30
 * @modify date May 19 2021 13:05:08 GMT+05:30
 * @desc DashboardLazy component
 */

import React, { lazy, Suspense } from "react";

import PageLoader from "../../components/PageLoader/PageLoader";

const Dashboard = lazy(() => import("./Dashboard"));

const DashboardLazy = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode }): JSX.Element => {
  return (
    <Suspense fallback={<PageLoader />}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Dashboard {...props} />
    </Suspense>
  );
};

DashboardLazy.defaultProps = {
  children: undefined,
};

export default DashboardLazy;
