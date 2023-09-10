import React, { useEffect, useState } from "react";
import UserRating from "./userRating";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from "@mui/material";
import RatingService from "../../services/ratingService";
import AverageRating from "./averageRating";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function RatingList({ type, forId }) {
  const [ratings, setRatings] = useState([]);
  const [average, setAverage] = useState(0);
  const [noRating, setNoRating] = useState(true);

  useEffect(() => {
    RatingService.getRatings(setRatings, type, forId);
    RatingService.getAverage(setAverage, type, forId);
  }, []);

  useEffect(() => {
    console.log("average is", average)
    if (average !== 0) {
      setNoRating(false);
    }
  }, [average]);

  return (
    <div style={{ display: "block" }}>
      {noRating ? (
        <Typography>No one rated this {type} yet</Typography>
      ) : (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <AverageRating averageRate={average} />
            <Typography>See reviews for this {type}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container justifyContent="flex-start" sx={{ gap: 2 }}>
              {ratings && ratings.length > 0 && ratings.map((r) => {
                console.log(r);
                return (
                  <UserRating
                    key={"rate" + r.id}
                    userId={r.guestId}
                    rate={r.rate}
                    lastUpdated={r.lastUpdated}
                  />
                );
              })}
            </Grid>
          </AccordionDetails>
        </Accordion>
      )}
    </div>
  );
}
