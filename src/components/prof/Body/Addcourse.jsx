import React from "react";
import MyButton from "../usedComponents/MyButton";
import { makeStyles } from "@material-ui/core/styles";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import axios from "axios";
import SettingsIcon from "@material-ui/icons/Settings";

const useStyles = makeStyles({
  root: {
    float: "left",
    position: "absolute",
    marginLeft: "12%",
    fontFamily: "Cascadia Code",
    width: "1000x",
    height: "35px",
  },
  third: {
    position: "absolute",
    float: "right",
    right: "100px",
    fontFamily: "Cascadia Code",
    paddingRight: "2%",
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
function AddFormation(props) {
  let style = useStyles();
  return (
    <MyButton
      bgColor="#0056D2"
      fgColor=" rgba(255, 255, 255, 1)"
      className={style.root}
      value=" Ajouter une formation"
      url="/prof/addFormation" //using parameters to lock the choice of prof
      //                        or student in inscription form
    />
  );
}
function DeleteButton(props) {
  async function deleteAccount() {
    try {
      let a = localStorage.getItem("currentUser");
      if (a !== null && a !== undefined) {
        axios.defaults.headers.common["x-auth-token"] = a;
      } else {
        alert("token problem :)");
        return;
      }
      await axios.delete(`http://localhost:5000/deleteAccount`).then(
        (res) => {
          alert(res.status);
          console.log(res);
          localStorage.removeItem("currentUser");
          localStorage.removeItem("isStudent");

          window.location.href = "/";
        },
        (err) => {
          alert("clicked err");

          console.log(err);
        }
      );
    } catch (error) {
      console.error("l9it error\n\n\n\n");
    }
  }
  let style = useStyles();
  return (
    <MyButton
      bgColor="#c81236"
      fgColor="white"
      className={style.third}
      value="Supprimer mon Compte"
      startIcon={<DeleteForeverIcon />}
      onClick={deleteAccount}
      fontSize="13px"
    />
  );
}
function ChangePassword(props) {
  let style = useStyles();
  return (
    <MyButton
      bgColor="#7e7e7e"
      fgColor="white"
      className={style.third}
      startIcon={<SettingsIcon />}
      value="changer le mot de passe"
      url="/prof/changePassword"
      fontSize="13px"
      marginTop="-50px"
      marginRight="0px"
    />
  );
}
export default Addcourse;
export { DeleteButton, AddFormation, ChangePassword };
