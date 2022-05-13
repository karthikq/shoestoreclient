/** @format */

import * as React from "react";
import { styled, alpha } from "@mui/material/styles";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import "./menu.styles.scss";
import Modal from "../model/Model";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";
import { BsFillPersonFill, BsThreeDotsVertical } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";

import { removeProduct } from "../actions";
import { useNavigate } from "react-router-dom";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const MenuDropdown = ({ loginUser, postUser, product }) => {
  const [anchorEl, setAnchorEl] = React.useState(false);
  const [modelState, setModelState] = React.useState(false);
  const auth = useSelector((state) => state.User.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit = () => {
    setAnchorEl(false);
    navigate(`/edit/product/${product.p_id}`);
  };

  const cb = async () => {
    const path = "productpage";
    dispatch(removeProduct(postUser._id, navigate, path));
  };

  const handleDelete = () => {
    setAnchorEl(false);
    setModelState(true);
  };

  return (
    <div className="product-dropdown">
      <Modal
        state={modelState}
        setState={setModelState}
        cb={cb}
        text="Do you want to remove the product?"
      />
      <BsThreeDotsVertical
        onClick={() => setAnchorEl(!anchorEl)}
        className={
          anchorEl
            ? "product-dropdown_icon-active product-dropdown_icon"
            : "product-dropdown_icon"
        }
      />

      {anchorEl && (
        <div
          className={
            anchorEl
              ? "product-dropdown-box_active product-dropdown-box"
              : "product-dropdown-box "
          }>
          <ul>
            {auth && loginUser?._id === postUser?.userId && (
              <li onClick={handleEdit}>
                <EditIcon />
                Edit
              </li>
            )}
            {auth && loginUser?._id === postUser?.userId && (
              <li onClick={handleDelete}>
                <MdDelete />
                Delete
              </li>
            )}

            <li
              onClick={() =>
                navigate(`/get/user/${postUser?.userId}#products`)
              }>
              <BsFillPersonFill />
              User
            </li>
          </ul>
        </div>
      )}
    </div>
    // <div>
    //   <Modal
    //     state={modelState}
    //     setState={setModelState}
    //     cb={cb}
    //     text="Do you want to remove the product?"
    //   />
    //   <MoreHorizIcon
    //     id="basic-menu"
    //     anchorEl={anchorEl}
    //     open={open}
    //     onClose={handleClose}
    //     MenuListProps={{
    //       "aria-labelledby": "basic-button",
    //     }}
    //   />
    //   <StyledMenu
    //     id="demo-customized-menu"
    //     MenuListProps={{
    //       "aria-labelledby": "demo-customized-button",
    //     }}
    //     anchorEl={anchorEl}
    //     open={open}
    //     onClose={handleClose}>
    //     {auth && loginUser?._id === postUser?.userId && (
    //       <MenuItem
    //         onClick={handleEdit}
    //         style={{ fontFamily: "Poppins", fontWeight: "600" }}>
    //         <EditIcon />
    //         Edit
    //       </MenuItem>
    //     )}
    //     {auth && loginUser?._id === postUser?.userId && (
    //       <MenuItem
    //         onClick={handleDelete}
    //         style={{ fontFamily: "Poppins", fontWeight: "600" }}>
    //         <DeleteIcon />
    //         Delete
    //       </MenuItem>
    //     )}
    //     <Divider sx={{ my: 0.5 }} />
    //     <MenuItem
    //       onClick={() => navigate(`/get/user/${postUser?.userId}#products`)}
    //       style={{ fontFamily: "Poppins", fontWeight: "600" }}>
    //       <PersonIcon />
    //       User
    //     </MenuItem>
    //     {/* <MenuItem onClick={handleClose} disableRipple>
    //       <MoreHorizIcon />
    //       More
    //     </MenuItem> */}
    //   </StyledMenu>
    // </div>
  );
};

export default MenuDropdown;
