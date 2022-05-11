/** @format */

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { backendApi } from "../../components/api/api";
import RadiusBtn from "../../components/button/RadiusBtn";
import "./reset.styles.scss";
import { motion } from "framer-motion";
import BackdropLoader from "../../components/loader/Backdrop";
import queryString from "query-string";
const ResetPass = ({ state }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState("");
  const [backdropState, setBackdropState] = useState(false);
  const [errors, setErrors] = useState({
    state: false,
    text: "",
    errArr: [],
  });

  const { id } = useParams();
  const [newUserData, setNewUserData] = useState({
    newpassword: "",
    confirmpassword: "",
  });

  //   useEffect(() => {
  //     if (!state) {
  //       checkToken();
  //     }
  //   }, [id, location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (state) {
      setErrors({ state: true });
      setBackdropState(true);
      try {
        const resp = await backendApi.post("/auth/check/useremail/" + userData);
        if (resp.status === 200) {
          toast.success("Email sent to " + userData);
          setErrors({
            state: true,
            text: "Email has been sent to " + userData,
          });
          setTimeout(() => {
            setBackdropState(false);
          }, 500);
        }
      } catch (error) {
        const err = error.response;
        if (err.status === 404) {
          toast.error(userData + " doesn't exists!");
          setBackdropState(false);
          setErrors({ state: false, text: userData + " doesn't exists!" });
        } else {
          toast.error("Please refresh the page and try again");
        }
      }
    } else {
      console.log(newUserData);
      //       const { newpassword, confirmpassword } = newUserData;
      //       if (!newpassword || !confirmpassword) {
      //         return;
      //       }
      //       if (newpassword !== confirmpassword) {
      //         toast.error("password doesn't match");
      //         return setErrors({ state: false, text: "Password's doesn't match" });
      //       }
      checkToken(newUserData);
      //       checkToken();
    }
  };
  const checkToken = async (newUserData) => {
    const { user } = queryString.parse(location.search);

    try {
      const { data } = await backendApi.post(
        `/auth/check/token/${id}?user=${user}`,
        newUserData
      );
      console.log(data);
    } catch (error) {
      console.log(error.response);
      let err = error.response;
      if (err.status === 422) {
        setErrors({ ...errors, errArr: err.data.errors });
      }
    }
  };
  console.log();
  return (
    <div className="reset-pass_container">
      <BackdropLoader open={backdropState} setOpen={setBackdropState} />
      <motion.div
        initial={{ opacity: 0, x: "-100%" }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: "-100%" }}
        transition={{ duration: 0.7 }}
        className="reset-pass_contents">
        <h1 className="reset-h1">
          {state ? "Enter your email address" : "Reset your Password"}
        </h1>
        <form onSubmit={handleSubmit} className="reset-form">
          {state ? (
            <React.Fragment>
              <input
                type="email"
                name="userEmail"
                required
                placeholder="email address"
                onChange={(e) => {
                  setErrors("");
                  setUserData(e.target.value);
                }}
              />
              {errors.text && (
                <span
                  className={
                    errors.state
                      ? "reset-error reset-error_active"
                      : "reset-error"
                  }>
                  {errors.text}
                </span>
              )}
            </React.Fragment>
          ) : (
            <div className="reset-pass_form">
              <input
                type="text"
                name="newpassword"
                placeholder="New password"
                onChange={(e) =>
                  setNewUserData({
                    ...newUserData,
                    newpassword: e.target.value,
                  })
                }
              />
              {errors.errArr.length > 0 && (
                <span className="reset-error">
                  {" "}
                  {errors.errArr?.find((item) => {
                    return item.param === "newpassword" && item.msg;
                  }) &&
                    errors.errArr?.find((item) => {
                      return item.param === "newpassword" && item.msg;
                    }).msg}
                </span>
              )}
              <input
                type="text"
                name="confirmpassword"
                placeholder="Confirm new password"
                onChange={(e) =>
                  setNewUserData({
                    ...newUserData,
                    confirmpassword: e.target.value,
                  })
                }
              />
              {errors.errArr.length > 0 && (
                <span className="reset-error">
                  {
                    errors.errArr?.find((item) => {
                      return item.param === "confirmpassword" && item.msg;
                    }).msg
                  }
                </span>
              )}
            </div>
          )}
          <RadiusBtn type="submit" disabled={errors.state} />
        </form>
        {state && (
          <Link to={"/user/login"} className="reset-back">
            Go back
          </Link>
        )}
      </motion.div>
    </div>
  );
};

export default ResetPass;
