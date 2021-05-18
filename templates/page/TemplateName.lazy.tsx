import React, { lazy, Suspense } from "react";

// import PageLoader from "../../layout/PageLoader/PageLoader";

const TemplateName = lazy(() => import("./TemplateName"));

const TemplateNameLazy = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode }): JSX.Element => {
  return (
    <Suspense fallback={null}>
      {/* <Suspense fallback={<PageLoader />}> */}
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <TemplateName {...props} />
    </Suspense>
  );
};

TemplateNameLazy.defaultProps = {
  children: undefined,
};

export default TemplateNameLazy;
