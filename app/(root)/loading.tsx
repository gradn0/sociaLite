import React from "react";
import { ClipLoader } from "react-spinners";

const loading = () => {
  return (
    <ClipLoader
      loading={true}
      size={40}
      color="grey"
      aria-label="Loading Spinner"
      data-testid="loader"
      className="p-2"
    />
  );
};

export default loading;
