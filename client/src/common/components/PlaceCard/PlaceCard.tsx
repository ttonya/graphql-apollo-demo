import React from "react";
import {
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Typography,
} from "@material-ui/core";

import { GOOGLE_API_KEY } from "../../const";

export const IMAGE_API = "https://maps.googleapis.com/maps/api/place/photo?";

export default function PlaceCard(props: any) {
	let { card } = props;

	const params = card
		? `key=${GOOGLE_API_KEY}&photoreference=${card.photos[0].photo_reference}&maxheight=500`
		: "";

	return (
		<Card className="PlaceCard">
			<CardActionArea>
				<div
					className="PlaceCard__image"
					style={{
						background: `url(${IMAGE_API}${params})`,
						width: "350px",
						height: "250px",
					}}
				></div>
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						{card.name}
					</Typography>
					<Typography variant="body2" color="textSecondary" component="p">
						{card.formatted_address}
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<Button size="small" color="primary">
					<a href={card.website} target="_blank">
						{" "}
						Website{" "}
					</a>
				</Button>
			</CardActions>
		</Card>
	);
}
