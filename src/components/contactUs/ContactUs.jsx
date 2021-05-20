import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Copyright from "../usedComponents/Copyright";
import { useForm } from "react-hook-form";
import axios from "axios";
import DoneIcon from "@material-ui/icons/Done";
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
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  textField: {
    background: "white",
  },
}));

//component :

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
    if (
      !errors.email &&
      !errors.firstName &&
      !errors.lastName &&
      !errors.message
    ) {
      setSent(true);
    }
    console.log(data);
    setSent(true);
    try {
      await axios.post(`http://localhost:5000/contact`, {
        text: JSON.stringify(data),
      });
    } catch (error) {
      console.error("l9it error\n\n\n\n");
    }
  };

  //return

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PermContactCalendarIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Contactez-nous
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit(submitFunc)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  className={classes.textField}
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  fullWidth
                  id="firstName"
                  label="Prénom"
                  autoFocus
                  {...register("firstName", {
                    required: true,
                    pattern: /^[A-Za-z]+$/i,
                  })}
                  helperText={errors.firstName ? "vérifier le prénom svp" : ""}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  className={classes.textField}
                  variant="outlined"
                  fullWidth
                  id="lastName"
                  label="Nom"
                  name="lastName"
                  autoComplete="lname"
                  {...register("lastName", {
                    required: true,
                    pattern: /^[A-Za-z]+$/i,
                  })}
                  helperText={errors.lastName ? "vérifier le nom svp" : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.textField}
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  {...register("email", {
                    required: true,
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  })}
                  helperText={errors.email ? "vérifier l'email svp" : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.textField}
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={7}
                  name="message"
                  label="Message"
                  id="message"
                  {...register("message", {
                    required: true,
                    minLength: 2,
                  })}
                  helperText={errors.message ? "message trop court" : ""}
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
              Submit
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
                votre message est envoyé <DoneIcon />
              </div>
            </Box>
          )}
          <Box mt={5}>
            <Copyright title="Gestion de Cours - ENSIAS" color="black" />
          </Box>
        </div>
      </Container>
    </div>
  );
}
// u need to restart each time : setSent
