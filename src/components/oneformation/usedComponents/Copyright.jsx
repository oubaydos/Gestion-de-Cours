import React from "react";

function Copyright(props) {
  return (
    <div style={{ color: props.color ? props.color : "rgb(9, 64, 141)" }}>
      &copy; {new Date().getFullYear()} Copyright : {props.title}
    </div>
  );
}
export default Copyright;
