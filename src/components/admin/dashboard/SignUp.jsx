import React from "react";
import MyButton from "../../usedComponents/MyButton";
import { makeStyles } from "@material-ui/core/styles";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import axios from "axios";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import SettingsIcon from "@material-ui/icons/Settings";
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
  fourth: {
    float: "right",
    position: "absolute",
    fontFamily: "Cascadia Code",
    paddingRight: "2%",
  },
  fifth: {
    float: "right",
    position: "absolute",
    fontFamily: "Cascadia Code",
    paddingRight: "2%",
  },
});

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
        alert("clicked");
        alert(res.status);
        console.log(res);
        localStorage.removeItem("currentUser");
        localStorage.removeItem("isAdmin");
        document.location.href = "/";
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
function Courses(props) {
  let style = useStyles();
  return (
    <MyButton
      bgColor="#FBEEC1"
      fgColor="black"
      className={style.root}
      value="Gérer les Cours"
      url="/admin/courses"
    />
  );
}

function Students(props) {
  let style = useStyles();
  return (
    <MyButton
      bgColor="#FBEEC1"
      fgColor="black"
      className={style.secondary}
      value="Gérer les Etudiants"
      url="/admin/students"
    />
  );
}
function Profs(props) {
  let style = useStyles();

  return (
    <MyButton
      bgColor="#FBEEC1"
      fgColor="black"
      className={style.secondary}
      value="Gérer les professeurs"
      url="/admin/profs"
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
function Add() {
  return (
    <div>
      <PersonAddIcon /> Ajouter un autre Admin
    </div>
  );
}
function DeleteButton(props) {
  let style = useStyles();
  return (
    <MyButton
      bgColor="#c81236"
      fgColor="white"
      className={style.third}
      value={<Del />}
      onClick={deleteAccount}
      size="13px"
    />
  );
}
function ChangePassword(props) {
  let style = useStyles();
  return (
    <MyButton
      bgColor="#7e7e7e"
      fgColor="white"
      className={style.fifth}
      value={
        <div>
          <SettingsIcon />
          changer le mot de passe
        </div>
      }
      url="/admin/changePassword"
      size="13px"
    />
  );
}
function AddButton(props) {
  let style = useStyles();
  return (
    <MyButton
      bgColor="#4c9a2a"
      fgColor="white"
      className={style.fourth}
      value={<Add />}
      url="/admin/newAdmin"
      size="13px"
    />
  );
}
export default Courses;
export { Students, Profs, DeleteButton, AddButton, ChangePassword };
