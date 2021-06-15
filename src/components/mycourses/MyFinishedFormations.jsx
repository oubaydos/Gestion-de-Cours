import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Header from "../homePage/header/Header";
import Menu from "./Menu";
import CourseCard from "../usedComponents/Course";
import Copyright from "../usedComponents/Copyright";
import axios from "axios";
axios.defaults.headers.post["x-auth-token"] =
  localStorage.getItem("currentUser");
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
  document.body.style.overflow = "scroll";

  const numOfItems = 15; //get from api
  const cards = Array.from({ length: numOfItems }, (_, i) => i + 1);
  const classes = useStyles();
  const [data, setData] = useState(null);

  async function getCourse() {
    await axios.post(`http://localhost:5000/myFinishedFormations`).then(
      (res) => {
        console.log("res : : : : ");
        console.log(res);
        setData(res.data);
      },
      (err) => {
        alert("error : " + err.response.data.errors);
      }
    );
  }
  useEffect(() => {
    if (data === null) {
      getCourse();
    }
  }, [data]);
  return (
    <div>
      {data === null ? (
        <div>loading</div>
      ) : (
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
                  Mes Formations Terminées
                </Typography>

                <div className={classes.heroButtons}>
                  <Grid container spacing={2} justify="center">
                    <Grid item>
                      <Menu
                        coursesLink="/mystartedcourses"
                        formationsLink="/mystartedformations"
                      />
                    </Grid>
                  </Grid>
                </div>
              </Container>
            </div>

            <Container className={classes.cardGrid} maxWidth="md">
              <Grid container spacing={4}>
                {data.map((card) => (
                  <Grid item key={card.data._id} xs={12} sm={6} md={4}>
                    <CourseCard
                      isFormation={true}
                      link="id"
                      img={"http://localhost:5000/addPic/" + card.data.image}
                      alt="course1"
                      title={card.data.title}
                      author={card.teacher}
                      rating={card.data.rating}
                      id={card.data._id}
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
      )}
    </div>
  );
}
export default Album;
/** hadchi khsr
 * ma3rftch 3lach
 * hh
 */
