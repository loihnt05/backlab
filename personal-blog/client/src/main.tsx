import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login.tsx";
import Article from "./components/Article.tsx";
import EditArticle from "./components/Edit-Article.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<App />} />
        <Route path="/blogs/:id" element={<Article />} />
        <Route path="/edit/:id" element={<EditArticle  title="Update"/>} />
        <Route path="/new" element={<EditArticle title="Publish"/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
