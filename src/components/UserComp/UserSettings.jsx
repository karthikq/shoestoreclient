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
import validator from "validator";
import CSCpicker from "../Countries/CSCpicker";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import startsWith from "lodash.startswith";
import {
  isPossiblePhoneNumber,
  isValidPhoneNumber,
  validatePhoneNumberLength,
} from "libphonenumber-js";

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

  const [phoneDetails, setPhoneDetails] = useState({
    value: "",
    details: {},
  });

  const [details, setDetails] = useState({
    country: "",
    state: "",
    city: "",
  });

  const [error, setError] = useState({
    type: "",
    text: "",
    errors: [],
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: useMemo(() => {
      return userDetails;
    }, [userDetails]),
  });
  useEffect(() => {
    setImagepath(userDetails.profileUrl);
    setPhoneDetails(userDetails?.phoneDetails);
    setDetails(userDetails?.userLocation);
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
    data.userLocation = details;
    data.phoneDetails = phoneDetails;
    setError("");
    toast.dismiss();

    if (!phoneDetails || !phoneDetails.value) {
      return setError({
        type: "phone",
        text: "This field is required",
      });
    }
    if (phoneDetails.value) {
      const phonenumber = phoneDetails.value
        .split("")
        .splice(phoneDetails.details.dialCode.length, phoneDetails.value.length)
        .join("");

      const isValid = isValidPhoneNumber(
        phonenumber,
        phoneDetails.details.countryCode.toUpperCase()
      );

      if (!isValid) {
        return setError({ type: "phone", text: "Mobile no is not valid" });
      } else {
        setError("");
      }
      if (phoneDetails.details.countryCode.toUpperCase() !== details.country) {
        return setError({
          type: "country",
          text: `Mobile (${phoneDetails.details.countryCode.toUpperCase()}) and user (${
            details.country
          }) location's doesn't match`,
        });
      }
    }
    if (!details.country) {
      return setError({
        type: "state",
        text: "Please select Country and try again",
      });
    }
    if (details.country) {
      if (!details.state) {
        return setError({
          type: "state",
          text: "Please select state and city if there is...",
        });
      }
    }
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
              {/* <label>Email</label> */}
              {/* <input
                name="phonenumber"
                type="text"
                placeholder="Mobile No"
                className="usersetting-input"
                {...register("phonenumber")}
              /> */}
              <PhoneInput
                containerClass="phone_cont"
                inputClass="phone_input"
                buttonClass="phone_button"
                country={"in"}
                enableSearch
                enableAreaCodeStretch
                value={phoneDetails?.value}
                placeholder="Mobile No"
                onChange={(e, { countryCode, dialCode, name: country }) => {
                  setError("");

                  setPhoneDetails({
                    value: e,
                    details: { countryCode, dialCode, country },
                  });
                }}
              />
              {error.type === "phone" && (
                <span className="usersetting_error_span">{error.text}</span>
              )}
            </div>
            <div className="usersetting-input_items">
              <CSCpicker
                state="country"
                details={details}
                setDetails={setDetails}
              />{" "}
              {error.type === "country" && (
                <span className="usersetting_error_span">{error.text}</span>
              )}
              {error.type === "state" && (
                <span className="usersetting_error_span">{error.text}</span>
              )}
            </div>
            <div className="usersetting-input_items-header">
              <CSCpicker
                state="state"
                value={details?.country || ""}
                details={details}
                setDetails={setDetails}
              />

              <CSCpicker
                state="city"
                value={details?.state || ""}
                details={details}
                setDetails={setDetails}
              />
            </div>{" "}
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
