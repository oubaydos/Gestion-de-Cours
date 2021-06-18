import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockIcon from "@material-ui/icons/Lock";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Copyright from "../usedComponents/Copyright";
import { useForm } from "react-hook-form";
import Link from "@material-ui/core/Link";
import Upload from "./Upload";
import axios from "axios";
import FormData from "form-data";
import { useLocation } from "react-router-dom";

import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
let login;
let addChapterlink = document.location.pathname.split("/");
addChapterlink.pop();
addChapterlink = addChapterlink.join("/") + "/addCourses";
//style :

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(20),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(10),
  },
  submit: {
    margin: theme.spacing(10, 0, -4),
  },
  textField: {
    background: "white",
  },
  formControl: {
    margin: theme.spacing(1, 0, 0),
  },
  root: {
    display: "flex",
    justifyContent: "center",
  },
  label: {
    marginTop: "15px",
    marginLeft: "20px",
    marginBottom: "15px",
    fontFamily: "Montserrat",
    fontSize: "17px",
  },
  p: { margin: theme.spacing(3, 2, -4) },
  input: {
    border: "1px solid #999",
    borderRadius: "3px",
    textShadow: "1px 1px #fff",
    fontWeight: 700,
    fontSize: "10pt",
    outline: "none",
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState(null);
  const [sent, setSent] = useState(false);
  const [state, setState] = React.useState({
    prof: false,
    student: false,
  });
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const { prof, student } = state;
  const error = [prof, student].filter((v) => v).length !== 1;
  //react form hook :

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submitFunc = async (data) => {
    // if (
    //   !errors.title &&
    //   !errors.numberOfChapters &&
    //   !errors.description &&
    //   !errors.courseImage
    // ) {
    //   setSent(true);
    // } else {
    //   return;
    // }
    setSent(true);

    //console.log(data);
    let newData = new FormData();
    newData.append("file", selectedFile);
    newData.append("id", document.location.pathname.split("/")[3]);
    //newData.append("file", data.file, data.file.name);
    console.log(selectedFile);
    //console.log("hel");
    try {
      //console.log("dkhlna");
      await axios
        .post(`http://localhost:5000/addPic/formation`, newData, {
          headers: {
            accept: "application/json",
            "Accept-Language": "en-US,en;q=0.8",
            "Content-Type": `imageFile.type`,
          },
        })
        .then(
          (res) => {
            console.log("done");
            setSent(true);
            console.log(res);
          },
          (err) => {
            console.log("hh");
            Object.entries(err).forEach(([key, value]) =>
              console.log(key, " : ", value)
            );
          }
        );
    } catch (error) {
      console.error("l9it error\n\n\n\n");
    }
  };
  login = submitFunc;
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Ajouter une image de la Formation
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit(submitFunc)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <input
                  className={classes.input}
                  type="file"
                  accept="image/*"
                  placeholder="insérer l'image svp"
                  alt="file"
                  name="file"
                  id="file"
                  onInput={(e) => {
                    setSelectedFile(e.target.files[0]);
                    console.log("hellolllll");
                    console.log(e.target.files[0]);
                  }}
                  enctype="multipart/form-data"
                  {...register("file", {
                    required: true,
                  })}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Ajouter L'image
            </Button>
          </form>
          {sent && (
            <Box mt={5}>
              <div
                style={{
                  padding: "10px",
                  marginBottom: "-20px",
                  borderRadius: "3px 3px 3px 3px",
                  color: "#270",
                  backgroundColor: "#DFF2BF",
                }}
              >
                l'image est bien ajouté! vous pouvez ajouter des cours ici :
                <br />
                <a
                  href={addChapterlink}
                  style={{
                    textDecoration: "none",
                    color: "black",
                    fontWeight: 450,
                  }}
                >
                  Ajouter Des Cours !
                </a>
              </div>
            </Box>
          )}

          <Box mt={5}>
            <Link href="/">
              <Copyright title="Gestion de Cours - ENSIAS" color="black" />
            </Link>
          </Box>
        </div>
      </Container>
    </div>
  );
}
