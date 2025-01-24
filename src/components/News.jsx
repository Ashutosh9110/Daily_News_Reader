import axios from "axios";
import { useState } from "react";

const News = () => {
    const [query, setQuery] = useState("");
    const [news, setNews] = useState([]);
    const [message, setMessage] = useState(""); // State to handle messages like no results or errors

    const fetchNews = async () => {
        try {
            const response = await axios.get(
                `https://newsapi.org/v2/everything?q=${query}&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`
            );

            if (response?.data?.articles.length > 0) {
                setNews(response.data.articles);
                setMessage(""); // Clear message if articles are found
            } else {
                setNews([]); // Clear news array
                setMessage("No articles found with this keyword."); // Set "No articles" message
            }
        } catch (error) {
            console.error(error);
            setNews([]); // Clear news array
            setMessage("Failed to fetch news. Please try again later."); // Set error message
        }
    };

    const handleClick = () => {
        if (query.trim() === "") {
            setMessage("Please enter a keyword to search."); // Set message for empty query
            setNews([]);
        } else {
            fetchNews();
        }
    };

    const pressedEnterKey = (e) => {
        if (e.key === "Enter") {
            handleClick();
        }
    };

    return (
        <div className="bg-black min-h-screen">
            <header>
                <h4 className="text-4xl text-blue-400 pt-8 pb-4">Your Daily News Is Ready</h4>
                <p className="text-white opacity-80">Search and browse the latest news</p>
            </header>
            <div className="flex items-center justify-center mt-3 gap-4">
                <input
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={pressedEnterKey}
                    className="pl-2 bg-white w-sm h-8 rounded"
                    type="text"
                    placeholder="Search here . . ."
                />
                <button
                    onClick={handleClick}
                    className="gap-4 text-white bg-blue-700 w-20 h-8 rounded-xl"
                >
                    Search
                </button>
            </div>
            {message && (
                <div className="text-center text-red-500 mt-6 font-bold">
                    {message}
                </div>
            )}
            {news.length > 0 && (
                <div className="grid grid-cols-2 max-w-7xl mx-auto md:grid-cols-3 p-4">
                    {news.map((article, index) => (
                        <div
                            key={index}
                            className="w-80 h-auto shadow-lg bg-white rounded overflow-hidden mx-2 mt-16"
                        >
                            <div className="w-[auto] h-48">
                                <img
                                    className="w-full h-full object-cover"
                                    src={article.urlToImage || "https://via.placeholder.com/150"}
                                    alt={article.title}
                                />
                            </div>
                            <div>
                                <h1 className="pt-2 font-bold">{article.title}</h1>
                                <p className="text-sm opacity-[75%] pb-2">
                                    {article.description
                                        ? article.description.substring(0, 100)
                                        : "No description available."}
                                    ...
                                </p>
                                <div>
                                    <a
                                        href={article.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400 font-semi-bold px-6 pb-2"
                                    >
                                        Read more...
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default News;
