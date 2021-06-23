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
  //axios
  const getCourses = async () => {
    try {
      await axios
        .all([
          axios.get(`http://localhost:5000/allProfs`),
          axios.get(
            `http://localhost:5000/searchCourse/${
              window.location.href.split("/")[
                window.location.href.split("/").length - 1
              ]
            }`
          ),
        ])
        .then(
          axios.spread((data1, data2) => {
            //hadchi 3rfto mkhrb9
            console.log(data2.data);
            setProfs(data1.data);
            console.log(data1.data);
            // setcourses((arr) => (arr = data2.data));
            let temp = data2.data;

            console.log("hello ");
            // console.log(courses);
            for (let j = 0; j < temp.length; j++) {
              for (let k = 0; k < profs.length; k++) {
                if (profs[k]._id === temp[j].instructor) {
                  temp[j].prof = profs[k].firstName + " " + profs[k].lastName;
                  console.log(temp[i].prof);
                }
              }
            }

            console.log("courses :  : ");
            console.log(temp);
            //courses.data = temp;
            setcourses({ data: temp });
            courses.data = temp;

            console.log(courses);
          })
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
    if (courses.data.length === 0 && profs.length === 0) getCourses();
  }, [courses]);
  return (
    <div>
      {courses.data.length === 0 && profs.length === 0 ? (
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
                  Cours
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
                  <Grid item key={card._id} xs={12} sm={6} md={4}>
                    <CourseCard
                      link="id"
                      img={"http://localhost:5000/addPic/" + card.image}
                      alt="course1"
                      title={card.title}
                      author={card.prof}
                      rating={card.rating}
                      id={card._id}
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
