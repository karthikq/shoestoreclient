/** @format */

import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRotue = ({ isAllowed, children }) => {
  if (!isAllowed) {
    return <Navigate to={"/"} replace />;
  }
  return children ? children : <Outlet />;
};

export default ProtectedRotue;
