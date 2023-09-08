import { Box, Card, CardActionArea, CardContent, CardMedia, Container, CssBaseline, Stack, Typography } from "@mui/material";
import { useState } from "react";
import LodgingService from "../../services/lodgeService";
import { useParams } from "react-router-dom";


export default function LodgeDatesForm() {
    const [lodge, setLodge] = useState([])
    const [lodgePhotos, setLodgePhotos] = useState([]);
    const { lodgeId } = useParams() 

    
    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <h1> jes henlo</h1>
               {/* //kartice */}
            </Box>
        </Container>
    )
}