#!/usr/bin/env node
import axios from "axios";
import { program } from "commander";
import dotenv from "dotenv"

dotenv.config()

program.name("The movie database cli tool").description("using cli to find top 10 movie with types").version("1.0.0");

program.option("--type <type>", "get api from type", "default").parse();

const options = program.opts();
console.log(`Initializing tmdb project with type: ${options.type}`);

async function main() {
  let endpoint = options.type;
  if (endpoint === "playing") 
    endpoint = "now_playing";
  if (endpoint === "top")
    endpoint = "top_rated"
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${endpoint}?api_key=${process.env.API_KEY}&language=en-US&page=1`
    );
    const movies = response.data.results;
    if (!movies || movies.length === 0) {
      console.log("No movies found.");
      return;
    }
    console.log("Showing 10 movies:");
    movies.slice(0, 10).forEach((movie: any, idx: number) => {
      console.log(`${idx + 1}. ${movie.title}`);
    });
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.status_message) {
      console.error("Error from TMDB API:", error.response.data.status_message);
    } else {
      console.error("An error occurred:", error.message);
    }
  }
}

main();