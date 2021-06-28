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
  let [courses, setcourses] = useState({ data: [] });
  let [profs, setProfs] = useState([]);
  let [loading, setLoading] = useState(true);
  //axios
  const getCourses = async () => {
    try {
      await axios
        .get(`http://localhost:5000/allFormations`)

        .then((res) => {
          console.log(res.data);
          setcourses({ data: res.data });
          setLoading(false);
        });
    } catch (err) {
      console.log("error : ", err, "\n", err.response);
    }
  };
  //
  let i = 0;
  useEffect(() => {
    if (loading) setTimeout(getCourses, 500);
  }, [loading]);
  return (
    <div>
      {loading ? (
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
                  Formations
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
                {courses.data.map((card) => (
                  <Grid item key={card.item._id} xs={12} sm={6} md={4}>
                    <CourseCard
                      all={true}
                      isFormation={true}
                      link="id"
                      img={"http://localhost:5000/addPic/" + card.item.image}
                      alt="course1"
                      title={card.item.title}
                      author={card.prof}
                      rating={
                        card.item.numberOfDoneStudents === undefined ||
                        card.item.numberOfDoneStudents === 0
                          ? 0
                          : parseFloat(
                              card.item.rating / card.item.numberOfDoneStudents
                            ).toFixed(2)
                      }
                      id={card.item._id}
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
