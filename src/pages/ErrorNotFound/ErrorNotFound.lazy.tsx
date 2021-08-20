/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date Jul 01 2021 16:48:15 GMT+05:30
 * @modify date Aug 20 2021 17:33:42 GMT+05:30
 * @desc ErrorNotFoundLazy
 */

import React, { lazy, Suspense } from "react";

import PageLoader from "../../components/PageLoader/PageLoader";

const ErrorNotFound = lazy(() => import("./ErrorNotFound"));

const ErrorNotFoundLazy = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode }): JSX.Element => {
  return (
    <Suspense fallback={<PageLoader />}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <ErrorNotFound {...props} />
    </Suspense>
  );
};

ErrorNotFoundLazy.defaultProps = {
  children: undefined,
};

export default ErrorNotFoundLazy;
