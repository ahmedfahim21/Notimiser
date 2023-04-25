import { useLocation } from 'react-router-dom';

const Notimised = () => {
  const location = useLocation();
  const result = new URLSearchParams(location.search).get('result');

  return (
    <div>
      <h1 className='text-5xl'>Note-Heading</h1>
      <div className='m-auto p-4 w-[500px] border-2 border-white rounded-lg'>
      <p className='italic text-amber-950 font-mono font-extrabold'>{result}</p>
      </div>
    </div>
  );
};

export default Notimised