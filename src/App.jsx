import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  const generateQuote = async () => {
    const quotesArray = await fetch('https://type.fit/api/quotes')
    .then(apiResponse => {
      return apiResponse.json();
    })
    .then(data => data);

    const numOfQuotes = quotesArray.length;
    const quoteIndex = Math.floor(Math.random() * numOfQuotes);

    console.log(quotesArray)

    const quoteString = quotesArray[quoteIndex].text;
    const quoteAuthor = quotesArray[quoteIndex].author.replace(", type.fit", "");

    setQuote(quoteString)
    setAuthor(quoteAuthor)
  }

  useEffect(() => {
    generateQuote();
  }, [])

  return (
    <div className='bg-[#280a48] h-screen flex justify-center items-center'>
      <div className='rounded-xl bg-gray-300 w-3/5 h-52 text-center'>
        <h1 className='font-serif text-2xl font-bold text-blue-800 py-3 mt-2'>Random Quote Generator</h1>
        <p className='text-lg italic mt-3'>{quote}</p>
        <p className='italic mt-1'>— {author}</p>
        <button className='mt-6 bg-purple-700 text-gray-200 font-bold p-1 px-3 rounded-lg' onClick={() => generateQuote()}>Generate Quote</button>
      </div>
    </div>
  )
}

export default App
