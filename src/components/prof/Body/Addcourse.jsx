import React from "react";
import MyButton from "../usedComponents/MyButton";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    float: "left",
    position: "absolute",
    marginLeft: "12%",
    fontFamily: "Cascadia Code",
    width: "1000x",
    height: "35px",
  },
});

function Addcourse(props) {
  let style = useStyles();
  return (
    <MyButton
      bgColor="#0056D2"
      fgColor=" rgba(255, 255, 255, 1)"
      className={style.root}
      value=" Ajouter un cours"
      url="/prof/addCourse" //using parameters to lock the choice of prof
      //                        or student in inscription form
    />
  );
}

export default Addcourse;
