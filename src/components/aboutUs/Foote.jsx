import React from "react";
import Copyright from "../usedComponents/Copyright";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "absolute",
width: "941px",
height: "50px",
left:" 500px",
top: "1000px",
bottom:"400px",
fontSize:"20px",



  },
  
}));

function Foote(props) {
  let style = useStyles();
  return (
    <div
      className={ style.root
      }>
   
    
              <Copyright color="#80868E" title="Gestion de cours -ENSIAS" />
      </div>    
  );
}
export default Foote;
