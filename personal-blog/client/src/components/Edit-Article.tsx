import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { createArticle, fetchArticles, updateArticle } from "../api";
import type { Article } from "../App";
export default function EditArticle({ title }: { title: string }) {
  const [valueTitle, setValueTitle] = useState<string>("");
  const [valueDate, setValueDate] = useState<string>("");
  const [valueContent, setValueContent] = useState<string>("");
  const [article, setArticle] = useState<Article | null>(null);

  const { id } = useParams();
  useEffect(() => {
    const fetchArticle = async () => {
      const data = await fetchArticles();
      const foundArticle = data.find((a) => a.id === id) || null;
      setArticle(foundArticle);

      // Initialize form with article data if editing
      if (foundArticle) {
        setValueTitle(foundArticle.title);
        setValueContent(foundArticle.content);
        // Format the date for input
        const date = new Date(foundArticle.publishDate);
        setValueDate(date.toISOString().split("T")[0]); // YYYY-MM-DD format
      }
    };
    fetchArticle();
  }, [id]);
  const handleAddBlog = () => {
    const articleData: Article = {
      id: article ? article.id : Date.now().toString(),
      title: valueTitle || "",
      publishDate: valueDate
        ? new Date(valueDate).toISOString()
        : new Date().toISOString(),
      content: valueContent || "",
    };

    // Use updateArticle if editing existing article, createArticle if creating new
    const apiCall = article ? updateArticle(articleData) : createArticle(articleData);
    
    apiCall
      .then(() => {
        console.log(`Article ${article ? 'updated' : 'created'} successfully`);
        if (!article) {
          setValueTitle("");
          setValueDate("");
          setValueContent("");
        }
      })
      .catch((error) => {
        console.error(`Error ${article ? 'updating' : 'creating'} article:`, error);
      });
  };
  const handleUpdateBlog = () => {
    const update: Article = {
      id: article ? article.id : Date.now().toString(),
      title: valueTitle || "",
      publishDate: valueDate
        ? new Date(valueDate).toISOString()
        : new Date().toISOString(),
      content: valueContent || "",
    };
    updateArticle(update)
      .then(() => {
        console.log("Article saved successfully");
        if (!article) {
          setValueTitle("");
          setValueDate("");
          setValueContent("");
        }
      })
      .catch((error) => {
        console.error("Error updating article", error);
      });
  };
  return (
    <div className="flex flex-col gap-2 border-2 border-black border-solid p-10  h-[80%] w-[50%] rounded-xl">
      <h1 className="text-4xl font-bold mb-7">{title} Article</h1>
      <input
        className="border-gray-400 border-2 border-solid p-3 rounded-sm"
        type="text"
        placeholder="Title Article"
        value={valueTitle}
        onChange={(e) => setValueTitle(e.target.value)}
      />
      <input
        className="border-gray-400 border-2 border-solid p-3 rounded-sm "
        type="date"
        placeholder="Publishing Date"
        value={valueDate}
        onChange={(e) => setValueDate(e.target.value)}
      />
      <textarea
        className="border-gray-400 border-2 border-solid p-3 rounded-sm h-100 text-left w-full"
        placeholder="Content"
        value={valueContent}
        onChange={(e) => setValueContent(e.target.value)}
      />
      <button
        onClick={title === "Publish" ? handleAddBlog:handleUpdateBlog}
        className="w-[30%] cursor-pointer hover:bg-gray-100 text-black p-3 border-2 border-gray-400 border-solid rounded-md"
      >
        {title === "Update" ? "Update" : "Publish"}
      </button>
    </div>
  );
}
