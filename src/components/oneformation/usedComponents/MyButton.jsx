import React from "react";
import Button from "@material-ui/core/Button";

function MyButton(props) {
  let style = {
    backgroundColor: props.bgColor,
    color: props.fgColor,
    /*float: "right",
    filter: "drop-shadow(0px 5px 5px #dbdbdb)",
    marginRight: "10px",
    marginTop: "1px",
    borderRadius: 100,
    fontSize: "12px",
    fontFamily: "Montserrat",
    fontStyle: "bold",
    minWidth: "130px",*/
  };
  return (
    <Button
      style={style}
      variant="contained"
      color="primary"
      className={props.className}
      size="small"
      href={props.url}
    >
      {props.value}
    </Button>
  );
}
export default MyButton;
