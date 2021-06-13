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
import Test from "./Test";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import MyButton from "../usedComponents/MyButton"
import Cpp from "../Support/Cpp";
import App from "../Support/App"




 let index;






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
 
  const handleStay = () => {
    setActiveStep((prevActiveStep) => prevActiveStep );
  };
  const handleReset = () => {
    setActiveStep(0);
  };
  /* <App video={props.listvideo[activeStep]} />*/
  if(props.type=="video")
  return (
   
    <div className={classes.root}>
    



   <div>
     <div  onMouseOver={props.onMouseOver}>
       <Grid
         container direction="row">

         <Grid item xs={2} ></Grid>


         <Grid container direction="row" item xs={8}>
         <Grid item xs={8} >



             <Title  />
</Grid>
             <Grid item xs={8} >
             <Titredecours  name={props.name}/>

           </Grid>
           <Grid item container justify="space-evenly" direction="row" xs={12}>
             <Grid item xs={10}>
             <App video={props.listvideo[activeStep]} />
             </Grid>

         <Grid item xs={2}  >   <Stepper activeStep={activeStep}  
         style={{ backgroundColor:"rgba(232, 237, 243, 0)", 
         width:"200px",height:"50%",marginTop :"10%"}}
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
                  
                    {activeStep === steps.length - 1 ? 
                
                  <></>:
                  <Button style={{backgroundColor:"#00B9D2"}}
                    variant="contained"
                    color="primary"
                    
                    onClick={handleNext}
                    className={classes.button}
                   
                     >
                    next</Button>}
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
     
      </Grid>
      </Grid>
     
              
               
      </Grid>
           
      <Grid item xs={8} >
               <Desc desc={props.desc}/>
             
             </Grid>
             
             <Grid item xs={2} ></Grid>   
       
</Grid>

     </div>
    

   </div>
 
   {activeStep === steps.length-1 && (
        <div>
        <Grid
  container
  direction="row"  justify="center"


>
         <Grid item xs={4}>
          <Button  style={{backgroundColor:"#0056D2", color:"white",
          fontFamily: "Cascadia Code",
    width:"1000x",
    height: "35px",
   left:"30%"
          
          }} 
          onClick={handleReset}  variant="contained"
      color="primary"
     
      size="small"
          variant="contained" className={classes.button}>
            Reset
          </Button>
          </Grid>
          <Grid item xs={4}>
          <Button  style={{backgroundColor:"#0056D2", color:"white",
          fontFamily: "Cascadia Code",
    width:"1000x",
    height: "35px",
   left:"30%"
          
          }} 
          onClick={handleReset}  variant="contained"
      color="primary"
      href={props.test}
      size="small"
          variant="contained" className={classes.button}>
            passer le test
          </Button>
          </Grid> </Grid>
          </div>
      )}
      
    </div>
  );
  else 
  if(props.type=="PDF"){
  return (
   
    <div className={classes.root}>
    



   <div>
     <div  onMouseOver={props.onMouseOver}>
       <Grid
         container direction="row">

         <Grid item xs={2} ></Grid>


         <Grid container direction="row" item xs={8}>
         <Grid item xs={8} >



             <Title  />
</Grid>
             <Grid item xs={8} >
             <Titredecours  name={props.name}/>

           </Grid>
           <Grid item container justify="space-evenly" direction="row" xs={12}>
             <Grid item xs={10}>
             <Cpp pdf={props.listpdf[activeStep]} />
             </Grid>

         <Grid item xs={2}  >   <Stepper activeStep={activeStep}  
         style={{ backgroundColor:"rgba(232, 237, 243, 0)", 
         width:"200px",height:"50%",marginTop :"10%"}}
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
                  
                    {activeStep === steps.length - 1 ? 
                
                  <></>:
                  <Button style={{backgroundColor:"#00B9D2"}}
                    variant="contained"
                    color="primary"
                    
                    onClick={handleNext}
                    className={classes.button}
                   
                     >
                    next</Button>}
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
     
      </Grid>
      </Grid>
     
              
               
      </Grid>
           
      <Grid item xs={8} >
               <Desc desc={props.desc}/>
             
             </Grid>
             
             <Grid item xs={2} ></Grid>   
       
</Grid>

     </div>
    

   </div>
 
   {activeStep === steps.length-1 && (
        <div>
        <Grid
  container
  direction="row"  justify="center"


>
         <Grid item xs={4}>
          <Button  style={{backgroundColor:"#0056D2", color:"white",
          fontFamily: "Cascadia Code",
    width:"1000x",
    height: "35px",
   left:"30%"
          
          }} 
          onClick={handleReset}  variant="contained"
      color="primary"
     
      size="small"
          variant="contained" className={classes.button}>
            Reset
          </Button>
          </Grid>
          <Grid item xs={4}>
          <Button  style={{backgroundColor:"#0056D2", color:"white",
          fontFamily: "Cascadia Code",
    width:"1000x",
    height: "35px",
   left:"30%"
          
          }} 
          onClick={handleReset}  variant="contained"
      color="primary"
      href={props.test}
      size="small"
          variant="contained" className={classes.button}>
            passer le test
          </Button>
          </Grid> </Grid>
          </div>
      )}
      
    </div>
  );

}}
c=0;

  export const Index = () => {
  
    return (c)};

export default Course;






