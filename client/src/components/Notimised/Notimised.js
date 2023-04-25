import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import { useRef } from 'react';

const Notimised = () => {
  const location = useLocation();
  const result = new URLSearchParams(location.search).get('result');
  const notimisedRef = useRef(result)

  const handleGeneratePDF = () => {

    const doc = new jsPDF({
			format: 'a4',
			unit: 'px',
		});

    doc.html(notimisedRef.current, {
			async callback(doc) {
				await doc.save(`note-heading`);
			},
    })

  }

  return (
    <div>
      <h1 className='text-5xl'>Note-Heading</h1>
      <button onClick={handleGeneratePDF}>
        Generate PDF
      </button>
      <div className='m-auto p-4 w-[500px] border-2 border-white rounded-lg'>
      <p className='italic text-amber-950 font-mono font-extrabold' ref={notimisedRef}>{result}</p>
      </div>
    </div>
  );
};

export default Notimised
