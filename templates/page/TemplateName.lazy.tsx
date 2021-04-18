import React, { lazy, Suspense } from "react";

// import PageLoader from "../../layout/PageLoader/PageLoader";

const LazyTemplateName = lazy(() => import("./TemplateName"));

const TemplateName = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode }): JSX.Element => {
  return (
    <Suspense fallback={null}>
      {/* <Suspense fallback={<PageLoader />}> */}
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <LazyTemplateName {...props} />
    </Suspense>
  );
};

TemplateName.defaultProps = {
  children: undefined,
};

export default TemplateName;
