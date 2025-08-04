import { useParams } from "react-router-dom";
import type { Article } from "../App";
import { Link } from "react-router-dom";
import data from "../data.json";

export default function Article() {
  const { id } = useParams();
  const article = data.find((a) => a.id === id);

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className="flex flex-col gap-3 border-2 p-10 border-black border-solid rounded-xl min-h-100 max-w-160">
      <h1 className="text-4xl font-bold">{article.title}</h1>
      <p className="text-xl text-gray-400 font-semibold">
        {new Date(article.publishDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      <p className="text-lg">{article.content}</p>
    </div>
  );
}

export function ArticleHome({
  admin,
  listArticle,
}: {
  admin: boolean;
  listArticle: Article[];
}) {
  return (
    <div className="h-full space-y-10">
      <div className="flex items-stretch h-full gap-4">
        <h1 className="font-bold text-4xl">Personal Blog</h1>
        {admin && (
          <button className="font-semibold text-lg px-4 ml-auto cursor-pointer hover:opacity-70">
            + Add
          </button>
        )}
      </div>
      <div className="flex gap-2 flex-col">
        {listArticle.map((article) => {
          return (
            <div className="flex items-center" key={article.id}>
              <Link
                to={`/blogs/${article.id}`}
                className="text-xl font-bold hover:opacity-70 cursor-pointer"
              >
                {article.title}
              </Link>
              {admin ? (
                <div className="grid grid-cols-2 grid-rows-1 ml-auto">
                  <button className="hover:opacity-60 cursor-pointer text-lg font-semibold text-gray-500">
                    Edit
                  </button>
                  <button className="hover:opacity-60 cursor-pointer text-lg font-semibold text-gray-500">
                    Delete
                  </button>
                </div>
              ) : (
                <p className="text-md text-gray-400 font-semibold ml-auto">
                  {article.publishDate.toDateString()}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
