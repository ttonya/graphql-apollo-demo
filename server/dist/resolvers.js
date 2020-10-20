"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
exports.resolvers = {
    Query: {
        placeSuggestions: (_, { value }, { dataSources }) => {
            dataSources.googleApi.getCitySuggestion(value);
        },
        placeInfo: (_, { place_id }, { dataSources }) => {
            dataSources.googleApi.getPlaceInfo(place_id);
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
//# sourceMappingURL=resolvers.js.map