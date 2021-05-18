import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Typography,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import ButtonBase from "@material-ui/core/ButtonBase";
import { Link as RouterLink } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    width: 275,
  },
  title: {
    height: "5%",
    fontFamily: "Montserrat",
    fontWeight: 500,
    display: "flex",
    justifyContent: "center",
  },
  author: {
    fontFamily: "Comfortaa",
    fontWeight: 700,
    marginLeft: "4px",
  },
  mediaImg: {
    paddingTop: "70%",
  },
  by: {
    display: "flex",
    justifyContent: "center",
  },
  div: {
    display: "flex",
    justifyContent: "center",
    fontSize: "18px",
  },
}));

const CourseCard = (props) => {
  const classes = useStyles();
  const handleClick = () => {
    alert("clicked");
  };

  return (
    //component={Link} to={`/courses/${props.link}` in CardActionArea
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.mediaImg}
          image={props.img}
          title={props.alt}
        />
        <CardContent>
          <Typography
            className={classes.title}
            gutterBottom
            variant="subtitle1"
            component="h6"
          >
            {props.title}
          </Typography>
          <div className={classes.by}>
            By :
            <Typography
              className={classes.author}
              gutterBottom
              variant="subtitle2"
              component="h5"
            >
              {props.author}
            </Typography>
          </div>

          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.div}
          >
            <span style={{ marginRight: "4px", marginTop: "2px" }}>
              {props.rating}
            </span>
            <Rating
              name="half-rating"
              defaultValue={props.rating}
              precision={0.5}
            />
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CourseCard;
