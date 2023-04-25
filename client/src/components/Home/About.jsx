import React from 'react'
import img from '../../assets/split-pdf.svg'

function About() {
  return (
    <div className="w-full bg-[#2abfff] py-16 px-4 " id="cli">
        <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
            <img className="w-[300px] mx-auto my-4" src={img} alt="/"/>
            <div className="flex flex-col justify-center">
                <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2 text-white">Introducing the revolutionary PDF extracting and summarising technology</h1>
                <p>Our web app is designed to transform the way you read and learn from PDFs!</p>
                {/* <a target='blank' ><button className='bg-white w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-4 text-center text-[#2abfff]'>Get Started</button></a> */}
                </div>
        </div>
      
    </div>
  )
}

export default About
