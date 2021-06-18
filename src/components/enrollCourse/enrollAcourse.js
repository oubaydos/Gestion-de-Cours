import axios from "axios";

async function enroll() {
  const dataSent = {
    courseId: `${window.location.pathname.split("/")[2]}`,
  };
  try {
    await axios.post(`http://localhost:5000/enrollCourse`, dataSent).then(
      (res) => {
        console.log("res : : : : ");
        console.log(res);
        window.location.href = "/mycourses";
      },
      (err) => {
        alert("error : " + err.response.data.errors);
      }
    );
  } catch (e) {
    alert("error : " + e.response.data);
  } //khas e.message . .... wa9ila
}
async function enrollFormation() {
  const dataSent = {
    formationId: `${window.location.pathname.split("/")[2]}`,
  };
  try {
    await axios.post(`http://localhost:5000/enrollFormation`, dataSent).then(
      (res) => {
        console.log("res : : : : ");
        console.log(res);
        window.location.href = "/myformations";
      },
      (err) => {
        alert("error : " + err.response.data.errors);
      }
    );
  } catch (e) {
    alert("error : " + e.response.data);
  } //khas e.message . .... wa9ila
}
export default enroll;
export { enrollFormation };
