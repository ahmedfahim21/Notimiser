import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import { useRef, useState } from 'react';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../firebase';

const Notimised = () => {
  const location = useLocation();
  const result = new URLSearchParams(location.search).get('result');
  const notimisedRef = useRef(result)

  const [notimisedFB, setNotimisedFB] = useState(null)

  const handleGeneratePDF = (e) => {

    e.preventDefault()

    const doc = new jsPDF({
      orientation: 'portrait',
			unit: 'px',
      format: 'a4'
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

  return (
    <div>
      <h1 className='text-5xl'>Note-Heading</h1>
      <button onClick={handleGeneratePDF}>
        Generate PDF
      </button>

      {notimisedFB && 
      <a href={notimisedFB}>View PDF</a>
      }

      <div className='m-auto p-4 w-[500px] border-2 border-white rounded-lg'>
      <p className='italic text-amber-950 font-mono font-extrabold' ref={notimisedRef}>{result}</p>
      </div>
    </div>
  );
};

export default Notimised
