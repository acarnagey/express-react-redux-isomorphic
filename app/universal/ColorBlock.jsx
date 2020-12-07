import React from "react";

export default ({ r, g, b }) => {
  return (
    <div
      className="color-block"
      style={{
        backgroundColor: `rgb(${r}, ${g}, ${b})`,
      }}
    ></div>
  );
}
