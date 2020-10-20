module.exports = {
    Query: {
        placeSuggestions: (_, { value }, { dataSources }) => {
            dataSources.googleApi.getCitySuggestion(value);
        },
    },
    PlaceInfo: {
        place: (_, { place_id }, { dataSources }) => {
            return dataSources.googleApi.getPlaceInfo(place_id);
        },
        thingstodo: (_, { place_id }, { dataSources }) => {
            return dataSources.googleApi.getThingsToDo(place_id);
        },
    },
};
//# sourceMappingURL=googleResolver.js.map