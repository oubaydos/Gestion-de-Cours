import axios from "axios";

async function res() {
  const token = localStorage.getItem("currentUser");
  if (token === undefined || token === null) return false;
  let logedIn;
  try {
    await axios
      .post(`http://localhost:5000/auth`, {
        headers: { "x-auth-token": "token" },
      })
      .then(
        (res) => {
          alert(res.status);
          console.log(res);
          logedIn = true;
        },
        (err) => {
          logedIn = false;
        }
      );
  } catch (e) {
    console.error("l9it error\n\n\n\n");
    logedIn = false;
  }

  return logedIn;
}

export default res;
