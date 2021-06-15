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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loadNumber = async () => {
    try {
      //console.log("dkhlna");
      const newData = { id: document.location.pathname.split("/")[3] };
      await axios
        .post(`http://localhost:5000/getNumberOfChapters`, newData)
        .then(
          (res) => {
            console.log("done");
            setNumberOfChapters(res.data.numberOfChapters);
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
  const submitFunc = async (data) => {
    setSent(true);

    //console.log(data);
    let newData = new FormData();
    let breakOut = false;
    newData.append("id", document.location.pathname.split("/")[3]);
    for (let f of selectedFiles) {
      if (breakOut) return alert("erreur:");
      newData.append(`file`, f);
      try {
        await axios
          .post(`http://localhost:5000/addChapter`, newData, {
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
              newData.delete("file");
            },
            (err) => {
              console.log("hh");
              Object.entries(err).forEach(([key, value]) =>
                console.log(key, " : ", value)
              );
            }
          );
      } catch (error) {
        return console.error("l9it error\n\n\n\n");
      }
    }
  };

  useEffect(() => {
    if (numberOfChapters === 0) loadNumber();
  }, [numberOfChapters]);
  login = submitFunc;
  return (
    <div>
      {numberOfChapters ? (
        <div>
          <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <AddIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Ajouter une image de cours
              </Typography>

              <form
                className={classes.form}
                onSubmit={handleSubmit(submitFunc)}
              >
                <Grid container spacing={2}>
                  {[...Array(numberOfChapters).keys()].map((item) => (
                    <div style={{ textAlign: "center" }}>
                      <Grid item xs={12}>
                        <Typography
                          component="p"
                          variant="p"
                          className={classes.text}
                        >
                          Chapitre n° {item + 1}
                        </Typography>
                        <input
                          className={classes.input}
                          type="file"
                          accept={
                            type === "video" ? "video/*" : "application/pdf"
                          }
                          placeholder="insérer l'image svp"
                          alt={"file" + item}
                          name={"file" + item}
                          id={"file" + item}
                          onInput={(e) => {
                            setSelectedFiles([
                              ...selectedFiles,
                              e.target.files[0],
                            ]);
                            console.log("hellolllll");
                            console.log(e.target.files[0]);
                          }}
                          enctype="multipart/form-data"
                          {...register(`file ${item}`, {
                            required: true,
                          })}
                        />
                      </Grid>
                    </div>
                  ))}
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
                    l'image est bien ajouté! vous pouvez ajouter des chapitres
                    ici :
                    <br />
                    <a
                      href={addChapterlink}
                      style={{
                        textDecoration: "none",
                        color: "black",
                        fontWeight: 450,
                      }}
                    >
                      Ajouter Des Chapitres !
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
      ) : (
        <div>
          <CircularProgress />
        </div>
      )}
    </div>
  );
}
