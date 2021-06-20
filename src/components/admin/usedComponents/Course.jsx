import { makeStyles } from "@material-ui/core/styles";

import {
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Typography,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { Link as RouterLink } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    width: 275,
    [theme.breakpoints.down("md")]: {
      width: 200,
    },
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
    marginTop: "2px",
  },
  mediaImg: {
    paddingTop: "70%",
  },
  bydiv: {
    display: "flex",
    justifyContent: "center",
  },
  div: {
    display: "flex",
    justifyContent: "center",
    fontSize: "18px",
  },
  By: {
    fontFamily: "Comfortaa",
    fontSize: "15px",
    fontWeight: 400,
  },
}));

const CourseCard = (props) => {
  const classes = useStyles();
  let href = () => {
    if (props.isFormation === undefined || props.isFormation === false) {
      return `/admin/courses/${props.id}`;
    } else {
      return `/admin/formations/${props.id}`;
    }
  };
  return (
    <RouterLink to={href()} style={{ textDecoration: "none" }}>
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
            <div className={classes.bydiv}>
              <Typography
                className={classes.By}
                gutterBottom
                variant="subtitle2"
                component="h5"
              >
                Prof :
              </Typography>
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
                readOnly
              />
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </RouterLink>
  );
};

export default CourseCard;
