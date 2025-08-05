import { fetchArticles } from "./api";
import Article, { ArticleHome } from "./components/Article";
export type Article = {
  id: string
  title: string;
  publishDate: string;
  content: string;
};

import { useEffect, useState } from "react";

function App() {
  const login = localStorage.getItem("login") === "admin";
  const [article, setArticle] = useState<Article[]>([]);

  useEffect(() => {
    fetchArticles().then(setArticle);
  }, []);

  console.log(article);
  
  return (
    <div className="w-[50%] flex flex-col border-3 border-black border-solid rounded-md p-10 gap-5">
      <ArticleHome listArticle={article} admin={!!login}></ArticleHome>
    </div>
  );
}

export default App;
