import type { Article } from "../App";


export default function Article({ article }: { article: Article }) {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-4xl font-bold">{article.title}</h1>
      <p className="text-2xl text-gray-400 font-semibold">{article.publishDate.toDateString()}</p>
      <p className="text-xl">{article.content}</p>
    </div>
  );
}
