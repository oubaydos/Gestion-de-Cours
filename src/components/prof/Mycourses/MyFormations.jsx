import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
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
  let [courses, setcourses] = useState([]);
  let [profs, setProfs] = useState([]);
  let [loading, setLoading] = useState(true);

  //axios
  const getCourses = async () => {
    try {
      await axios.post(`http://localhost:5000/myFormations`).then(
        (res) => {
          courses = res.data;
          setcourses(res.data);
          setLoading(false);
          courses.map((item) => {
            console.log(item);
          });
        },
        (err) => {
          alert("err");
          if (err) console.log(err);
        }
      );
    } catch (err) {
      // let error = "";
      // for (let i of err.response.data.errors) {
      //   error += i.param + " : " + i.msg + "\n\n";
      // }
      // alert("erreur de code : " + err.response.status + "\n" + error);
      console.log(err);
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
        <div style={{ position: "fixed", top: "50%", left: "50%" }}>
          loading
        </div>
      ) : (
        <React.Fragment>
          <CssBaseline />

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
                  Mes Formations
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
                {courses.map((card) => (
                  <Grid item key={card.data._id} xs={12} sm={6} md={4}>
                    <CourseCard
                      isFormation={true}
                      link="id"
                      img={"http://localhost:5000/addPic/" + card.data.image}
                      alt="course1"
                      title={card.data.title}
                      author={card.prof}
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
