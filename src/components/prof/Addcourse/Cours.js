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
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import PublishIcon from "@material-ui/icons/Publish";
let login;
//style :
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(2, 0, -4),
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
}));

export default function SignUp() {
  const classes = useStyles();

  const [sent, setSent] = useState(false);
  const [state, setState] = React.useState({
    video: false,
    pdf: false,
  });
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const { video, pdf } = state;
  const error = [video, pdf].filter((v) => v).length !== 1;
  //react form hook :

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submitFunc = async (data) => {
    if (
      !errors.title &&
      !errors.numberOfChapters &&
      !errors.description &&
      !errors.courseImage
    ) {
      console.log("hh");
    } else {
      return;
    }
    data.type = state.pdf ? "pdf" : "video";
    data.instructor = "60c4b232ddf6f93128f57637";
    console.log(data);

    try {
      console.log("dkhlna");
      await axios
        .post(`http://localhost:5000/addCourse`, data, {
          headers: {
            "x-auth-token": `${localStorage.getItem("currentUser")}`,
          },
        })
        .then(
          (res) => {
            setSent(true);
            console.log("hh");
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
            <PublishIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Ajouter Un Cours
          </Typography>
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
                Le cours est bien Ajouté, svp visiter{" "}
                <a style={{ textDecoration: "none" }} href="/prof/mycourses">
                  Mes Cours
                </a>{" "}
                et choisir le nouveau cours pour remplir les details de ce cours
              </div>
            </Box>
          )}
          <form className={classes.form} onSubmit={handleSubmit(submitFunc)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  className={classes.textField}
                  variant="outlined"
                  fullWidth
                  id="title"
                  label="Titre"
                  name="title"
                  autoComplete="title"
                  {...register("title", {
                    required: true,
                  })}
                  helperText={errors.title ? "le titre est obligatoire" : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.textField}
                  variant="outlined"
                  fullWidth
                  name="numberOfChapters"
                  label="Nombre de Chapitres"
                  id="numberOfChapters"
                  {...register("numberOfChapters", {
                    required: true,
                    pattern: /^[0-9\b]+$/,
                  })}
                  helperText={
                    errors.numberOfChapters
                      ? "le nombre de chapitres est obligatoire et doit contenir seulement des chiffres"
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  multiline
                  rows={7}
                  className={classes.textField}
                  variant="outlined"
                  fullWidth
                  name="description"
                  label="Description"
                  id="description"
                  {...register("description", {
                    required: true,
                  })}
                  helperText={
                    errors.description ? "la description est obligatoire" : ""
                  }
                />
              </Grid>
              {/* <Grid item xs={12}>
                
                <input
                  type="file"
                  // onChange={this.onFileChange}
                  accept="image/*"
                  placeholder="insérer l'image svp"
                  alt="image"
                  name="courseImage"
                  id="courseImage"
                  {...register("courseImage", {
                    required: true,
                  })}
                />
              </Grid> */}
            </Grid>
            <div className={classes.root}>
              <FormControl
                required
                error={error}
                component="fieldset"
                className={classes.formControl}
              >
                <FormLabel component="legend" className={classes.formLabel}>
                  Choisir un seul choix svp!
                </FormLabel>
                <label className={classes.label}>
                  le type des chapitres dans ce cours:{" "}
                </label>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={pdf}
                        onChange={handleChange}
                        name="pdf"
                      />
                    }
                    label="Pdf"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={video}
                        onChange={handleChange}
                        name="video"
                      />
                    }
                    label="Video"
                  />
                </FormGroup>
              </FormControl>
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Ajouter Ce Cours
            </Button>
          </form>

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
