import React from "react";
import MyButton from "../../usedComponents/MyButton";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    float: "left",
    position: "absolute",
    marginLeft: "12%",
    fontFamily: "Cascadia Code",
  },
  secondary: {
    float: "left",
    position: "absolute",
    marginLeft: "12%",
    fontFamily: "Cascadia Code",
    paddingRight: "2%",
  },
});

function SignUp(props) {
  let style = useStyles();
  return (
    <MyButton
      bgColor="#FBEEC1"
      fgColor="black"
      className={style.root}
      value="devenir Enseignant"
      url="/signup?prof=true" //using parameters to lock the choice of prof
      //                        or student in inscription form
    />
  );
}

function SecondButton(props) {
  let style = useStyles();
  return (
    <MyButton
      bgColor="lightblue"
      fgColor="black"
      className={style.secondary}
      value="devenir Etudiant"
      url="/signup?prof=false"
    />
  );
}
export default SignUp;
export { SecondButton };
