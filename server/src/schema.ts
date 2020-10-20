const { gql } = require("apollo-server-express");

export const typeDefs = gql(`
type Query {
	placeSuggestions(value: String): [SearchPlace]
	placeInfo(place_id: ID, location: LocationInput, name: String): PlaceInfo
}

type Mutation {
	addToFavorites(id: ID): String
}

type PlaceInfo {
	place: Place
	thingstodo: [Place]
}

type Place {
	place_id: ID
	formatted_address: String
	location: Location
	name: String
	rating: Float
	photos: [Photo]
	website: String
}

type SearchPlace {
	description: String
	place_id: ID
	formatted_address: String
	location: Location
	name: String
	rating: Float
	photos: [Photo]
	website: String
}

input LocationInput {
	lat: Float
	lng: Float
}

type Location {
	lat: Float
	lng: Float
}

type Photo {
	height: Int, photo_reference: String, width: Int 
}
`);
