import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
let useStyle = makeStyles({
  root: {
    color: "#2b6dd1",
    float: "left",
    borderRadius: 100,
    marginRight: "20px",
    marginTop: "3px",
    fontFamily: "Comfortaa",
    fontWeight: "bold",
  },
});
function Cours() {
  let style = useStyle();
  let isStudent = localStorage.getItem("isStudent");
  isStudent === "true" ? (isStudent = true) : (isStudent = false);
  return (
    <div>
      {isStudent === true || isStudent === undefined ? (
        <Button className={style.root} size="small" href="/courses">
          Cours
        </Button>
      ) : (
        <div></div>
      )}
    </div>
  );
}
export default Cours;
