import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Upload from "./Upload"
import PhotoCamera from '@material-ui/icons/PhotoCamera';




export default function Chapitre(props) {
 
 
  return (
   
  
[...Array(props.nbrchap)].map((elementInArray, index) => ( 
 
  <div key={index}> 
 <React.Fragment>
    
      <Grid container spacing={3}>
        <Grid item xs={12} >
          <TextField required id="Titre de chapitre "
           label={"Titre de chapitre"+"  "+(index+1).toString()}
           fullWidth autoComplete="Titre de chapitre" />
           
        </Grid>
        <Grid item xs={12} >
        <Upload type="
Insérer le pdf de chapitre"/>

        </Grid>
      
        <Grid item xs={12} >
        <Upload type="Insérer la video de chapitre"/>
        </Grid>
      </Grid>
      <hr/>
    </React.Fragment>
    </div> 
    
    ) 
)
  );
}
