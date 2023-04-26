import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import { useRef, useState } from 'react';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../firebase';
import { Link } from 'react-router-dom';
import React, {useEffect} from 'react';
import { auth } from '../../firebase';
import Loading from '../Loading/Loading';
import { FaFileDownload } from 'react-icons/fa';

const Notimised = () => {
  const location = useLocation();
  const result = new URLSearchParams(location.search).get('result');
  const notimisedRef = useRef(result)
  const [answer, setAnswer] = useState("")

  const [notimisedFB, setNotimisedFB] = useState(null)


  const handleGeneratePDF = (e) => {

    e.preventDefault()

    const doc = new jsPDF({
      orientation: 'landscape',
			unit: 'px',
      format: 'a2'
		});

    doc.html(notimisedRef.current, {
			async callback(doc) {
				await doc.save(`1`);
			},
    })

    const file = e.target[0]?.files[0]

    if(!file) {
      return
    }

    const storageRef = ref(storage, `notimised/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed", 
    (error) => {
      alert(error)
    },

    () => getDownloadURL(uploadTask.snapshot.ref).then((downloadURl) => {
      setNotimisedFB(downloadURl)
    })
    )
  }

  const [userName, setUserName] = useState("")
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => { setIsLoading(false) }, 1600);
  }, [])

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName)
      }
      else {
        setUserName("")
      }
    })
  
  }, [])

  // const question = document.getElementById("question").value;

  // const handleSubmit = async() => {

  //   const formData = new FormData();
  //     formData.append("question", question);
  
  //     const response = await fetch("http://localhost:5000/doubt", {
  //       method: "POST",
  //       body: formData,
  //     })
  
  //     const data = await response.json()
  //     setAnswer(data.answer)

  // }


  if (isLoading) {
    return (
      <div className="bg-background w-full overflow-hidden">
        <Loading />
      </div>
    )
  } else {
  return (
    <div>
      <header className="h-[80px] w-full bg-[#2abfff] font-bold p-5 text-2xl text-white flex justify-between items-center">
        <p>Welcome {userName}</p>
        <Link to='/login'><p className="justify-end text-xl border-2 border-white p-2 rounded-md hover:bg-white hover:text-[#2abfff]">Logout</p></Link>
      </header>
      <div className='flex justify-between'>
      <Link to='/dashboard'><p className="justify-start text-xl border-2 border-[#2abfff] p-2 rounded-md text-[#2abfff] m-3">Back</p></Link>
      <h1 className='text-5xl mx-auto text-center my-8'>Notimised Text</h1> 
      <button onClick={handleGeneratePDF} className='justify-end m-5'>
        <FaFileDownload size="40px" />
      </button>
      </div>
      {notimisedFB && 
      <a href={notimisedFB}>View PDF</a>
      }

      <div className='m-auto p-4 md:w-[60%] w-[80%]'>
      {/* <p className='text-black text-xl' >{result}</p> */}
      <p className='text-black text-xl m-4 p-4' ref={notimisedRef}>{result}</p>
      
      </div>
{/*       
        {answer && <p className='text-black text-xl' ref={notimisedRef}>{answer}</p>}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col m-5 p-5 mt-[50px] "
        >            
            <input id="question" className="m-2 p-3 text-lg bg-white border-2 my-1 rounded-lg text-[#2abfff] placeholder:text-[#2abfff] w-[50%]" placeholder="Questions"/>

          <button
            type="submit"
            className="p-3 my-10 text-lg text-white border-2 border-white rounded-lg bg-[#2abfff] w-[100%]"
          >
            Ask Doubt
          </button>
        </form> */}
    </div>
  )};
};

export default Notimised