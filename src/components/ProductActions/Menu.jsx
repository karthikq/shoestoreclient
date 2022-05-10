/** @format */

import * as React from "react";
import { styled, alpha } from "@mui/material/styles";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";

import Modal from "../model/Model";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";
import { useDispatch } from "react-redux";

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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [modelState, setModelState] = React.useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleEdit = () => {
    setAnchorEl(null);
    navigate(`/edit/product/${product.p_id}`);
  };
  const cb = () => {
    dispatch(removeProduct(postUser._id, navigate));
  };
  const handleDelete = () => {
    setAnchorEl(null);
    setModelState(true);
  };

  return (
    <div>
      <Modal
        state={modelState}
        setState={setModelState}
        cb={cb}
        text="Do you want to remove the product?"
      />
      <MoreHorizIcon
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        className="mui-dot_icon"
        onClick={handleClick}
      />
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}>
        <MenuItem onClick={handleEdit}>
          <EditIcon />
          Edit
        </MenuItem>
        {loginUser?._id === postUser?.userId && (
          <MenuItem onClick={handleDelete}>
            <DeleteIcon />
            Delete
          </MenuItem>
        )}
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleClose}>
          <PersonIcon />
          User
        </MenuItem>
        {/* <MenuItem onClick={handleClose} disableRipple>
          <MoreHorizIcon />
          More
        </MenuItem> */}
      </StyledMenu>
    </div>
  );
};

export default MenuDropdown;
