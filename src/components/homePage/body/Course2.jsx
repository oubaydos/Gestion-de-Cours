import React, { useState, useEffect } from "react";
import Course from "../../usedComponents/Course";
import axios from "axios";
function Course1(props) {
  let [courses, setcourses] = useState({ data: [] });
  let [profs, setProfs] = useState([]);
  let [loading, setLoading] = useState(true);

  //axios
  const getCourses = async () => {
    try {
      await axios
        .get(`http://localhost:5000/bestCourses`)

        .then((res) => {
          console.log(res.data);
          courses = res.data;
          setcourses({ data: res.data });
          setLoading(false);
        });
    } catch (err) {
      console.log("error : ");
      console.log(err.response);
    }
  };
  //
  let i = 0;
  useEffect(() => {
    setTimeout(getCourses, 500);
  }, [loading]);

  return (
    <div>
      {loading ? (
        <div>loading</div>
      ) : (
        <Course
          link="id"
          img={"http://localhost:5000/addPic/" + courses.data[1].item.image}
          alt="course1"
          all={true}
          title={courses.data[1].item.title}
          author={courses.data[1].prof}
          rating={
            courses.data[1].item.numberOfDoneStudents === undefined ||
            courses.data[1].item.numberOfDoneStudents === 0
              ? 0
              : courses.data[1].item.rating /
                courses.data[1].item.numberOfDoneStudents
          }
          id={courses.data[1].item._id} //khask tjibo mn back end :)
        />
      )}
    </div>
  );
}
export default Course1;
