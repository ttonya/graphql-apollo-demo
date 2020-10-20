import { gql } from "@apollo/client";

export const GET_PLACE_SUGGESTIONS = gql`
	query placeSuggestions($value: String) {
		placeSuggestions(value: $value) {
			place_id
			description
		}
	}
`;

export const GET_PLACE_INFO = gql`
	query placeInfo($place_id: ID) {
		placeInfo(place_id: $place_id) {
			place {
				place_id
				formatted_address
				location {
					lat
					lng
				}
				name
				rating
				photos {
					photo_reference
				}
				website
			}
			thingstodo {
				place_id
				formatted_address
				location {
					lat
					lng
				}
				name
				rating
				photos {
					photo_reference
				}
				website
			}
		}
	}
`;
