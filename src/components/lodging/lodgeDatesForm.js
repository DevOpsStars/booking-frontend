import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Container, CssBaseline, Divider, IconButton, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import LodgingService from "../../services/lodgeService";
import { useParams } from "react-router-dom";
import LodgeCard from "./lodgeCard";

import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';
import { DateRange, DateRangePicker } from '@mui/x-date-pickers-pro';
import LodgeDatesService from "../../services/lodgeDatesService";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import DeleteIcon from '@mui/icons-material/Delete';


export default function LodgeDatesForm() {
    const [lodge, setLodge] = useState([])
    const { lodgeId } = useParams();
    const [availabilities, setAvailabilities] = useState([]);

    const [value, setValue] = useState([
        dayjs('2023-09-09'),
        dayjs('2023-09-10'),
    ]);

    useEffect(() => {
        LodgingService.getLodge(lodgeId, setLodge);
        LodgeDatesService.getAvailabilitiesByLodge(lodgeId, setAvailabilities);
    }, [])

    useEffect(() => { console.log(lodge); }, [lodge]);

    const handleNewAvailability = (event) => {
        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                lodgeId: lodgeId,
                start: value[0].format("YYYY-MM-DD"),
                end: value[1].format("YYYY-MM-DD"),
            })
        }

        LodgeDatesService.newAvailability(requestOptions);
        LodgeDatesService.getAvailabilitiesByLodge(lodgeId, setAvailabilities);
        window.location.reload(true)
    }

    const deleteAvailability = (id) => {
        let requestOptions = {
            method: 'DELETE'
          }
        LodgeDatesService.deleteAvailability(requestOptions, id);
        LodgeDatesService.getAvailabilitiesByLodge(lodgeId, setAvailabilities);
        window.location.reload(true)
    }

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
                {lodge && lodge.id &&
                    <LodgeCard lodge={lodge} />
                }

                <Divider />
                <h2>When is {lodge.title} available?</h2>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateRangeCalendar
                        value={value}
                        onChange={(newValue) => setValue(newValue)}
                    />
                </LocalizationProvider>
                <Button
                    fullWidth
                    variant="contained"
                    color="warning"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleNewAvailability}>
                    Add availability
                </Button>
                <Box sx={{ mb: 8 }}>
                    <h3><i>Currently available</i></h3>
                    {availabilities.map((item, index) => (
                        <Box key={index} sx={{mb: 3}}>
                            {/* <h4>henlo</h4> */}
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DateRangePicker readOnly format="DD/MM/YYYY" value={[moment(item.start), moment(item.end)]} />
                            </LocalizationProvider>
                            <IconButton aria-label="delete" onClick={() => deleteAvailability(item.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Container>
    )
}