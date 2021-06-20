import CourseCard from "../usedComponents/Course"
import Grid from "@material-ui/core/Grid";
import Formationdesc from "./Formationdesc"
import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";

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
      left:"70%",
    top:"20%",
    position:"absolute",
    height: "100%",
    
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
function EnrollF(){
    const classes = useStyles();
return (
    
<Grid  container >
<Grid item xs={8}>

<Formationdesc  formationanme="formationname"
 formationdescreption="Welcome to the Complete Flutter App Development Bootcamp with Dart - created in collaboration with the Google Flutter team. Now includes a brand new module on Flutter State Management! Covering all the fundamental concepts for Flutter development, this is the most comprehensive Flutter course available online."

 />



</Grid>
<Grid className={classes.card} item xs={2}>
<CourseCard
  link="id"
  img="/temp.jpg"
  alt="course1"
  title="Learn Flutter 2.0"
  author="Angela Yu"
  rating={4.3}/>
  </Grid>
  
  </Grid>
)


}
export default EnrollF;