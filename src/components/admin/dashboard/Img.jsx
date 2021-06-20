import React from "react";
import { Hidden } from "@material-ui/core";
import { DeleteButton } from "./SignUp";
function Img(props) {
  return (
    <>
      <Hidden mdDown>
        <img
          src="/img.png"
          alt="smile"
          style={{
            position: "absolute",
            width: "250px",
            height: "250px",
            transform: "rotate(19.63deg)",
            background: "transparent",
            marginTop: "100px",
          }}
        />
      </Hidden>
    </>
  );
}
export default Img;
