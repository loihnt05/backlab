import type { Article } from "../App";

export default function Article({ article }: { article: Article }) {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-4xl font-bold">{article.title}</h1>
      <p className="text-2xl text-gray-400 font-semibold">
        {article.publishDate.toDateString()}
      </p>
      <p className="text-xl">{article.content}</p>
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
            <div className="flex items-center">
              <h1 className="text-xl font-bold hover:opacity-70 cursor-pointer">{article.title}</h1>
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
