import axios from "axios";
let chapters = [];
let func = async (id) => {
  try {
    await axios.post(`http://localhost:5000/getChapters`, { id }).then(
      (res) => {
        console.log("res : : : : ");
        console.log(res);
        alert("success"); //need to handle this success
        chapters = res.data;
      },
      (err) => {
        alert("error : " + err.response.data.errors);
        console.log(err.response);
      }
    );
  } catch (e) {
    console.error(e);
    alert("Erreur ! veuillez contacter un des developeurs");
  } finally {
    return chapters;
  }
};
export default func;
