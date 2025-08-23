#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const commander_1 = require("commander");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
commander_1.program.name("").description("").version("");
commander_1.program.option("--type <type>", "get api from type", "default").parse();
const options = commander_1.program.opts();
console.log(`Initializing tmdb project with type: ${options.type}`);
async function main() {
    let endpoint = options.type;
    if (endpoint === "playing")
        endpoint = "now_playing";
    if (endpoint === "top")
        endpoint = "top_rated";
    try {
        const response = await axios_1.default.get(`https://api.themoviedb.org/3/movie/${endpoint}?api_key=${process.env.API_KEY}&language=en-US&page=1`);
        const movies = response.data.results;
        if (!movies || movies.length === 0) {
            console.log("No movies found.");
            return;
        }
        console.log("Showing 10 movies:");
        movies.slice(0, 10).forEach((movie, idx) => {
            console.log(`${idx + 1}. ${movie.title}`);
        });
    }
    catch (error) {
        if (error.response && error.response.data && error.response.data.status_message) {
            console.error("Error from TMDB API:", error.response.data.status_message);
        }
        else {
            console.error("An error occurred:", error.message);
        }
    }
}
main();
