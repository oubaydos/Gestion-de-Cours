import React from "react";
import TextButton from "../../usedComponents/TextButton";
import { Hidden } from "@material-ui/core";

function ContactUs() {
  return (
    <Hidden mdDown>
      <TextButton value="Contactez-nous" url="/contactus" />
    </Hidden>
  );
}
export default ContactUs;
