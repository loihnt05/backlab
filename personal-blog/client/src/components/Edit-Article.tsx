import { useParams } from "react-router-dom";
import data from "../data.json"
export default function EditArticle({ title }: { title: string }) {
  const { id } = useParams()
  const article = data.find((a) => a.id === id)
  const pubDate = article ? new Date(article?.publishDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric"
        }) : ""
  return (
    <div className="flex flex-col gap-2 border-2 border-black border-solid p-10  h-[80%] w-[50%] rounded-xl">
      <h1 className="text-4xl font-bold mb-7">{title} Article</h1>
      <input
        className="border-gray-400 border-2 border-solid p-3 rounded-sm"
        type="text"
        placeholder="Title Article"
        defaultValue={article?.title}
      />
      <input
        className="border-gray-400 border-2 border-solid p-3 rounded-sm "
        type="text"
        placeholder="Publishing Date"
        defaultValue={pubDate}
      />
      <textarea
        className="border-gray-400 border-2 border-solid p-3 rounded-sm h-100 text-left w-full"
        placeholder="Content"
        defaultValue={article?.content}
      />
      <button className="w-[30%] cursor-pointer hover:bg-gray-100 text-black p-3 border-2 border-gray-400 border-solid rounded-md">
        {title === "Update" ? "Update" : "Publish"}
      </button>
    </div>
  );
}
