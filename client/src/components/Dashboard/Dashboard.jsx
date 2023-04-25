import React, { useState,  } from "react";
import Modal from "../Modal/Modal";
import { FcPrevious } from "react-icons/fc";
import { auth } from "../../firebase";
import { useEffect } from "react";
import note from "./../../assets/Sticky_Note.png"
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";


const Dashboard = () => {
  const [showMore, setShowMore] = useState(false);
  const buttonText = showMore ? "Close" : "Create a new note";
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
      {showMore ? (
                <div className=" flex w-[90%] sm:w-[70%] md:w-[60%] h-[70%] m-auto my-20 p-2 shadow-2xl rounded-3xl opacity-90">
                  <div className="w-full h-full flex-initial justify-center">
                    <div className="basis-11/12 flex py-2">
                      <button
                        className="hover:bg-[#2abfff] rounded p-2 inset-x-100"
                        onClick={() => {
                          setShowMore(!showMore);
                        }}
                      >
                        <FcPrevious className="w-[30px]" />
                      </button>
                    </div>
                    <div className="basis-11/12 flex py-2">
                      <Modal />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-screen flex">
                  <div className="flex justify-center mx-auto my-20">
                    <button
                      className="w-[400px] h-[500px] border-2 rounded-lg"
                      onClick={() => {
                        setShowMore(!showMore);
                      }}
                    >
                      <img src={note} alt="note" className="w-[200px] h-[200px] mt-[-100px] mx-auto" />
                      <p className="text-[#2abfff] font-bold text-2xl mt-10">{buttonText}</p>
                    </button>
                  </div>
                </div>
              )}
    </div>
  );}
};

export default Dashboard;