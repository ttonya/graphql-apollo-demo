import { useLazyQuery } from "@apollo/client";
import TextField from "@material-ui/core/TextField/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import React, { useEffect, useState } from "react";
import "./App.css";
import { GET_PLACE_INFO, GET_PLACE_SUGGESTIONS } from "./makeQuery";
import PlaceCard, { IMAGE_API } from "./common/components/PlaceCard/PlaceCard";
import { GOOGLE_API_KEY } from "./common/const";

function App() {
	const [options, setOptions] = useState<Array<any>>([]);
	const [place, setPlace] = useState(null as any);
	const [cards, setCards] = useState(null as any);
	const [getSuggestions, suggestionsData] = useLazyQuery(GET_PLACE_SUGGESTIONS);
	const [getPlaceData, placeData] = useLazyQuery(GET_PLACE_INFO);

	const findPlace = (e: any) => {
		const { value } = e.target;
		getSuggestions({ variables: { value } });
	};

	const chosePlace = async (place_id: string) => {
		getPlaceData({ variables: { place_id } });
	};

	useEffect(() => {
		if (suggestionsData.data) {
			setOptions(suggestionsData.data.placeSuggestions);
		}
	}, [suggestionsData]);

	useEffect(() => {
		if (placeData.data) {
			setPlace(placeData.data.placeInfo.place);
			setCards(placeData.data.placeInfo.thingstodo);
		}
	}, [placeData]);

	return (
		<div className="App">
			<div className="App__autocomplete">
				<Autocomplete
					options={options}
					autoSelect={true}
					onInputChange={findPlace}
					onChange={(e, place) => chosePlace(place.place_id)}
					getOptionLabel={(option) => option.description}
					renderInput={(params) => (
						<TextField {...params} label="Type in a city name" />
					)}
				/>
			</div>

			{place && cards && (
				<div className="App__place">
					<div className="App__header">{place.name}</div>

					<div className="App__images">
						{place.photos.map((photo: any) => (
							<img
								className="App__image"
								src={`${IMAGE_API}${`key=${GOOGLE_API_KEY}&photoreference=${photo.photo_reference}&maxheight=500`}`}
							/>
						))}
					</div>

					<div className="App__header">Things To Do</div>
					<div className="App__places">
						{cards.map((card: any) => (
							<PlaceCard card={card} />
						))}
					</div>
				</div>
			)}
		</div>
	);
}

export default App;
