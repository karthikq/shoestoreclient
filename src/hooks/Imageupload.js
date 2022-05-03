/** @format */

import app from "../database/firebase";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useEffect, useState } from "react";

function Imageupload(file, setUrl, setpro) {
  const storage = getStorage(app);

  const storageRef = ref(storage, file.name);
  const uploadTask = uploadBytesResumable(storageRef, file);
  return uploadTask.on(
    "state_changed",
    (snapshot) => {
      let progress = (
        (snapshot.bytesTransferred / snapshot.totalBytes) *
        100
      ).toFixed(2);
      console.log(progress);
      setpro(progress);
      // perValue.innerHTML = progress + "%";
    },
    (error) => {
      throw new Error("Error while uploading data");
    },
    async () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      if (downloadURL) {
        return setUrl((preValue) => [...preValue, downloadURL]);
      }
    }
  );
}
export default Imageupload;
