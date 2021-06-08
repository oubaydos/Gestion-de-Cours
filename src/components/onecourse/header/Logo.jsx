import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

let useStyle = makeStyles({
  root: {
    backgroundColor: "transparent",
    color: "rgba(0, 86, 210, 1)",
    float: "left",
    radius: 0,
    marginRight: "20px",
    fontFamily: "montserrat",
    fontSize: "15px",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
});
function Logo() {
  let style = useStyle();
  return (
    <Button disableRipple className={style.root} size="small" href="/">
      Gestion de Cours
    </Button>
  );
}
export default Logo;
