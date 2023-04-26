import React, { useState, useEffect } from "react";
import { useContext } from "react";
import AuthContext from '../../AuthContext'
import { useNavigate, Navigate } from "react-router-dom";
import img from '../../assets/split-pdf.svg'
import { storage } from "../../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar'


const Modal = () => {
    const [showModal,setShowModal]=useState(false);
    const open=()=>{
    setShowModal(!showModal);
    }
    const [pdf, setPdf] = useState(null);
    const [progressCircle, setProgressCircle] = useState("");
    const [result, setResult] = useState("");
    const [show, setShow] = useState(false);
  
  
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
  
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      setShow(true);
  
      const file = event.target[0]?.files[0];
  
      if (!file) {
        return;
      }
  
      const storageRef = ref(storage, `files/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on(
        "state_changed",
        (snapshots) => {
          const progress = Math.round(
            (snapshots.bytesTransferred / snapshots.totalBytes) * 100
          );
          setProgressCircle(progress);
        },
        (error) => {
          alert(error);
        },
        () =>
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURl) => {
            setPdf(downloadURl);
          })
      );
  
      const startPage = document.getElementById("start-page").value;
      const endPage = document.getElementById("end-page").value;
      // const title = document.getElementById("title").value;
  
      const formData = new FormData();
      formData.append("file", file);
      // formData.append("title", title);
      formData.append("start_page", startPage);
      formData.append("end_page", endPage);
      console.log(file);
  
  
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      })
  
      const data = await response.json()
      setResult(data.summary_text)
  
    };
  
    const handleNotimisation = () => {
      if(result) {
        navigate("/notimised?result="+ encodeURIComponent(result))
      }
      else {
        alert("Please upload a pdf to process first")
      }
    }

  return (
        <div className="flex flex-col mx-auto h-[600px]">
          {!show? (
        <>
          <img src={img} className="mx-auto p-0 w-[60%]" alt="" />
        <form
          onSubmit={handleSubmit}
          className="flex flex-col m-5 p-5 mt-[50px] "
        >
          {/* <input
            type="text"
            name="pdf"
            id="title"
            required
            className="p-3 pl-5 text-lg bg-white border-2 border-white my-1 rounded-lg text-[#2abfff] placeholder:text-[#2abfff] w-[100%]"
          /> */}
          <input
            type="file"
            name="pdf"
            id=""
            required
            className="p-3 pl-5 text-lg bg-white border-2 border-white my-1 rounded-lg text-[#2abfff] placeholder:text-[#2abfff] w-[100%]"
          />
          <div className="flex">
            
            <input type="number" id="start-page" min="1" className="m-2 p-3 text-lg bg-white border-2 my-1 rounded-lg text-[#2abfff] placeholder:text-[#2abfff] w-[50%]" placeholder="Start Page"/>
            <input type="number" id="end-page" min="1" className="m-2 p-3 text-lg bg-white border-2  my-1 rounded-lg text-[#2abfff] placeholder:text-[#2abfff] w-[50%]" placeholder="End Page"/>
          </div>
          <button
            type="submit"
            className="p-3 my-10 text-lg text-white border-2 border-white rounded-lg bg-[#2abfff] w-[100%]"
          >
            NOTIMISE
          </button>
        </form>
        </>):(
        <div className="flex flex-col mx-auto">
          <div className="w-[150px] justify-center mx-auto mt-[100px]">
          <CircularProgressbarWithChildren value={progressCircle} strokeWidth={6} styles={buildStyles({ pathColor: "#2abfff", trailColor: "#eee" })}>
        <div>{`${progressCircle}%`}</div>
      </CircularProgressbarWithChildren>
      </div>

        {!pdf?(
          <div>
            <p className="text-[#2abfff] font-bold my-10 text-center text-xl">
              {progressCircle && `Notimising....`}{" "}
            </p>
          </div>
        ):(
          <div className="text-[#2abfff] text-xl">
            
            
      <div className="mx-auto justify-center">
            <p className="text-[#2abfff] font-bold text-center my-10 text-xl">Notimised</p>
            <button className="m-4  hover:bg-[#2abfff] border-2 border-[#2abfff] hover:text-white rounded-md p-2">
              <a href={pdf} target="_blank" className="">
                Uploaded File
              </a>
            </button>
            <button
              type="submit"
              onClick={handleNotimisation}
              className="m-4  hover:bg-[#2abfff] border-2 border-[#2abfff] hover:text-white rounded-md p-2"
            >Notimised File</button>

          </div>
          </div>
        )}
        {result && <h1>{result.message}</h1>}
        </div>)}
      </div>
  );
};

export default Modal;
