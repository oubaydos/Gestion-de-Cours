import React from "react";
import MyButton from "../usedComponents/MyButton";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    Top: "100px",
    fontFamily: "Cascadia Code",
    width: "1000x",
    height: "35px",
  },
});
/*const useStyles = makeStyles({
    root: {
   position:"absolute",
      marginTop:"40px",
      marginLeft: "50%",
      fontFamily: "Cascadia Code",
      width:"1000x",
      height: "35px",
    
    },
    
  });*/

function Test(props) {
  let style = useStyles();
  return (
    <MyButton
      bgColor="#0056D2"
      fgColor=" rgba(255, 255, 255, 1)"
      className={style.root}
      value="Passer le test"
      url={props.test} //using parameters to lock the choice of prof
      //                        or student in inscription form
    />
  );
}

export default Test;
