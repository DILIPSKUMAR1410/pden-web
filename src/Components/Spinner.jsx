import React from "react";
import Loader from "react-loader-spinner";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

function Spinner(props) {
  return (
    <div className="spinner" style={style}>
      <Loader type="TailSpin" color="#10BFFF" height={80} width={80} />
    </div>
  );
}

export default Spinner;
