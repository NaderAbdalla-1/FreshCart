import React from "react";
import { BallTriangle } from "react-loader-spinner";

export default function Loader({ height = 100, width = 100, color = "#db2777" }) {
  return (
    <div className="flex items-center justify-center h-screen">
      <BallTriangle
        height={height}
        width={width}
        radius={5}
        color={color}
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}
