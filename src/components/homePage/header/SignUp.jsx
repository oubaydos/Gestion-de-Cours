import React from "react";
import MyButton from "../../usedComponents/MyButton";

function SignUp() {
  return (
    <MyButton
      bgColor="rgba(0,86,210,1)"
      fgColor="white"
      className="signUp"
      value="S'inscrire"
      url="/signup"
    />
  );
}
export default SignUp;
