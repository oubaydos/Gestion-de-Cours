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
import DeleteIcon from "@material-ui/icons/Delete";
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
  let [newDeleting, setNewDeleting] = useState(null);
  let [validateDel, setChangeDeleting] = useState(false);
  let setDeleting = async (email) => {
    try {
      await axios
        .post("http://localhost:5000/deleteStudent", {
          email,
        })
        .then((res) => window.location.reload());
    } catch (e) {
      alert("erreur de serveur");
      console.log(e);
    }
  };
  let getData = async () => {
    try {
      await axios.get("http://localhost:5000/allStudents").then((res) => {
        let temp = res.data;
        for (let i of temp) {
          i.name = i.firstName + " " + i.lastName;
          i.nbrCours =
            i.enrolledCourses.length +
            i.startedCourses.length +
            i.finishedCourses.length;
          i.nbrFormations =
            i.enrolledFormations.length +
            i.startedFormations.length +
            i.finishedFormations.length;
        }
        setData(temp);
        setLoading(false);
        console.log("dataa\n", data, "\nres\n", res.data);
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
        Les Etudiant
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
                  Nombre de cours
                </TableCell>
                <TableCell className={classes.head} align="center">
                  Nombre de formations
                </TableCell>

                <TableCell className={classes.head} align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.email}>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">{row.nbrCours}</TableCell>
                  <TableCell align="center">{row.nbrFormations}</TableCell>
                  <TableCell align="center">
                    <MyButton
                      weight={validateDel ? 900 : 500}
                      bgColor={validateDel ? "#ff0f0f" : "white"}
                      fgColor={validateDel ? "white" : "rgba(0,86,210,1)"}
                      value={
                        validateDel ? (
                          <div>
                            <DeleteIcon />
                            valider
                          </div>
                        ) : (
                          "supprimer"
                        )
                      }
                      onClick={() => {
                        if (validateDel) {
                          setDeleting(row.email, newDeleting);
                          setNewDeleting(null);
                          setChangeDeleting(false);
                        } else {
                          setChangeDeleting(true);
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
                <TableCell align="center">Notes :</TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center">
                  le nombre des cours dont l'etudiant est inscrit
                </TableCell>
                <TableCell align="center">
                  le nombre des formations dont l'etudiant est inscrit
                </TableCell>
                <TableCell align="center">
                  Supprimer le compte de l'etudiant
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
