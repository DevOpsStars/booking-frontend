import React from "react";
import { Grid } from "@mui/material";

export default function IconThenText({ icon, text }) {
  return (
    <Grid container direction="row" alignItems="center">
      <Grid item>{icon}</Grid>
      <Grid item>{text}</Grid>
    </Grid>
  );
}
