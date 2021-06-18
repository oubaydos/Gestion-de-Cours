import axios from "axios";

async function Axios() {
  //axios

  const getCourses = async () => {
    let profs = [],
      courses = [];
    try {
      await axios
        .get(`http://localhost:5000/bestCourses`)

        .then((res) => {
          alert("done");
          console.log(res.data);
          courses = res.data;
        });
    } catch (err) {
      console.log("error : ");
      console.log(err.response);
    }
    return courses;
  };

  return await getCourses();
}
export default Axios;
