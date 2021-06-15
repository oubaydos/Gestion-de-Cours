import MyButton from "../usedComponents/MyButton";
import React from "react"
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
const useStyles = makeStyles({
  root: {
  
    float: "left",
    position: "absolute",
    marginLeft: "12%",
    fontFamily: "Cascadia Code",
    width:"1000x",
height: "35px",
top:"20%",
left:"10%"
  },
  
});
function Test(){
    let style = useStyles();
return(

    <div>
   
    <p
      style={{
        width: "85%",
        marginLeft: "10%",
        fontFamily: "Comfortaa",
        lineHeight: "2",
        fontSize: "17px",
        marginTop:"1%",
        marginBottom:"10%",
        color :"#144081",
        top:"60%"
      }}
    >
    
    créer le quiz ensuite donner le lien 
    </p>
    <MyButton
      bgColor="#0056D2"
      fgColor=" rgba(255, 255, 255, 1)"

      className={style.root}
      value="Acceder a google form"
      url="https://docs.google.com/forms/u/0/" //using parameters to lock the choice of prof
      //                        or student in inscription form
    />
    <React.Fragment>
     <TextField
            required
          
            id="Titre de Test"
            name="link de Test"
            label="link de Test"
            fullWidth
            autoComplete="given-name"
          />
          </React.Fragment>
          
  </div>
 







);

}
export default Test;