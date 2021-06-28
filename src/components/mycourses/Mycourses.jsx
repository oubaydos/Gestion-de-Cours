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
  let [courses, setcourses] = useState({ data: [] });
  let [profs, setProfs] = useState([]);
  let [loading, setLoading] = useState(true);

  //axios
  function removeDuplicates(data, key) {
    return [...new Map(data.map((item) => [key(item), item])).values()];
  }
  const getCourses = async () => {
    try {
      await axios
        .post(`http://localhost:5000/myCourses`, {
          headers: { "x-auth-token": localStorage.getItem("currentUser") },
        })
        .then((res) => {
          console.log(res.data);

          setcourses({
            data: removeDuplicates(res.data, (item) => item.data._id),
          });
          setLoading(false);
        });
    } catch (err) {
      console.log("error : ", err.response);
    }
  };
  //
  let i = 0;
  useEffect(() => {
    //hna bdlt chi haja latkhsr
    if (loading) getCourses();
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
                  Mes Cours
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
                  <Grid item key={card.data._id} xs={12} sm={6} md={4}>
                    <CourseCard
                      my={true}
                      link="id"
                      img={"http://localhost:5000/addPic/" + card.data.image}
                      alt="course1"
                      title={card.data.title}
                      author={card.prof}
                      rating={
                        card.data.numberOfDoneStudents == 0
                          ? card.data.rating
                          : parseFloat(
                              card.data.rating / card.data.numberOfDoneStudents
                            ).toFixed(2)
                      }
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
