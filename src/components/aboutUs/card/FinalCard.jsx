import React from "react";
import GlobalStyle from "./GlobalStyle";
import CardContainer from "./CardContainer";
import Title from "./Title";

import Socials from "./Socials";
import Grid from "@material-ui/core/Grid";
export default function FinalCard() {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <CardContainer>
            <Grid
              container
              direction="row-reverse"
              justify="space-around"
              alignItems="flex-start"
            >
              <Grid item xs={11}>
                <Title name="Hajar DAMI" img="/hajar.png" />
              </Grid>
              <Grid item xs={1}>
                <Socials
                  name="hajardami"
                  git="https://github.com/hajardami"
                  link="https://ma.linkedin.com/in/hajar-dami"
                  emai="mailto:hajar.dami.14@gmail.com"
                  email="hajar.dami.14@gmail.com"
                />
              </Grid>
            </Grid>
          </CardContainer>
          <GlobalStyle />
        </Grid>
        <Grid item xs={6}>
          <CardContainer>
            <Grid
              container
              direction="row-reverse"
              justify="space-around"
              alignItems="flex-start"
            >
              {" "}
              <Grid item xs={11}>
                <Title name="Obaydah Bouifadene" img="/Obaydah.png" />
              </Grid>
              <Grid item xs={1}>
                <Socials
                  name="ObaydahBouifadene"
                  git="https://github.com/oubaydos"
                  link="https://ma.linkedin.com/in/oubaydos"
                  emai="mailto:oubayda56@gmail.com "
                  email="OUBAYDA56@gmail.com "
                />
              </Grid>{" "}
            </Grid>{" "}
          </CardContainer>
          <GlobalStyle />
        </Grid>
      </Grid>
    </div>
  );
}
