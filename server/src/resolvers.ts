export let resolvers = {
	Query: {
		placeSuggestions: (_: any, { value }: any, { dataSources }: any) => {
			return dataSources.googleApi.getCitySuggestion(value);
		},
		placeInfo: (_: any, { place_id }: any, { dataSources }: any) => {
			return dataSources.googleApi.getPlaceInfo(place_id);
		},
	},

	PlaceInfo: {
		place: (parent: any, _: any, { dataSources }: any) => {
			return parent;
		},

		thingstodo: (parent: any, _: any, { dataSources }: any) => {
			return dataSources.googleApi.getThingsToDo(parent.location, parent.name);
		},
	},
};
