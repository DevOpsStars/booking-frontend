import { useEffect, useState } from "react"
import LodgingService from "../../services/lodgeService"
import { Box, Card, CardActionArea, CardContent, CardMedia, Stack, Typography } from "@mui/material";


export default function LodgeCard({ lodge }) {

	const [lodgePhotos, setLodgePhotos] = useState([]);
	
	useEffect(() => {
		if(lodge.id){
			LodgingService.getPhotosByLodge(lodge.id, setLodgePhotos);
		}
	}, [])

	useEffect(() => {
		console.log(lodgePhotos);
	}, [lodgePhotos]);

	const getAmenities = (lodge) => {
		let amenities = "Amenities: ";
		if (lodge.hasKitchen) {
			amenities += "Kitchen, "
		}
		if (lodge.hasWifi) {
			amenities += "Wifi, "
		}
		if (lodge.hasAC) {
			amenities += "AC, "
		}
		if (lodge.hasFreeParking) {
			amenities += "Free Parking, "
		}
		if (lodge.hasBalcony) {
			amenities += "Balcony"
		}
		return amenities;
	}

	return (
		<Card key={lodge.id} sx={{ minWidth: 275, display: "inline-flex", m: 2 }}>
			<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", }}>
					<CardMedia>
						<Stack direction="row" sx={{ width: '100%', overflow: 'auto' }} spacing={2} justifyContent="center">
							{lodgePhotos && lodgePhotos.length > 0 && lodgePhotos?.map((item) => (
								<img
									key={item.id}
									src={`${process.env.REACT_APP_LODGING_SERVICE_PATH}/api/photo/show/id/200/200/${item.id}`}
									// 124/124
									alt={item.title}
									loading="lazy"
								/>
							))}
						</Stack>
					</CardMedia>
					<CardContent>
						<Stack>
							<Typography variant="h5">
								{lodge?.title}
							</Typography>
							<Typography variant="subtitle">
								{lodge?.country}, {lodge?.city}
							</Typography>
							<Typography variant="subtitle">
								Address: {lodge?.address}
							</Typography>
							<Typography variant="subtitle">
								Guests: {lodge?.minGuests} - {lodge?.maxGuests}
							</Typography>
							<Typography variant="subtitle">
								{lodge ? getAmenities(lodge) : ""}
							</Typography>
						</Stack>
					</CardContent>
			</Box>
		</Card>
	)
}