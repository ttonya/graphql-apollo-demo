"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const google_maps_services_js_1 = require("@googlemaps/google-maps-services-js");
const RESTDataSource_1 = require("apollo-datasource-rest/dist/RESTDataSource");
const key = process.env.GOOGLE_API_KEY;
class GoogleApi extends RESTDataSource_1.RESTDataSource {
    constructor() {
        super();
        this.router = express.Router();
        this.googleClient = new google_maps_services_js_1.Client({});
    }
    async getThingsToDo(requestParams) {
        let { data } = await this.googleClient.textSearch({
            params: {
                key,
                query: `Things to do in ${requestParams.place}`,
                location: requestParams.location,
                radius: 5000,
            },
        });
        return data.html_attributions;
    }
    async getCitySuggestion(value) {
        let { data } = this.googleClient.placeAutocomplete({
            params: {
                input: value,
                key,
                types: "(cities)",
            },
        });
        return data.html_attributions;
    }
    async getPlaceInfo(placeId) {
        let { data } = await this.googleClient.placeDetails({
            params: {
                place_id: placeId,
                key,
            },
        });
        return this.placeReducer(data.html_attributions);
    }
    placeReducer(place) {
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
exports.default = GoogleApi;
//# sourceMappingURL=google.js.map