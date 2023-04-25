import './App.css'
import { useState } from 'react'

function App() {
  
  const [message, setMessage] = useState('Loading...')

  const onSubmit = async e => {
    e.preventDefault();
    fetch('http://localhost:5000/upload', {
      method: 'POST'
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setMessage(data);
      });
  };

  return (
    <>
      <form onSubmit={onSubmit}>
      <input
          type='submit'
          value='test'
          className='btn btn-primary btm-block mt-4'
        />
        </form>
      <h1 className="text-3xl font-bold underline">
      Hello {message && <h1>{message.message}</h1>}
    </h1>

    </>
  )
}

export default App
