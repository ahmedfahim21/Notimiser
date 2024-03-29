import React from 'react'
import img from '../../assets/split-pdf.svg'
import { HiChevronDoubleRight } from "react-icons/hi";


function About() {
  return (
    <div className="w-full bg-[#2abfff] py-16 px-4 " id="about">
        <div className="max-w-[1240px] mx-auto grid md:grid-cols-2 ">
            <img className="w-[600px] mx-auto my-4" src={img} alt="/"/>
            <div className="flex flex-col justify-center">
                <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2 text-white">Introducing the revolutionary PDF extracting and summarising technology</h1>
                <p>Our web app is designed to transform the way you read and learn from PDFs!</p>
                {/* <a target='blank' ><button className='bg-white w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-4 text-center text-[#2abfff]'>Get Started</button></a> */}
            </div>
        </div>


            <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold md:py-4 py-2 text-white underline md:mx-[250px] sm:mx-auto mx-[100px]">How it works</h1>

            <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
              <div className='md:text-5xl sm:text-3xl text-2xl font-bold py-2 my-auto text-white mx-auto'>
                <p>You do the steps,</p>
                <p>we handle the <span className='text-black'>power.</span></p>

                {/* <p className='md:text-[20px] sm:text-[12px] text-[10px] py-2 my-auto text-slate-600 mx-auto'>Our system is powered by Machine Learning models to extract text from pdfs and summarise them..</p> */}
              </div>

              <div>

                <div className='border-2 border-white rounded-[33px] m-2 p-4 flex'>
                  {/* <div className='border-2 border-white rounded-[88px]  m-1 mt-2 text-center my-auto'>1</div> */}
                  <div className='text-[33px] my-auto text-white mx-2'>
                  <HiChevronDoubleRight></HiChevronDoubleRight>
                  </div>
                  <div>
                  <h1 className='text-[32px] font-semibold'>Register</h1>
                  <p className='text-[20px] text-slate-600'>
                  Login with email and password or with your google account

                  </p>
                  </div>
                </div>

                <div className='border-2 border-white rounded-[33px] m-2 p-4 flex'>
                  
                    <div className='text-[33px] my-auto text-white mx-2'>
                      <HiChevronDoubleRight></HiChevronDoubleRight>
                    </div>
                  <div>
                <h1 className='text-[32px] font-semibold'>Upload</h1>
                <p className='text-[20px] text-slate-600'>
                  Upload your boring textbooks into our customised pdf splitter
                </p>
                  </div>
                </div>

                <div className='border-2 border-white rounded-[33px] m-2 p-4 flex'>
                 
                      <div className='text-[33px] my-auto text-white mx-2'>
                        <HiChevronDoubleRight></HiChevronDoubleRight>
                      </div>
                  <div>
                <h1 className='text-[32px] font-semibold text-white'>Notimise</h1>
                <p className='text-[20px] text-slate-600'>
                  Generate summarised text from your pdfs, with the option to download them as a pdf
                </p>
                  </div>
                </div>
              </div>
            </div>
      
    </div>
  )
}

export default About
