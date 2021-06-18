import React from "react";
import Button from "@material-ui/core/Button";

function MyButton(props) {
  let style = {
    backgroundColor: props.bgColor,
    color: props.fgColor,
    float: "right",
    border: "1px solid #949494",
    filter: "drop-shadow(10px 10px 10px #dbdbdb)",
    marginRight: "10px",
    marginTop: props.marginTop || "1px",
    borderRadius: 100,
    fontSize: "12px",
    fontFamily: "Montserrat",
    fontStyle: "bold",
    minWidth: "160px",
    fontWeight: 550,
    textShadow: "1px 1px 0px #d3d3d3",
  };
  return (
    <Button
      style={style}
      variant="contained"
      color="primary"
      className={props.className}
      size="small"
      href={props.url}
      onClick={props.onClick}
    >
      {props.value}
    </Button>
  );
}
export default MyButton;
