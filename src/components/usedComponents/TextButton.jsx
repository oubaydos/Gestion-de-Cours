import React from "react";
import Button from "@material-ui/core/Button";

function TextButton(props) {
  let style = {
    backgroundColor: props.bgColor,
    color: props.fgColor,
    borderRadius: 100,
    float: "right",
    filter: "drop-shadow(0px 5px 5px #dbdbdb)",
    marginRight: props.margin || "20px",
  };
  return (
    <Button
      style={style}
      className={props.className}
      size="small"
      href={props.url}
    >
      {props.value}
    </Button>
  );
}
export default TextButton;
