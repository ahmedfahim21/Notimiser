import { Link } from 'react-router-dom'


const Home = () => {

  return (
    <div>
      <div>
        <nav className='flex justify-between'>

        <div className='text-5xl text-white'>
          Notimiser
        </div>

    <div className='flex'>
        <h1 className='m-2 p-2'>
          <Link to="/login">Login</Link>
        </h1>

        <h1 className='m-2 p-2'>
          <Link to="/signup">Signup</Link>
        </h1>
    </div>

        </nav>
        
        <p className='text-2xl'>
          Edit this homepage, this will be the landing page as of now we will use this for simpler nav
        </p>

      </div>
    </div>
  )
}

export default Home