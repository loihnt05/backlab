import Article, { ArticleHome } from "./components/Article";
import data from "./data.json";
export type Article = {
  id: string
  title: string;
  publishDate: Date;
  content: string;
};

function App() {
  const login = localStorage.getItem("login") === "admin";
  const parsedArticles: Article[] = data.map((article) => ({
    ...article,
    publishDate: new Date(article.publishDate),
  }));
  return (
    <div className="w-[50%] flex flex-col border-3 border-black border-solid rounded-md p-10 gap-5">
      <ArticleHome listArticle={parsedArticles} admin={!!login}></ArticleHome>
    </div>
  );
}

export default App;
