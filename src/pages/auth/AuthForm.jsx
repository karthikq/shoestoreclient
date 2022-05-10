/** @format */

import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import "./login.styles.scss";
import { motion } from "framer-motion";
import { backendUrl } from "../../components/api/Backendurl";

import { Link, useNavigate } from "react-router-dom";
import { LoginUser, ResiterUser } from "../../components/actions/auth/auth";
import toast from "react-hot-toast";
import { MdErrorOutline } from "react-icons/md";
import Button from "../../components/button/Button";
const AuthForm = ({
  loginState,
  handleAuth,
  values,
  LoginUser,
  ResiterUser,
}) => {
  const loginRef = useRef();
  const loginRef2 = useRef();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstname: "",
    lastname: "",
  });
  const [authErrors, setAuthErrors] = useState([]);
  const [err, setErr] = useState("");
  const [btnState, setBtnState] = useState(false);

  //   useEffect(() => {
  //     if (loginRef.current) {
  //       loginRef.current.addEventListener("click", (e) => {
  //         if (!e.target) return;
  //         if (e.target.contains(loginRef2.current)) {
  //           return setState(false);
  //           // window.history.pushState({}, "home", "/");
  //         }
  //       });
  //     }
  //   }, [setState, state]);

  let url = backendUrl();
  console.log(url);
  const handleErrors = (errors) => {
    if (errors.length > 0) {
      setAuthErrors(errors);
      setBtnState(false);
    } else {
      setAuthErrors(errors);
      setBtnState(false);
    }
  };

  const fetchErrorExists = (name) => {
    const data = authErrors?.find((err) => {
      return err.param === name;
    });
    return data?.msg;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginState) {
      const data = {
        email: userData.email,
        password: userData.password,
      };
      // handleAuth(userData, handleErrors, navigate);
      LoginUser(data, handleErrors, navigate);
    } else {
      ResiterUser(userData, handleErrors, navigate);
    }
    setBtnState(true);
  };

  return (
    <React.Fragment>
      <motion.div
        ref={loginRef}
        // initial={{ opacity: 0 }}
        // animate={{ opacity: 1 }}
        // exit={{ opacity: 0 }}
        className="login-container">
        <video autoPlay className="login-video_player">
          <source src="../videos/4.mp4" />
        </video>
        <motion.div
          ref={loginRef2}
          initial={{ opacity: 0, x: "-100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "-100%" }}
          transition={{ duration: 0.7 }}
          className="login-contents">
          <div className="login-list">
            <h4>{values.header}</h4>
            <span className="login-span">
              {values.span} <Link to={values.path}>{values.text}</Link>
            </span>
            <div className="social-login">
              <span className="social-span">Or continue with</span>
              <div className="social-login_icons">
                <a href={`${url}/auth/google/login`}>
                  <img src="https://i.ibb.co/c81tWLc/google.png" alt="google" />
                </a>
                <a href={`${url}/auth/facebook/login`}>
                  <img
                    src="https://i.ibb.co/r5zc7YR/facebook-1.png"
                    alt="facebook"
                  />
                </a>
              </div>
            </div>
            <div className="login-items">
              <form onSubmit={handleSubmit}>
                {!loginState && (
                  <>
                    <div className="login-item_header">
                      <input
                        type="text"
                        placeholder="First name"
                        className={
                          authErrors.find((err) => err.param === "firstname")
                            ? "login-item_header-input login-input_error"
                            : "login-item_header-input"
                        }
                        name="firstname"
                        required
                        minLength={3}
                        maxLength={12}
                        onChange={(e) =>
                          setUserData({
                            ...userData,
                            firstname: e.target.value,
                          })
                        }
                      />
                      <input
                        type="text"
                        placeholder="Last name"
                        name="lastname"
                        className={
                          authErrors.find((err) => err.param === "lastname")
                            ? "login-item_header-input login-input_error"
                            : "login-item_header-input"
                        }
                        onChange={(e) =>
                          setUserData({ ...userData, lastname: e.target.value })
                        }
                      />{" "}
                    </div>
                  </>
                )}
                <div className="login_input-box">
                  <input
                    type="text"
                    name="email"
                    required
                    placeholder="Email"
                    className={
                      authErrors.find((err) => err.param === "email")
                        ? "login_input login-input_error"
                        : "login_input"
                    }
                    onChange={(e) =>
                      setUserData({ ...userData, email: e.target.value })
                    }
                  />{" "}
                  {fetchErrorExists("email") ? (
                    <span className="error-span">
                      <MdErrorOutline />
                      {fetchErrorExists("email")}
                    </span>
                  ) : (
                    ""
                  )}
                </div>

                <div className="login_input-box">
                  <input
                    type="text"
                    placeholder="Password"
                    name="password"
                    required
                    className={
                      authErrors.find(
                        (err) =>
                          err.param === "password" ||
                          err.param === "confirmPassword"
                      )
                        ? "login_input login-input_error"
                        : "login_input"
                    }
                    onChange={(e) =>
                      setUserData({ ...userData, password: e.target.value })
                    }
                  />
                  {fetchErrorExists("password") ? (
                    <span className="error-span">
                      <MdErrorOutline />
                      {fetchErrorExists("password")}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                {!loginState && (
                  <div className="login_input-box">
                    <input
                      type="text"
                      name="confirmPassword"
                      placeholder="Confirm password"
                      className={
                        authErrors.find(
                          (err) => err.param === "confirmPassword"
                        )
                          ? "login_input login-input_error"
                          : "login_input"
                      }
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          confirmPassword: e.target.value,
                        })
                      }
                    />{" "}
                    {fetchErrorExists("confirmPassword") ? (
                      <span className="error-span">
                        <MdErrorOutline />
                        {fetchErrorExists("confirmPassword")}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                )}
                {loginState && (
                  <div className="login-forgot_pass">
                    <span>
                      <Link to="/user/reset/password">Forgot password?</Link>
                    </span>{" "}
                  </div>
                )}
                <div className="login-actions">
                  <button
                    className={
                      btnState
                        ? "login_action-btn login-btn-active"
                        : "login_action-btn"
                    }
                    disabled={btnState}>
                    <Button name={values.name} state={btnState} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </React.Fragment>
  );
};

export default connect(null, { LoginUser, ResiterUser })(AuthForm);
