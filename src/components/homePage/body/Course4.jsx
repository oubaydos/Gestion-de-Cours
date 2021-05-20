import React from "react";
import Course from "../../usedComponents/Course";

function Course1(props) {
  return (
    <Course
      link="id"
      img="/temp.jpg"
      alt="course1"
      title="Learn Flutter 2.0"
      author="Angela Yu"
      rating={4.3}
      id="1" //khask tjibo mn back end :)
    />
  );
}
export default Course1;
