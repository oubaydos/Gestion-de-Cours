import React from "react";
import Upload from "./Upload"
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
export default function Cours() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Information de cours
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="Titre de cours"
            name="Titre de cours"
            label="Titre de cours"
            fullWidth
            autoComplete="given-name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="Nombre de chapitres"
            name="Nombre de chapitres"
            label="Nombre de chapitres"
            fullWidth
            autoComplete="family-name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="Description de cours "
            name="Description  de cours"
            label="Description  de cours"
            fullWidth
            autoComplete="shipping address-line1"
          />
            <Grid item xs={12} >
        <Upload type="Insérer l'image de cours"/>
        </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
