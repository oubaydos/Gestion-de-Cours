import axios from "axios";

async function deleteCourse() {
  const dataSent = {
    id: `${window.location.pathname.split("/")[3]}`,
  };
  try {
    await axios
      .post(`http://localhost:5000/deleteCourse`, dataSent, {
        headers: { "x-auth-token": localStorage.getItem("currentUser") },
      })
      .then(
        (res) => {
          console.log("res  ");
          console.log(res);
          alert("success"); //to handle
          window.location.href = "/admin/dashboard";
        },
        (err) => {
          alert("error : " + err);
          console.log(err.response);
        }
      );
  } catch (e) {
    alert("error : " + e.response.data);
  } //khas e.message . .... wa9ila
}
async function deleteFormation() {
  const dataSent = {
    id: `${window.location.pathname.split("/")[3]}`,
  };
  try {
    await axios
      .post(`http://localhost:5000/deleteFormation`, dataSent, {
        headers: { "x-auth-token": localStorage.getItem("currentUser") },
      })
      .then(
        (res) => {
          console.log("res : : : : ");
          console.log(res);
          window.location.href = "/admin/dashboard";
        },
        (err) => {
          alert("error : " + err.response.data.errors);
        }
      );
  } catch (e) {
    alert("error : " + e.response.data);
  } //khas e.message . .... wa9ila
}
export default deleteCourse;
export { deleteFormation };
