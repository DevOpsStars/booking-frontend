import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Container, CssBaseline, Divider, IconButton, InputAdornment, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
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
    const [priceMods, setPriceMods] = useState([]);
    const [priceModTitle, setPriceModTitle] = useState("");
    const [percentage, setPercentage] = useState(0);
    const [modType, setModType] = useState("");

    const [value, setValue] = useState([
        dayjs('2023-09-09'),
        dayjs('2023-09-10'),
    ]);

    const [modValue, setModValue] = useState([
        dayjs('2023-09-09'),
        dayjs('2023-09-10'),
    ]);

    useEffect(() => {
        LodgingService.getLodge(lodgeId, setLodge);
        LodgeDatesService.getAvailabilitiesByLodge(lodgeId, setAvailabilities);
        LodgeDatesService.getPriceModificationsByLodge(lodgeId, setPriceMods);
    }, [])

    useEffect(() => { console.log(lodge); }, [lodge]);

    const handleChangeModType = (event) => {
        setModType(event.target.value);
    }

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

    const handleNewPriceMod = (event) => {
        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                lodgeId: lodgeId,
                title: priceModTitle,
                start: modValue[0].format("YYYY-MM-DD"),
                end: modValue[1].format("YYYY-MM-DD"),
                modificationType: modType,
                percentage: percentage
            })
        }
        LodgeDatesService.newPriceModification(requestOptions);
        LodgeDatesService.getPriceModificationsByLodge(lodgeId, setPriceMods);
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

    const deletePriceMod = (id) => {
        let requestOptions = {
            method: 'DELETE'
        }
        LodgeDatesService.deletePriceMod(requestOptions, id);
        LodgeDatesService.getPriceModificationsByLodge(lodgeId, setPriceMods);
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
                        <Box key={index} sx={{ mb: 3 }}>
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
                <Divider />
                <h3>Any discounts or special offers?</h3>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateRangeCalendar
                        value={modValue}
                        onChange={(newModValue) => setModValue(newModValue)}
                    />
                </LocalizationProvider>
                <TextField
                    type="text"
                    fullWidth
                    id="title"
                    label="Title of the price modification"
                    name="title"
                    autoComplete="Price modification title"
                    value={priceModTitle}
                    onChange={e => setPriceModTitle(e.target.value)}
                />
                <InputLabel id="priceTypeSelect" sx={{ mt: 2}}>Modification type</InputLabel>
                <Select
                  required
                  fullWidth
                  labelId="modTypeSelect"
                  id="modTypeSelect"
                  value={modType}
                  label="modType"
                  onChange={handleChangeModType}
                  sx={{mb: 3, mt: 2}}
                >
                  <MenuItem value={"DISCOUNT"}>Discount</MenuItem>
                  <MenuItem value={"PRICE_INCREASE"}>Price increase</MenuItem>
                </Select>
                <TextField
                    fullWidth
                    type="number"
                    id="percentage"
                    label="Percentage"
                    name="percentage"
                    autoComplete="Percentage"
                    value={percentage}
                    onChange={e => setPercentage(e.target.value)}
                    InputProps={{
                        inputProps: { min: 1, max: 100 },
                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                      }}
                />
                <Button
                    fullWidth
                    variant="contained"
                    color="warning"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleNewPriceMod}>
                    Add price modification
                </Button>
                <Box sx={{ mb: 8 }}>
                    {priceMods.map((item, index) => (
                        <Box key={index} sx={{ mb: 3 }}>
                            <Typography variant="h4">{item.title}</Typography>
                            <Typography variant="h6"><i>({item.modificationType==="DISCOUNT" ? "Discount" : "Price increase"})</i></Typography>
                            <Typography variant="h5">{item.modificationType==="DISCOUNT" ? "- " : "+ "}{item.percentage}%</Typography>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DateRangePicker readOnly format="DD/MM/YYYY" value={[moment(item.start), moment(item.end)]} />
                            </LocalizationProvider>
                            <IconButton aria-label="delete" onClick={() => deletePriceMod(item.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Container>
    )
}