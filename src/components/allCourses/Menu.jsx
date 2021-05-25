import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { useHistory } from "react-router-dom";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function CustomizedMenus() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [down, setDown] = React.useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setDown(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setDown(false);
  };
  const history = useHistory();
  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Trier Par
        {down ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem
          button
          onClick={() => {
            setAnchorEl(null);
            setDown(false);
            history.push("/courses");
          }}
        >
          <ListItemText primary="Cours" />
        </StyledMenuItem>
        <StyledMenuItem
          button
          onClick={() => {
            setAnchorEl(null);
            setDown(false);
            history.push("/courses?content=formations");
          }}
        >
          <ListItemText primary="Formations" />
        </StyledMenuItem>
        <StyledMenuItem
          button
          onClick={() => {
            setAnchorEl(null);
            setDown(false);
            history.push("/courses?content=sorted");
          }}
        >
          <ListItemText primary="Par Classement" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}
