/** @format */

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm";

const Register = () => {
  const state = useSelector((state) => state.User.auth);
  const navigate = useNavigate();

  const handleRegister = () => {};

  return (
    <React.Fragment>
      <AuthForm
        loginState={false}
        handleAuth={handleRegister}
        values={{
          header: "Create new account",
          span: "Already have an Account?",
          path: "/user/login",
          text: "Log In",
          name: "Create Account",
        }}
      />
    </React.Fragment>
  );
};

export default Register;
