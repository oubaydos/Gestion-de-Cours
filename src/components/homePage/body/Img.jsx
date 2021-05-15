import React from "react";
import { Hidden } from "@material-ui/core";
function Img(props) {
  return (
    <Hidden mdDown>
      <img src="/img.png" alt="smile" className="img" />
    </Hidden>
  );
}
export default Img;
