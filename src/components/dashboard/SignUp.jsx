import React from "react";
import MyButton from "../usedComponents/MyButton";
import { makeStyles } from "@material-ui/core/styles";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
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
  third: {
    float: "left",
    position: "absolute",
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
      value="Mes Formations et Cours"
      url="/mycourses" //using parameters to lock the choice of prof
      //                        or student in inscription form
    />
  );
}

function StartedButton(props) {
  let style = useStyles();
  return (
    <MyButton
      bgColor="#FBEEC1"
      fgColor="black"
      className={style.secondary}
      value="Mes Formations/Cours commencées"
      url="/mycourses/started"
    />
  );
}
function DoneButton(props) {
  let style = useStyles();
  return (
    <MyButton
      bgColor="#FBEEC1"
      fgColor="black"
      className={style.secondary}
      value="Mes Formations/Cours terminées"
      url="/mycourses/finished"
    />
  );
}
function Del() {
  return (
    <div>
      <DeleteForeverIcon /> Supprimer mon Compte
    </div>
  );
}
function DeleteButton(props) {
  let style = useStyles();
  return (
    <MyButton
      bgColor="red"
      fgColor="white"
      className={style.third}
      value={<Del />}
      onClick={() => alert("account deleted! :)not really")}
      size="13px"
    />
  );
}
export default SignUp;
export { StartedButton, DoneButton, DeleteButton };
