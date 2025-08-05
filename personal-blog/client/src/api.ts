// src/api.ts
import axios from "axios";
import type { Article } from "./App";

export async function fetchProtectedData(username: string, password: string) {
  const token = btoa(`${username}:${password}`);
  const res = await axios.get("http://localhost:3000/", {
    headers: {
      Authorization: `Basic ${token}`,
    },
  });

  return res.data;
}

export async function fetchArticles(): Promise<Article[]> {
  // Use admin credentials for authentication
  const token = btoa("admin:admin");
  const res = await axios.get("http://localhost:3000/items", {
    headers: {
      Authorization: `Basic ${token}`,
    },
  });
  return res.data;
}

export async function createArticle(article: Article): Promise<Article> {
  // Use admin credentials for authentication
  const token = btoa("admin:admin");
  const res = await axios.post("http://localhost:3000/items", article, {
    headers: {
      Authorization: `Basic ${token}`,
    },
  });
  return res.data;
}

export async function updateArticle(article: Article): Promise<Article> {
  const token = btoa("admin:admin");
  const res = await axios.put(`http://localhost:3000/items/${article.id}`, article, {
    headers: {
      Authorization: `Basic ${token}`,
    },
  });
  return res.data;
}
