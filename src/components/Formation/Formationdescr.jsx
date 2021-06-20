import { makeStyles } from "@material-ui/core/styles";

import MyButton from "../usedComponents/MyButton"
const useStyles = makeStyles({
    root: {
        top :"45%",
      float: "left",
      position: "absolute",
      marginLeft: "12%",
      fontFamily: "Cascadia Code",
      width:"1000x",
      height: "35px",
      left:"30%"
    },
    
  });
function Formationdescr (props) {
let style = useStyles();

return(
    <div>
 <p
    style={{
    
      fontFamily: "Architects Daughter",
      fontSize: "30px",
      fontWeight: 200,
     
      
      paddingRight: "100px",
    }}
    >
     Bienvenu dans une nouvelle formation
    </p> 
<p
        style={{
            fontSize: "48px",
          
         
            marginLeft: "20%",
     

lineheight: "59px",
          fontFamily: "Architects Daughter",
          top:"10%",
          fontweight:" bold",

lineheight: "59px",
        }}
      >
       {props.formationanme}
      </p>
      


  </div>
);
}








export default Formationdescr;