import React from 'react'
import { useState } from 'react'

function Doubts() {
    const [answer, setAnswer] = useState("")
    const [query, setQuery] = useState('');

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  }

    const handleSubmit = async(event) => {
        event.preventDefault();
        fetch(`http://localhost:5000/doubts?query=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => setAnswer(data.answer))
    
        // const formData = new FormData();
        //   formData.append("question", query);
      
        //   const response = await fetch("http://localhost:5000/doubts", {
        //     method: "POST",
        //     body: formData,
        //   })
      
        //   const data = await response.json()
        //   setAnswer(data.answer)
    
      }

  return (
    <div>
    <form
      onSubmit={handleSubmit}
      className="flex flex-col mx-5 px-5 mt-[50px] "
    >            
        <input id="question" value={query} onChange={handleQueryChange} className="m-2 p-3 text-lg bg-white border-2 my-1 rounded-lg text-[#2abfff] placeholder:text-[#2abfff] w-[50%]" placeholder="Ask your doubt here"/>

      <button
        type="submit"
        className="p-3 my-10 text-lg text-white border-2 border-white rounded-lg bg-[#2abfff] w-[100%]"
      >
        Ask Doubt
      </button>
    </form>
    {answer && <p className='text-black text-xl px-5 mx-5'>{answer}</p>}
    </div>
  )
}

export default Doubts






