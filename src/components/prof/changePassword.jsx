import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import SettingsIcon from "@material-ui/icons/Settings";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Copyright from "../usedComponents/Copyright";
import { useForm } from "react-hook-form";
import axios from "axios";
import Link from "@material-ui/core/Link";
import AddIcon from "@material-ui/icons/Add";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useHistory } from "react-router-dom";

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
    margin: theme.spacing(15, 1, 1, 1),
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
  helperText: {
    fontFamily: "Roboto",
    fontSize: "12px",
    margin: theme.spacing(0, 10, 0, 10),
    WebkitFontSmoothing: "antialiased",
    color: "#777777",
  },
  span: {
    color: theme.palette.secondary.main,
  },
}));

export default function SignUp() {
  const classes = useStyles();

  //effect-state

  useEffect(() => {
    document.body.style.overflow = "hidden";
  });
  const [sent, setSent] = useState(false);

  //react form hook :

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submitFunc = async (data) => {
    if (!errors.oldPassword && !errors.password) {
      setSent(true);
    } else {
      return;
    }
    try {
      console.log(data);
      await axios
        .post(`http://localhost:5000/prof/changePassword`, data, {
          headers: { "x-auth-token": localStorage.getItem("currentUser") },
        })
        .then(
          async (res) => {
            alert(res.status);
            console.log(res);
            //window.location.reload();
            document.location.href = "/prof/dashboard";
          },
          (err) => {
            alert("erreur de code : " + err.response.status + "\n" + err);
            console.log(err.response || err);
          }
        );
    } catch (error) {
      console.error("l9it error\n\n\n\n");
      console.log(error);
    }
  };
  login = submitFunc;
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <SettingsIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            <span className={classes.span}>Changer le mot de passe</span>
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit(submitFunc)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  className={classes.textField}
                  variant="outlined"
                  fullWidth
                  id="oldPassword"
                  label="Mot de passe ancien"
                  name="oldPassword"
                  type="password"
                  autoComplete="oldPassword"
                  {...register("oldPassword", {
                    required: true,
                    minLength: 6,
                  })}
                  helperText={
                    errors.oldPassword ? "vérifier le mot de passe svp" : ""
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.textField}
                  variant="outlined"
                  fullWidth
                  name="password"
                  label="Mot de passe"
                  id="password"
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                  })}
                  helperText={errors.password ? "mot de passe trop court" : ""}
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
              Changer
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
                l'admin est bien ajouté
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
