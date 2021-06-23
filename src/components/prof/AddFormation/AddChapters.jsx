import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import DoneIcon from "@material-ui/icons/Done";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";

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
import Img from "./InkedCapture_LI.jpg";
let login;
let i = 0;
let addChapterlink = document.location.pathname.split("/");
addChapterlink.pop();
addChapterlink = addChapterlink.join("/") + "/addChapters";
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
    margin: theme.spacing(0, 5, 1),
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
    display: "inline",
  },
  text: {
    margin: "25px",
    fontFamily: "arial",
    fontSize: "15px",
    textShadow: "1px 1px #fff",
    display: "inline",
  },
}));

export default function SignUp() {
  const classes = useStyles();
  document.body.style.overflow = "scroll";

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [sent, setSent] = useState(false);
  const [numberOfChapters, setNumberOfChapters] = useState(0);
  const [type, setType] = useState(null);

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

  const loadNumber = async () => {
    try {
      //console.log("dkhlna");
      const newData = { id: document.location.pathname.split("/")[3] };
      await axios
        .post(`http://localhost:5000/getNumberOfCourses`, newData)
        .then(
          (res) => {
            console.log("done");
            setNumberOfChapters(res.data.numberOfCourses);
            setType(res.data.type);
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submitFunc = async (data) => {
    console.log("data \n\n");
    if (errors.course) return console.log("erreur, verifier vos données");
    //console.log(data);
    let newData = [];
    Object.entries(data).forEach(([key, value]) => newData.push(value));
    console.log(newData);

    try {
      await axios
        .post(
          `http://localhost:5000/FillFormation`,
          { id: document.location.pathname.split("/")[3], courses: newData },
          {
            headers: {
              "x-auth-token": `${localStorage.getItem("currentUser")}`,
            },
          }
        )
        .then(
          (res) => {
            console.log("done");
            setSent(true);
            console.log(res);
          },
          (err) => {
            console.log("hh");
            alert(err.response.data);
            Object.entries(err).forEach(([key, value]) =>
              console.log(key, " : ", value)
            );
          }
        );
    } catch (error) {
      return console.error("l9it error\n\n\n\n");
    }
  };
  useEffect(() => {
    if (numberOfChapters === 0) loadNumber();
  }, [numberOfChapters]);
  login = submitFunc;
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Ajouter Les cours de formation
          </Typography>
          <p
            style={{
              width: "200%",
              marginLeft: "30%",
              fontFamily: "Comfortaa",
              lineHeight: "2",
              fontSize: "15px",
              margin: "4%",
            }}
          >
            Vous devez remplir les cases suivantes avec les ids des cours <br />{" "}
            Pour trouver l'id d'un cours vous devez allez à{" "}
            <a
              href="/prof/mycourses"
              style={{
                textDecoration: "none",
                color: "#0056D2",
                fontWeight: 650,
              }}
            >
              Mes Cours
            </a>{" "}
            et choisir le cours voulu, après vous trouverez l'id dans le lien
            comme dans l'exemple suivant
            <br />
          </p>
          <img src={Img} alt="exemple" />

          <form className={classes.form} onSubmit={handleSubmit(submitFunc)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {[...Array(numberOfChapters).keys()].map((item) => (
                  <TextField
                    key={item}
                    className={classes.textField}
                    variant="outlined"
                    fullWidth
                    id={"course" + item}
                    label={"id du Cours n°" + (item + 1)}
                    name={"course" + item}
                    autoComplete={"course"}
                    {...register(`course${item}`, {
                      required: true,
                      minLength: 24,
                      maxLength: 24,
                    })}
                    helperText={
                      eval(`errors.course${item}`)
                        ? "vérifier l'un des cours svp"
                        : ""
                    }
                  />
                ))}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Ajouter Les ids
            </Button>
          </form>
          {sent && (
            <Box mt={5}>
              <div
                style={{
                  padding: "10px",
                  borderRadius: "3px 3px 3px 3px",
                  color: "#270",
                  backgroundColor: "#DFF2BF",
                }}
              >
                les cours sont bien ajouté dans la formation <DoneIcon />
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
