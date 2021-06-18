/**
 *mifta7 hh :
 * note empty : "vous n'avez pas encore corrigé le quiz";
 * currentChapter empty : "l'etudiant a terminer le cours"
 */

import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "@fontsource/roboto";
import { Typography } from "@material-ui/core";
import axios from "axios";
import MyButton from "../usedComponents/MyButton";
axios.defaults.headers.post["x-auth-token"] =
  localStorage.getItem("currentUser");
Number.prototype.padLeft = function (base, chr) {
  var len = String(base || 10).length - String(this).length + 1;
  return len > 0 ? new Array(len).join(chr || "0") + this : this;
};
const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
    //rightMargin: "50px",
  },
  root: {
    position: "absolute",
    float: "center",
    //marginLeft: "12%",
  },
  title: {
    fontFamily: "montserrat",
    color: "rgba(0, 86, 210, 1)",
    fontWeight: 500,
    margin: theme.spacing(20, 70, 5),
    fontSize: "50px",
    "&:hover": {
      textShadow: "1px 1px 0px black",
    },
  },
  head: {
    fontWeight: 600,
    fontSize: "15px",
    backgroundColor: "#FFFFE0",
  },
}));

export default function BasicTable() {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  let [data, setData] = useState([]);
  let [newMark, setNewMark] = useState(null);
  let [changeMark, setChangeMark] = useState(false);
  let setMark = async (email, mark) => {
    try {
      await axios
        .post("http://localhost:5000/setTestMark", {
          id: document.location.pathname.split("/")[3],
          email,
          mark,
        })
        .then((res) => window.location.reload());
    } catch (e) {
      alert("erreur de serveur");
      console.log(e);
    }
  };
  let getData = async () => {
    try {
      await axios
        .post("http://localhost:5000/getCourseStudents", {
          id: document.location.pathname.split("/")[3],
        })
        .then((res) => {
          let temp = res.data.students;
          for (let i of temp) {
            if (i.currentChapter === undefined) {
              i.currentChapter = "";
            } else {
              i.currentChapter++;
            }

            if (i.finishingTime !== undefined) {
              let d = new Date(i.finishingTime - i.startingTime);
              i.duration = `${
                d.getDate() -
                1 +
                " jours et " +
                " " +
                [
                  d.getHours().padLeft(),
                  d.getMinutes().padLeft(),
                  d.getSeconds().padLeft(),
                ].join(":")
              }`;
            } else {
              let d = new Date(new Date().getTime() - i.startingTime);
              i.duration = `${
                d.getDate() -
                1 +
                " jours et " +
                " " +
                [
                  d.getHours().padLeft(),
                  d.getMinutes().padLeft(),
                  d.getSeconds().padLeft(),
                ].join(":")
              }`;
            }
            if (i.startingTime !== undefined) {
              let d = new Date(i.startingTime);
              i.startingTime = `${
                [
                  (d.getMonth() + 1).padLeft(),
                  d.getDate().padLeft(),
                  d.getFullYear(),
                ].join("/") +
                " " +
                [
                  d.getHours().padLeft(),
                  d.getMinutes().padLeft(),
                  d.getSeconds().padLeft(),
                ].join(":")
              }`;
            }
            if (i.finishingTime !== undefined) {
              let d = new Date(i.finishingTime);
              i.finishingTime = `${
                [
                  (d.getMonth() + 1).padLeft(),
                  d.getDate().padLeft(),
                  d.getFullYear(),
                ].join("/") +
                " " +
                [
                  d.getHours().padLeft(),
                  d.getMinutes().padLeft(),
                  d.getSeconds().padLeft(),
                ].join(":")
              }`;
            }
          }
          setData(
            temp //temp;
          );
          setLoading(false);
          //(false);
          console.log("dataa\n", data.students, "\nres\n", res.data);
        });
    } catch (e) {
      alert("erreur de serveur");
      console.log(e);
    }
  };

  useEffect(() => {
    if (loading) getData();
  }, [loading]);
  document.body.style.overflow = "scroll";
  return (
    <div className={classes.root}>
      <Typography variant="h1" className={classes.title}>
        Mes Etudiant
      </Typography>
      {loading ? (
        <div>loading...</div>
      ) : (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.head} align="center">
                  Etudiant
                </TableCell>
                <TableCell className={classes.head} align="center">
                  Email
                </TableCell>
                <TableCell className={classes.head} align="center">
                  Date de début du cours
                </TableCell>
                <TableCell className={classes.head} align="center">
                  le dernier chapitre vu
                </TableCell>
                <TableCell className={classes.head} align="center">
                  Date de fin du cours
                </TableCell>
                <TableCell className={classes.head} align="center">
                  a Laissé une note ?
                </TableCell>
                <TableCell className={classes.head} align="center">
                  durée d'apprentissage
                </TableCell>
                <TableCell className={classes.head} align="center">
                  Note de quiz /20
                </TableCell>
                {changeMark && (
                  <TableCell className={classes.head} align="center">
                    Nouvelle Note /20
                  </TableCell>
                )}
                <TableCell className={classes.head} align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.email}>
                  <TableCell component="th">{row.etudiant}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">{row.startingTime}</TableCell>
                  <TableCell align="center">{row.currentChapter}</TableCell>
                  <TableCell align="center">{row.finishingTime}</TableCell>
                  <TableCell align="center">
                    {row.rated ? "oui" : "non"}
                  </TableCell>
                  <TableCell align="center">{row.duration}</TableCell>
                  <TableCell align="center">{row.mark}</TableCell>
                  {changeMark && row.finished ? (
                    <TableCell align="center">
                      <input
                        onChange={(e) => {
                          setNewMark(e.target.value);
                        }}
                      />
                    </TableCell>
                  ) : (
                    changeMark && <TableCell align="center"></TableCell>
                  )}
                  <TableCell align="center">
                    <MyButton
                      bgColor="white"
                      fgColor="rgba(0,86,210,1)"
                      value={changeMark ? "valider la note" : "changer la note"}
                      onClick={() => {
                        if (changeMark) {
                          setMark(row.email, newMark);
                          setNewMark(null);
                          setChangeMark(false);
                        } else {
                          setChangeMark(true);
                        }

                        //setMark(row.email);
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell align="center">
                  Notes : <br /> Explication du cas où une cellule est vide
                </TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center">
                  l'etudiant n'a pas encore commencé le cours
                </TableCell>
                <TableCell align="center">
                  l'etudiant n'a pas encore commencé/a dèja fini le cours
                </TableCell>
                <TableCell align="center">
                  l'etudiant n'a pas encore fini le cours
                </TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center">
                  vous n'avez pas encore corriger les quiz
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
/*

*/
