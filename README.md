# GraphQL Apollo and Google Places API Demo

Simple demo with implementation of apollo-server-express and Google Places API

# Start

To run this app you need a Google API key.
[How to get a key ](https://developers.google.com/maps/documentation/javascript/get-api-key)

In graphql-server add .env file with **GOOGLE_API_KEY=your api key**
In graphql-client add file common/const.ts with **export const GOOGLE_API_KEY=your api key**

# Install dependencies and run the app

```
cd graphql-server && npm i && npm run start
cd ..
cd graphql-client && npm i && npm run start
```

# Queries

```graphql

		placeSuggestions(value: $value) {
			place_id
			description
		}

`;
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
`;

```
