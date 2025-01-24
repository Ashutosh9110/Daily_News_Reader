import axios from "axios"
import { useState } from "react"


const News = () => {
    

    const [ query, setQuery ] = useState("")
    const [ news, setNews ] = useState([])
    // console.log(news)

    const fetchNews = async () => {
        try {
            const response = await axios.get(`https://newsapi.org/v2/everything?q=${query}&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`)

            if (response?.data) {
                setNews(response?.data?.articles)
            }

            // console.log(response.data.articles)
        } catch (error) {
            console.log(error)
        }
    }

    const handleClick = () => {
        fetchNews()
    }

    const pressedEnterKey = (e) => {
        if (e.key === "Enter") {
            handleClick()
        }
    }

  return (
    <div className='bg-black min-h-screen'>
        <header>
            <h4 className="text-4xl text-blue-400 pt-8 pb-4">Your Daily News Is Ready</h4>
            <p className="text-white opacity-80">Search and browse latest news</p>
        </header>
            try {
            <div>
            <div className="flex items-center justify-center mt-3 gap-4">
                <input 
                onChange={(e) => setQuery(e.target.value)} 
                onKeyDown={pressedEnterKey}
                className="pl-2 bg-white w-sm h-8 rounded" 
                type="text" 
                placeholder="Search here . . ." />
                <button 
                onClick={handleClick} 
                className="gap-4 text-white bg-blue-700 w-20 h-8 rounded-xl">Search</button>
            </div>
            <div className="grid grid-cols-2 max-w-7xl mx-auto md:grid-cols-3 p-4">
                {
                    news?.map((article) => (
                        <div className="w-80 h-auto shadow-lg bg-white rounded overflow-hidden mx-2 mt-16">
                        <div className="w-[auto] h-48">
                            <img className="w-full h-full object-cover" src={article.urlToImage} alt="" />
                        </div>
                        <div>
                            <h1 className="pt-2 font-bold">{article.title}</h1>
                            <p className="text-sm opacity-[75%] pb-2">{article.description.substring(0, 100)}. . .</p>
                            <div>
                            <a href={article.url} target="_blank" className="text-blue-400 font-semi-bold px-6 pb-2">Read more...</a>
                            </div>
                        </div>
                        </div>
                    ))
                }
            </div>
            </div>
            } catch (error) {
                console.log("None articles found with this keyword")
            }
        </div>
  )
}

export default News