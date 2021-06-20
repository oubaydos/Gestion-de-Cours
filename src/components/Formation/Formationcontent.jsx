import CourseCard from "../usedComponents/Course"
import React from 'react';
import Formationdescr  from "./Formationdescr";
import Grid from '@material-ui/core/Grid';
import Test from "./Test";
function Formationcontent(props){


return (<div>
      <Test test="https://docs.google.com/forms/u/0/"/>
    <Grid container  justify="space-around"   alignItems="center" direction="row
    ">
    <Grid item xs={12}>
    
    <Formationdescr formationanme="formation name"/></Grid>
     {  [...Array(10)].map((elementInArray, index) => ( 
 
        <div key={index}>
<Grid item xs={2}>
<CourseCard
  link="id"
  img="/temp.jpg"
  alt="course1"
  title="Learn Flutter 2.0"
  author="Angela Yu"
  rating={4.3}/>
  </Grid>



        </div>
      ))}
      </Grid>
    
      
      </div>);
}
export default  Formationcontent;