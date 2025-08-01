
export default function EditArticle({
  title,
}: {
  title: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-4xl font-bold mb-7">{title} Article</h1>
      <input className="border-gray-400 border-2 border-solid p-3 rounded-sm" type="text" placeholder="Title Article" />
      <input className="border-gray-400 border-2 border-solid p-3 rounded-sm " type="text" placeholder="Publishing Date" />
      <textarea className="border-gray-400 border-2 border-solid p-3 rounded-sm h-100 text-left w-full" placeholder="Content" />
      <button className="w-[30%] cursor-pointer hover:bg-gray-100 text-black p-3 border-2 border-gray-400 border-solid rounded-md">{title === "Update" ? "Update" : "Publish"}</button>
    </div>
  );
}
