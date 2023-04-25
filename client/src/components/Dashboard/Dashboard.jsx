import React, { useState, useEffect } from "react";
import { useContext } from "react";
import AuthContext from '../../AuthContext'
import { useNavigate, Navigate } from "react-router-dom";

import { storage } from "../../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";


const Dashboard = () => {
  const [pdf, setPdf] = useState(null);
  const [progressCircle, setProgressCircle] = useState("");
  const [result, setResult] = useState("");


  const { user } = useContext(AuthContext);
  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();

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

    const formData = new FormData();
    formData.append("file", file);
    formData.append("start_page", startPage);
    formData.append("end_page", endPage);
    console.log(file);


    const response = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    })
    // .then(res => res.json())
    // .then(data => {
    //   console.log(data);
    //   setResult(data);
    // });

    const data = await response.json()
    setResult(data.extracted_text)

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
    <div className="flex">
      <h1>Profile</h1>

      <div className="m-auto">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col m-5 p-5 mt-[200px] "
        >
          <input
            type="file"
            name="pdf"
            id=""
            className="block w-full text-sm text-slate-500 file:rounded-full rounded-full"
          />
          <div className="flex flex-col">
            {/* <label>Start Page:</label> */}
            <input type="number" id="start-page" min="1" className="rounded-lg text-black m-2 p-2" placeholder="Start Page"/>
            {/* <label>End Page:</label> */}
            <input type="number" id="end-page" min="1" className="rounded-lg text-black m-2 p-2" placeholder="End Page"/>
          </div>
          <button
            type="submit"
            className="bg-white text-black  m-4 py-2 px-4 rounded-full"
          >
            Upload
          </button>
        </form>

        {!pdf && (
          <div>
            <div className="">
              {progressCircle && `${progressCircle} Notimising....`}{" "}
            </div>
          </div>
        )}

        {pdf && (
          <div className="">
            <button className="bg-white text-black  m-4 py-2 px-4 rounded-full">
              <a href={pdf} target="_blank" className="">
                View File
              </a>
            </button>

            <button
              type="submit"
              onClick={handleNotimisation}
              className="bg-white text-black  m-4 py-2 px-4 rounded-full"
            >
              View Notimised
            </button>

          </div>
        )}
        {result && <h1>{result.message}</h1>}

      </div>
    </div>
  );
};

export default Dashboard;