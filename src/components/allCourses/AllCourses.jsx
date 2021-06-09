import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Header from "../homePage/header/Header";
import Menu from "./Menu";
import Cours from "../onecourse/Cours";
import CourseCard from "../usedComponents/Course";
import Copyright from "../usedComponents/Copyright";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
    display: "grid",
    placeItems: "center",
    fontSize: "18px",
  },
}));
function Album() {
  const numOfItems = 15; //get from api
  const cards = Array.from({ length: numOfItems }, (_, i) => i + 1);
  const classes = useStyles();
  // const [gotRst, setgotRst] = useState(false);
  // let courses = [];
  //axios
  // const getCourses = async () => {
  //   try {
  //     axios.get(`http://localhost:5000/allCourses`).then(
  //       (res) => {
  //         console.log(res.data);
  //         courses = res.data;
  //         setgotRst(true);
  //       },
  //       (err) => {
  //         let error = "";
  //         for (let i of err.response.data.errors) {
  //           error += i.param + " : " + i.msg + "\n\n";
  //         }
  //         alert("erreur de code : " + err.response.status + "\n" + error);
  //         console.log(error);
  //       }
  //     );
  //   } catch (error) {
  //     console.error("l9it error\n\n\n\n");
  //   }
  // };
  // //
  // let i = 0;
  // useEffect(() => getCourses(), [gotRst]);
  return (
    <div>
      <React.Fragment>
        <CssBaseline />
        <header>
          <Header />
        </header>

        <main>
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                Cours et Formations
              </Typography>

              <div className={classes.heroButtons}>
                <Grid container spacing={2} justify="center">
                  <Grid item>
                    <Menu />
                  </Grid>
                </Grid>
              </div>
            </Container>
          </div>
          <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={4}>
              {cards.map((card) => (
                <Grid item key={card} xs={12} sm={6} md={4}>
                  <CourseCard
                    link="id"
                    img="/temp.jpg"
                    alt="course1"
                    title="Learn Flutter 2.0"
                    author="Angela Yu"
                    rating={4.3}
                    id={card}
                  />
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
        <Link href="/" underline="none">
          <div className={classes.footer}>
            <Copyright title="Gestion de Cours" color="black" />
          </div>
        </Link>
      </React.Fragment>
    </div>
  );
}
export default Album;
