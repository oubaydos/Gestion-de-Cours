import React from "react";
import TextButton from "../../usedComponents/TextButton";
import { Hidden } from "@material-ui/core";

function ContactUs() {
  return (
    <Hidden mdDown>
      <TextButton value="Qui sommes-nous ?" url="/aboutus" />
    </Hidden>
  );
}
export default ContactUs;
