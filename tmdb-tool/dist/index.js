#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const commander_1 = require("commander");
commander_1.program.name("").description("").version("");
commander_1.program.option("--type <type>", "get api from type", "default").parse();
const options = commander_1.program.opts();
console.log(`Initializing tmdb project with type: ${options.type}`);
async function main() {
    const movies = await axios_1.default.get("https://api.themoviedb.org/3/movie/now_playing?api_key=1b9c6e5cd270781d91678374c9dbab7b&language=en-US&page=1");
    console.log(movies);
}
main();
