/** @format */

import React, { useEffect, useState } from "react";
import Loader from "../loader/Loader";
import Imageupload from "../../hooks/Imageupload";
import imageCompression from "browser-image-compression";
import toast from "react-hot-toast";

const UploadImg = ({ file, setUploadedImgState, setUrlarray }) => {
  const [pro, setpro] = useState(0);

  const options = {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 560,
    useWebWorker: true,
  };

  // // for (let index = 0; index < file.length; index++) {
  // //   console.log(file[index]);
  // // }

  useEffect(() => {
    handleImageUpload();
    return () => {
      setUploadedImgState(false);
    };
  }, [file]);

  

  async function handleImageUpload() {
    const compressedFile = await imageCompression(file, options);
    try {
      Imageupload(compressedFile, setUrlarray, setpro);
    } catch (error) {
      toast.error("Please refresh the page and continue");
    }
  }
  return (
    <div className="upload-container">
 
      <div className="upload-contents">
        <img src={URL.createObjectURL(file)} alt="err" />
        <div className="progress-bar">
          <p style={{ width: pro + "%" }}></p>
        </div>
      </div>
      {pro !== "100.00" && (
        <div className="upload-loader_container">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default UploadImg;
