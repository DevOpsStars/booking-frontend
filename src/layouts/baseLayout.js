import React from "react";
import Navbar from "../components/navbar";
import Stack from "@mui/material/Stack";
import { Grid } from "@mui/material";

export default function BaseLayout({ children }) {
  return (
    <Stack spacing={2}>
      <Navbar />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={12}>
            <div style={{ margin: 5 }}>{children}</div>
        </Grid>
      </Grid>
    </Stack>
  );
}
