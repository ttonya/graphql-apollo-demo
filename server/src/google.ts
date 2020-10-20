import * as express from "express";

import { Client, Place } from "@googlemaps/google-maps-services-js";
import { RESTDataSource } from "apollo-datasource-rest/dist/RESTDataSource";

require("dotenv").config();

const key = process.env.GOOGLE_API_KEY;

export default class GoogleApi extends RESTDataSource {
	public router = express.Router();
	public googleClient: any;
	public baseURL: string;

	constructor() {
		super();
		this.googleClient = new Client({});
	}

	public async getThingsToDo(
		location: any,
		name: string
	): Promise<Array<Place>> {
		let { data } = await this.googleClient.textSearch({
			params: {
				key,
				query: `Things to do in ${name}`,
				location: location,
				radius: 5000,
			},
		});

		let places = data.results.map((place: Place) => this.placeReducer(place));
		return places;
	}

	public async getCitySuggestion(value: string): Promise<Array<Place>> {
		let { data } = await this.googleClient
			.placeAutocomplete({
				params: {
					input: value,
					key,
					types: "(cities)",
				},
			})
			.catch((er: any) => console.error(er));
		return data.predictions;
	}

	public async getPlaceInfo(placeId: string): Promise<Place> {
		let { data } = await this.googleClient.placeDetails({
			params: {
				place_id: placeId,
				key,
			},
		});
		return this.placeReducer(data.result);
	}

	public placeReducer(place: Place) {
		return {
			place_id: place.place_id,
			formatted_address: place.formatted_address,
			location: place.geometry.location,
			name: place.name,
			rating: place.rating,
			photos: place.photos,
			website: place.website,
		};
	}
}
