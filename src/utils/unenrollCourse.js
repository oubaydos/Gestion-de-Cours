import axios from "axios";
let func = async (courseId) => {
  try {
    await axios
      .post(
        `http://localhost:5000/unenrollCourse`,
        { courseId },
        {
          headers: {
            "x-auth-token": `${localStorage.getItem("currentUser")}`,
          },
        }
      )
      .then(
        (res) => {
          console.log("res : : : : ");
          console.log(res);
          alert("success"); //need to handle this success
          window.location.href = `/dashboard`;
        },
        (err) => {
          alert("error : " + err.response.data.errors);
          console.log(err.response);
        }
      );
  } catch (e) {
    console.error(e);
    alert("Erreur ! veuillez contacter un des developeurs");
  }
};
export default func;
