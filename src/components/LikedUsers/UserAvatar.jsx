/** @format */

import React from "react";
import "./like.styles.scss";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useNavigate } from "react-router-dom";

const UserAvatar = ({ avatar, name, value, userId, createdUser }) => {
  const navigate = useNavigate();
  return (
    <div className="selproduct-likes_user">
      <img src={avatar} alt="userprofile" />

      <div className="selproduct-user_details">
        <span
          className="selproduct-likes_user-span"
          onClick={() => navigate("/get/user/" + userId + "#products")}>
          {name}
        </span>{" "}
        <div className="selproduct-likes_user-date">
          {value ? (
            <span className="rating-user_span">Rated {value} stars </span>
          ) : (
            "12/04/22"
          )}
        </div>
      </div>
    </div>
  );
};

export default UserAvatar;
