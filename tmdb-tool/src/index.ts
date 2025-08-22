#!/usr/bin/env node
import axios from "axios";
import { program } from "commander";

program.name("").description("").version("");

program.option("--type <type>", "get api from type", "default").parse();

const options = program.opts();
console.log(`Initializing tmdb project with type: ${options.type}`);

async function main() {
  const movies = await axios.get(
    "https://api.themoviedb.org/3/movie/now_playing?api_key=1b9c6e5cd270781d91678374c9dbab7b&language=en-US&page=1"
  );
  console.log(movies);
}

main();