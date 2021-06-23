import React from "react";
import Button from "@material-ui/core/Button";

function MyButton(props) {
  let style = {
    backgroundColor: props.bgColor,
    color: props.fgColor,
    float: "right",
    filter: "drop-shadow(0px 5px 5px #dbdbdb)",
    marginRight: props.marginRight || "10px",
    marginTop: props.marginTop || "1px",

    borderRadius: 100,
    fontSize: props.fontSize || "12px",
    fontFamily: "Montserrat",
    fontStyle: "bold",
    minWidth: "130px",
  };
  if (props.style !== undefined) {
    style = { ...style, ...props.style };
  }
  return (
    <Button
      style={style}
      variant="contained"
      color="primary"
      className={props.className}
      size={props.size || "small"}
      href={props.url}
      startIcon={props.startIcon}
      onClick={props.onClick}
    >
      {props.value}
    </Button>
  );
}
export default MyButton;
