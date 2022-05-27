/** @format */

import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { backendApi } from "../../components/api/api";
import RadiusBtn from "../../components/button/RadiusBtn";
import "./reset.styles.scss";
import { motion } from "framer-motion";
import BackdropLoader from "../../components/loader/Backdrop";
import queryString from "query-string";

import { BiErrorCircle } from "react-icons/bi";

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
        }
        setTimeout(() => {
          setBackdropState(false);
        }, 500);
      } catch (error) {
        const err = error.response;
        console.log(err);
        if (err.status === 404) {
          toast.error(userData + " doesn't exists!");
          setBackdropState(false);
          setErrors({ state: false, text: userData + " doesn't exists!" });
        } else {
          toast.error("Please refresh the page and try again");
        }
      }
    } else {
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
    setBackdropState(true);
    const toastToken = toast.loading("Updating password");

    try {
      setErrors({});
      const { data } = await backendApi.post(
        `/auth/check/token/${id}?user=${user}`,
        newUserData
      );
      if (data) {
        toast.success("Password updated", {
          id: toastToken,
        });
        navigate("/user/login");
      }
      setBackdropState(false);
    } catch (error) {
      toast.dismiss();
      let err = error.response;
      if (err.status === 422) {
        setErrors({ ...errors, errArr: err.data.errors });
      }
      if (err.status === 404) {
        toast(
          (t) => (
            <span>
              Token Expired
              <button
                className="toast-error_btn"
                onClick={() => {
                  navigate("/user/reset/password");
                  toast.dismiss(t.id);
                }}>
                Click here
              </button>{" "}
              to go back
            </span>
          ),

          {
            icon: (
              <BiErrorCircle
                style={{ fontSize: "1.2rem", color: "rgb(218, 35, 35)" }}
              />
            ),
          }
        );
        setErrors({
          state: false,
          errArr: [],
          text: "Token expired please go back and try again",
        });
      }
      setBackdropState(false);
    }
  };

  const fetchErrorExists = (name) => {
    const data = errors.errArr?.find((err) => {
      return err.param === name;
    });
    return data?.msg;
  };

  return (
    <div className="reset-pass_container">
      <BackdropLoader open={backdropState} setOpen={setBackdropState} />
      <video autoPlay className="login-video_player">
        <source src="../../videos/3.mp4" />
      </video>
      <motion.div
        initial={{ opacity: 0, x: "-100%" }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: "-100%" }}
        transition={{ duration: 0.7 }}
        className="reset-pass_contents">
        <h1 className={state ? "reset-h1" : "reset-h1 reset-h1_user"}>
          {state ? "Enter your email address" : "Reset your Password"}
        </h1>
        {state && (
          <Link to={"/user/login"} className="reset-back">
            Click here to go back
          </Link>
        )}
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
                  {errors.text}. <br />
                  From karthikemail99@gmail.com.
                </span>
              )}
            </React.Fragment>
          ) : (
            <div className="reset-pass_form">
              <input
                type="password"
                name="newpassword"
                placeholder="New password"
                onChange={(e) =>
                  setNewUserData({
                    ...newUserData,
                    newpassword: e.target.value,
                  })
                }
              />
              {fetchErrorExists("newpassword") && (
                <span className="reset-error">
                  {fetchErrorExists("newpassword")}
                </span>
              )}
              <input
                type="password"
                name="confirmpassword"
                placeholder="Confirm new password"
                onChange={(e) =>
                  setNewUserData({
                    ...newUserData,
                    confirmpassword: e.target.value,
                  })
                }
              />
              {fetchErrorExists("confirmpassword") && (
                <span className="reset-error">
                  {fetchErrorExists("confirmpassword")}
                </span>
              )}
              {errors.text && (
                <span className="reset-error">
                  {errors.text}
                  <Link to="/user/reset/password" className="reset-back">
                    click here
                  </Link>{" "}
                </span>
              )}
            </div>
          )}
          <RadiusBtn type="submit" disabled={errors.state} />
        </form>
      </motion.div>
    </div>
  );
};

export default ResetPass;
