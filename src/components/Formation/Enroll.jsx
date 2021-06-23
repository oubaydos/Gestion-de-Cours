import CourseCard from "../usedComponents/Course";
import Grid from "@material-ui/core/Grid";
import Coursedesc from "./Coursedesc";
import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { PromiseProvider } from "mongoose";

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
    left: "70%",
    top: "20%",
    position: "absolute",
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
function Enroll(props) {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={8}>
        <Coursedesc
          finished={props.finished}
          started={props.started}
          desc={props.desc}
          Coursename={props.Coursename}
          id={props.id}
        />
      </Grid>
      <Grid className={classes.card} item xs={2}>
        <CourseCard
          link={props.id}
          img={props.img}
          alt={props.alt}
          title={props.title}
          author={props.author}
          rating={props.rating}
        />
      </Grid>
    </Grid>
  );
}
export default Enroll;
