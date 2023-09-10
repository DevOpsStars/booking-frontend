import { useEffect, useState } from "react"
import LodgingService from "../../services/lodgeService"
import { Box, Card, CardActionArea, CardContent, CardMedia, Divider, Stack, Typography } from "@mui/material";
import RatingList from "../rating/ratingList"


export default function LodgeCard({ lodge }) {

	const [lodgePhotos, setLodgePhotos] = useState([]);
	const [l, setL] = useState({});
	
	useEffect(() => {
		if(lodge.id){
			LodgingService.getPhotosByLodge(lodge.id, setLodgePhotos);
		}else{
			LodgingService.getPhotosByLodge(lodge.lodgeId, setLodgePhotos);
		}
	}, [])

	useEffect(() => {
		// console.log(lodgePhotos);
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

	useEffect(() => {
		if (lodge && lodge.lodgeId) {
			console.log("lodge card",lodge,lodge.lodgeId)
			LodgingService.getLodge(lodge.lodgeId, setL)
		}
	}, [lodge])

	return (
		<Card sx={{ minWidth: 275, display: "inline-flex", m: 2, border: '1px solid coral' }}>
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
								<i>{lodge?.title}</i>
							</Typography>
							<Divider/>
							<br/>
							
							<Typography variant="subtitle">
								Location: <b>{lodge?.country}, {lodge?.city}</b>
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
							{lodge && lodge.lodgeId ? <RatingList type="lodge" forId={lodge?.lodgeId} /> : ""}
							{l && l.hostId ? <RatingList type="host" forId={l?.hostId} /> : ""}
						</Stack>
					</CardContent>
			</Box>
		</Card>
	)
}