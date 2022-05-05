/** @format */

import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { BiHeart } from "react-icons/bi";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userAddtofav } from "../actions/User";
import "./useractions.styles.scss";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Userfav = ({ userData, item, userAddtofav }) => {
  const navigate = useNavigate();
  return (
    <div className="product-fav">
      {userData.favProducts?.find((prod) => prod.product?._id === item?._id) ? (
        <FavoriteIcon
          className="product-fav_icon product-user_fav"
          onClick={() => userAddtofav(item._id, false, navigate)}
        />
      ) : (
        <FavoriteBorderIcon
          className="product-fav_icon"
          onClick={() => userAddtofav(item?._id, true, navigate)}
        />
      )}
    </div>
  );
};

export default connect(null, { userAddtofav })(Userfav);
