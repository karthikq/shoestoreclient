/** @format */

import React from "react";
import { GiConverseShoe } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";

const UsernavList = ({ parseState, icon, path, name }) => {
  const navigate = useNavigate();
  return (
    <li
      onClick={() => navigate("#" + path)}
      className={parseState === path ? "user-li user-li_active" : "user-li"}>
      {icon} {name}
    </li>
  );
};

export default UsernavList;
