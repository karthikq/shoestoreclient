/** @format */

import React from "react";
import { BsBag } from "react-icons/bs";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addtocart } from "../actions/User";
import "./useractions.styles.scss";

const UserCart = ({ item, addtocart, userData }) => {
  const navigate = useNavigate();

  return (
    <div className="product-bag_icon">
      <BsBag onClick={() => addtocart(item._id, navigate)} />
    </div>
  );
};

export default connect(null, { addtocart })(UserCart);
