import Article, { ArticleHome } from "./components/Article";

export type Article = {
  title: string;
  publishDate: Date;
  content: string;
};

const dummydata: Article[] = [
  {
    title: "The Rise of TypeScript",
    publishDate: new Date("2024-01-15"),
    content:
      "TypeScript is quickly becoming the go-to language for scalable JavaScript development.",
  },
  {
    title: "Understanding React Hooks",
    publishDate: new Date("2024-02-10"),
    content:
      "Hooks are functions that let you use state and other React features without writing a class.",
  },
  {
    title: "10 Tips for Clean Code",
    publishDate: new Date("2024-03-05"),
    content:
      "Clean code is all about readability, simplicity, and maintainability.",
  },
  {
    title: "Exploring Node.js Streams",
    publishDate: new Date("2024-04-12"),
    content:
      "Streams provide an efficient way to handle reading/writing files, network communications, or any end-to-end information exchange.",
  },
  {
    title: "CSS Grid vs Flexbox",
    publishDate: new Date("2024-05-22"),
    content:
      "Both Grid and Flexbox are powerful layout systems. Understanding when to use each is key.",
  },
  {
    title: "A Guide to JavaScript Closures",
    publishDate: new Date("2024-06-01"),
    content:
      "Closures are functions that remember the variables from the place where they were defined, even after that context has gone.",
  },
  {
    title: "Improving Web Performance",
    publishDate: new Date("2024-06-18"),
    content:
      "Optimizing images, using lazy loading, and reducing render-blocking resources are crucial for performance.",
  },
  {
    title: "Demystifying Async/Await",
    publishDate: new Date("2024-07-04"),
    content:
      "Async/await simplifies asynchronous programming by allowing you to write promise-based code as if it were synchronous.",
  },
  {
    title: "The Basics of Functional Programming",
    publishDate: new Date("2024-07-20"),
    content:
      "Functional programming is a paradigm that treats computation as the evaluation of mathematical functions.",
  },
  {
    title: "What's New in ES2025",
    publishDate: new Date("2025-01-01"),
    content:
      "The latest ECMAScript introduces pattern matching, improved async handling, and more.",
  },
];
const login = localStorage.getItem("login") === 'admin'

function App() {
  return (
    <div className="w-[50%] flex flex-col border-3 border-black border-solid rounded-md p-10 gap-5" >

      {/* <h1 className="text-2xl font-bold">Personal Blog</h1> */}
      {/* {dummydata.map((art) => {
        return (
          <div>
            <Article article={art} />
          </div>
        );
      })} */}
      {/* <EditArticle title="Update"></EditArticle> */}
      {/* <Article article={dummydata[2]}/> */}
      <ArticleHome listArticle={dummydata} admin={!!login}></ArticleHome>

    </div>
  );
}

export default App;
