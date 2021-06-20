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
    if (!errors.username && !errors.password) {
      setSent(true);
    } else {
      return;
    }
    try {
      await axios.post(`http://localhost:5000/admin/register`, data).then(
        async (res) => {
          alert(res.status);
          console.log(res);
          //window.location.reload();
          document.location.href = "/admin/dashboard";
        },
        (err) => {
          let error = "";
          for (let i of err.response.data.errors) {
            error += i.param + " : " + i.msg + "\n\n";
          }
          alert("erreur de code : " + err.response.status + "\n" + error);
          console.log(error);
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
            <span className={classes.span}>Admin Panel</span>
          </Typography>
          <Typography component="h1" variant="h5">
            Ajouter un admin
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit(submitFunc)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  className={classes.textField}
                  variant="outlined"
                  fullWidth
                  id="username"
                  label="Nom d'utilisateur"
                  name="username"
                  autoComplete="username"
                  {...register("username", {
                    required: true,
                  })}
                  helperText={
                    errors.username ? "vérifier le nom d'utilisateur svp" : ""
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
              Ajouter
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
