import axios from "axios";

async function Axios() {
  //axios

  const getCourses = async () => {
    let profs = [],
      courses = [];
    try {
      await axios
        .all([
          axios.get(`http://localhost:5000/allProfs`),
          axios.get(`http://localhost:5000/bestCourses`),
        ])
        .then(
          axios.spread((data1, data2) => {
            //hadchi 3rfto mkhrb9
            console.log(data2.data);
            profs = data1.data;
            console.log(data1.data);
            // setcourses((arr) => (arr = data2.data));
            let temp = data2.data;

            console.log("hello ");
            // console.log(courses);
            for (let j = 0; j < temp.length; j++) {
              for (let k = 0; k < profs.length; k++) {
                if (profs[k]._id === temp[j].instructor) {
                  temp[j].prof = profs[k].firstName + " " + profs[k].lastName;
                }
              }
            }
            console.log("courses :  : ");
            console.log(temp);
            courses.data = temp;
            courses.data = temp;
            console.log(courses);
          })
        );
    } catch (err) {
      console.log(err);
    }
    return courses;
  };

  return await getCourses();
}
export default Axios;
