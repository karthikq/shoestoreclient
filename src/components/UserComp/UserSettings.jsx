/** @format */

import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./user.styles.scss";
import { useForm } from "react-hook-form";

import { AnimatePresence, motion } from "framer-motion";
import UploadImg from "../uploads/UploadImg";
import toast from "react-hot-toast";
import { connect } from "react-redux";
import { UpdateUserDetails } from "../actions/User";
import Loader from "../loader/Loader";
import Button from "../button/Button";
import SimpleLoader from "../loader/SimpleLoader";

const UserSettings = ({ UpdateUserDetails }) => {
  const navigate = useNavigate();
  const { auth, userDetails } = useSelector((state) => state.User);
  const [changeImage, setChangeImage] = useState(false);
  const [imagePath, setImagepath] = useState("");
  const [userFile, setuserFile] = useState("");
  const [uploadedImgState, setUploadedImgState] = useState(false);
  const [newuserData, setNewuserData] = useState({});
  const [urlarray, setUrlarray] = useState("");
  const [btnState, setbtnState] = useState(false);

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({
    defaultValues: useMemo(() => {
      return userDetails;
    }, [userDetails]),
  });
  useEffect(() => {
    setImagepath(userDetails.profileUrl);
    reset(userDetails);
  }, [userDetails]);

  //   const [userData, setUserData] = useState({
  //     firstname: "",
  //     lastname: "",
  //     email: "",
  //   });

  //   if (!auth) {
  //     navigate("/");
  //   }

  const callBack = () => {
    setUploadedImgState(false);
    setbtnState(false);
    setUrlarray([]);
    setChangeImage(false);
  };
  const handleChange = (e) => {
    const file = e.target.files[0];
    setuserFile(file);
    const imageUrl = URL.createObjectURL(file);
    setImagepath(imageUrl);
  };
  const onSubmit = (data) => {
    toast.dismiss();
    if (userDetails.profileUrl === imagePath) {
      UpdateUserDetails(data, callBack);
    } else {
      setNewuserData(data);
      if (!userFile) {
        return toast.error("Please select one Image");
      }
      toast.loading("Uploding Image please wait");
      setUploadedImgState(true);
    }
    setbtnState(true);
  };

  useEffect(() => {
    if (urlarray.length > 0) {
      toast.dismiss();
      const userData = { ...newuserData, profileUrl: urlarray[0] };

      UpdateUserDetails(userData, callBack);
      toast.dismiss();
    }
  }, [urlarray]);

  return (
    <div className="usersetting-container">
      <AnimatePresence exitBeforeEnter>
        <motion.div layout="position" className="usersetting-contents">
          <form onSubmit={handleSubmit(onSubmit)} className="usersetting-form">
            <div className="usersetting-input_items-header">
              {/* <label>First name</label> */}
              <input
                type="text"
                placeholder="First name"
                name="firstname"
                minLength={3}
                maxLength={12}
                className="usersetting-input"
                {...register("firstname", {
                  minLength: { value: 3, message: "Minimum of 3 character's" },
                  required: true,
                })}
              />
              <input
                type="text"
                placeholder="last name"
                className="usersetting-input"
                {...register("lastname")}
              />
            </div>

            <div className="usersetting-input_items">
              {/* <label>Email</label> */}
              <input
                readOnly
                type="email"
                required
                placeholder="Email"
                className="usersetting-input"
                {...register("email")}
              />
            </div>
            <div className="usersetting-input_items">
              {/* <label>Profile Img</label> */}
              <div className="usersetting-profile">
                <div className="usersetting-profile_img">
                  {uploadedImgState && (
                    <div className="usersetting-loader">
                      <SimpleLoader>
                        <div className="btn-loading-div"></div>
                      </SimpleLoader>
                    </div>
                  )}
                  <img src={imagePath} alt="profile_img" />
                </div>
                {changeImage ? (
                  !uploadedImgState && (
                    <p
                      onClick={() => {
                        setChangeImage(false);
                        setImagepath(userDetails.profileUrl);
                      }}>
                      Cancel
                    </p>
                  )
                ) : (
                  <p
                    onClick={() => {
                      setChangeImage(true);
                      setImagepath("");
                    }}>
                    Change profile pic
                  </p>
                )}
              </div>
              {/* <ImageCrop src={imagePath} /> */}
              {changeImage && !uploadedImgState && (
                <input
                  type="file"
                  accept=".jpg,.png,.jpeg"
                  className="usersetting-input"
                  onChange={handleChange}
                />
              )}
              {uploadedImgState && (
                <UploadImg
                  file={userFile}
                  setUrlarray={setUrlarray}
                  setUploadedImgState={setUploadedImgState}
                />
              )}
            </div>
            <button
              type="submit"
              disabled={uploadedImgState}
              className="usersetting-btn">
              <Button name={"Update"} state={btnState} />
            </button>
          </form>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default connect(null, { UpdateUserDetails })(UserSettings);
