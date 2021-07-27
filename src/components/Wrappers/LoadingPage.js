import React, { useState } from "react";
import ClimbingBoxLoader from "react-spinners";
import CircularProgress from "@material-ui/core/CircularProgress";
import { css } from "@emotion/react";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const LoadingPage = ({loading}) => {

  return (
    <div
    >
      {loading ? <CircularProgress /> : <div></div>}
      {/* <ClimbingBoxLoader color={color} loading={loading} /> o7 */}
    </div>
  );
};

export default LoadingPage;
