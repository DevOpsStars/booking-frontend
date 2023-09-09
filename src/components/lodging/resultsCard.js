
import {  Button, Card, CardActions, CardContent, Stack, Typography } from "@mui/material";


export default function ResultsCard({ result }) {

    return (
        <Card key={crypto.randomUUID()} sx={{ minWidth: 275, display: "inline-flex", m: 2, border: '1px solid lightblue' }}>
            <CardContent>
                <Stack>

                    {result && result.pricesByDay.length > 0 && result.pricesByDay.map((item, ind) => {
                        return <Typography key={ind}>{item.date} : {item.price} €</Typography>
                    })}

                    <Typography><b>Total price: {result.totalPrice} €</b></Typography>
                </Stack>
            </CardContent>
        </Card>
    )
}
