import { useNavigate, useParams } from "react-router-dom";
import type { Article } from "../App";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Article() {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      const response = await fetch(`http://localhost:3000/items`);
      if (response.ok) {
        const data = await response.json();
        setArticle(data);
      }
    };
    fetchArticle();
  }, [id]);

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
  const [deleteItem, setDeleteItem] = useState<Article>();
  const [listArticles, setListArticles] = useState<Article[]>(listArticle)
  const nav = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const handleDelete = (article: Article) => {
    setListArticles((prev => prev.filter(item => item.id !== article.id)))
  };

  return (
    <div className="h-full space-y-10">
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Notification</h2>
            <p className="mb-4">Are you sure about deleting blog.</p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setShowPopup(false);
                }}
                className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer hover:opacity-60"
              >
                No
              </button>
              <button
                onClick={() => {
                  setShowPopup(false);
                  handleDelete(deleteItem!);
                }}
                className="bg-blue-700 text-white px-4 py-2 rounded cursor-pointer hover:opacity-60"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex items-stretch h-full gap-4">
        <h1 className="font-bold text-4xl">Personal Blog</h1>
        {admin && (
          <button
            className="font-semibold text-lg px-4 ml-auto cursor-pointer hover:opacity-70"
            onClick={() => nav("/new")}
          >
            + Add
          </button>
        )}
      </div>
      <div className="flex gap-2 flex-col">
        {listArticles.map((article) => {
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
                  <button
                    onClick={() => nav(`/edit/${article.id}`)}
                    className="hover:opacity-60 cursor-pointer text-lg font-semibold text-gray-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setShowPopup(true)
                      setDeleteItem(article)
                    }}
                    className="hover:opacity-60 cursor-pointer text-lg font-semibold text-gray-500"
                  >
                    Delete
                  </button>
                </div>
              ) : (
                <p className="text-md text-gray-400 font-semibold ml-auto">
                  {article.publishDate}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
