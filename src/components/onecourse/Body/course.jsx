import React from "react";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import Desc from "./Desc";
import Titredecours from "./Titredecours";

import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import Cpp from "../PDF/Cpp";
import App from "../vide/App"
import chap1 from "../data/chap1.pdf";
import chap2 from "../data/chap2.pdf"
import chap3 from "../data/chap3.pdf"
import chap4 from "../data/chap4.pdf"
import vid1 from "../data/vid1.mkv";
import vid2 from "../data/vid2.mkv"
import vid3 from "../data/vid3.mkv"
import vid4 from "../data/vid4.mkv"


 let index;
function pdf(id){

  switch (id){
  case 0:
  return chap1;
  case 1:
    return chap2;
  case 2:
      return chap3;
  case 4:
        return chap4;
  }
  
  
  }
  function video(i){

    switch (i){
    case 0:
    return vid1;
    case 1:
      return vid2;
    case 2:
        return vid3;
    case 4:
          return vid4;
    }
    
    
    }
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "relative",
  },
  paper: {
    padding: theme.spacing(0),
    textAlign: "left",
    color: "theme.palette.text.secondary",
    backgroundColor: "transparent",
    boxShadow: "0 0 0 0 transparent",
    position: "absolute",
    alignItems: "center",
  },
  list: {
    listStyle: "none",
  },
  li: { marginTop: "10px" },
  liButton: {
    [theme.breakpoints.down("md")]: {
      marginTop: "10%",
    },
    marginTop: "4.5%",
  },


}));




const useStyle = makeStyles((theme) => ({
  root: {
    
 
    width: "100%",
  
 

  },
  button: {
  
    
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  actionsContainer: {
    marginBottom: theme.spacing(2)
  },
  resetContainer: {
    padding: theme.spacing(3)
  }
}));
function chapnumber(nbr) {
  let s=[];
  for(let i=1;i<=nbr;i++)
 s.push("chap"+i.toString());
 
 return(s);
}
//
function chapname(id, listchap) {
  for (let i = 0; i < listchap.length; i++) {
    if (id === i) {
      return listchap[i];
    }
  }

}
let c;
function Course(props) {
   const [count, setCount] = React.useState(0);
  const classes = useStyle();

  const [activeStep, setActiveStep] = React.useState(0);
  
  const steps = chapnumber(props.chapnumber);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  
  return (
   
    <div className={classes.root}>
    



   <div>
     <div  onMouseOver={props.onMouseOver}>
       <Grid
         container direction="row">

         <Grid item xs={2} ></Grid>


         <Grid container direction="column" item xs={8}>
           <Grid item xs={8} >



             <Title  />


             <Titredecours  name={props.name}/>

           </Grid>
           <Grid item container justify="space-evenly" direction="row-reverse" xs={12}>
             <Grid item xs={2} >
               </Grid>
             <Grid item xs={10}>
               <App video={video(activeStep)} />
             </Grid>

           </Grid>
           <Grid item container justify="space-between"
alignItems="stretch"direction="row-reverse" xs={12}>
             <Grid item xs={2} >
               <Desc desc={props.desc}/>
             </Grid>
             <Grid item xs={10}>
             
               <Cpp pdf={pdf(activeStep)}/>
             </Grid>

           </Grid>

         </Grid>
         <Grid item xs={2}  >   <Stepper activeStep={activeStep}  style={{ backgroundColor:"rgba(232, 237, 243, 0)", width:"200px",height:"50%"}}
      orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <button onClick={() => {setCount(count + 1)
              }}  style={{width:"200px", background:"#C4C4C4",
              
              height:"80px" 
              
              
              }}   >{chapname(index, props.listchap)}</button>
              <div className={classes.actionsContainer}>
                <div>
                  <Button style={{background:"#0056D2", color:"white"}}
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                    
                  >
                    Back
                  </Button>
                  <Button style={{backgroundColor:"#00B9D2"}}
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                     
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography style={{color :"#0056D2" , fontSize:"10px" ,background:"rgba(196, 196, 196, 0)" }}>Bravo Tu a terminé le cours</Typography>
          <Button  style={{background:"#0056D2" , color:"white"}} onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}</Grid>
       </Grid>


     </div>
    
<>{console.log(index)}</>
   </div>
     
    </div>
  );

}
c=0;

  export const Index = () => {
  
    return (c)};

export default Course;






