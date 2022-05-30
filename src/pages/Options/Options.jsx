/** @format */

import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./options.styles.scss";
import { motion } from "framer-motion";
import { connect } from "react-redux";

import { BiCategoryAlt, BiRightArrowAlt } from "react-icons/bi";

import OptionItem from "./OptionItem";
import { useNavigate } from "react-router-dom";
import { fetchselProduct, fetchProducts } from "../../components/actions";
import BackdropLoader from "../../components/loader/Backdrop";
import allproducts from "../../ProdCat.json";

const Options = ({ fetchselProduct, navigationState, fetchProducts }) => {
  const [selOptions, setSelOptions] = useState([]);
  const [btnState, setBtnState] = useState(false);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const checkExists = (userChoice) => {
    const value = userChoice.toLowerCase().replace(/\s/g, "");
    const val = selOptions?.find((item) => item === value);

    if (val) {
      const data = selOptions?.filter((item) => item !== val);

      setSelOptions(data);
    } else {
      setSelOptions([value]);
    }
  };

  useEffect(() => {
    fetchProducts();
    const data = sessionStorage.getItem("data");
    if (!data) {
      return;
    } else {
      setSelOptions(data.split(","));
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    toast.dismiss();
    if (selOptions.length === 0) {
      return toast.error("Select at least one item");
    } else {
      // setBtnState(true);
      setOpen(true);
      toast.loading("Finding products please wait...");

      sessionStorage.setItem("data", selOptions);

      await fetchselProduct();

      setTimeout(() => {
        navigate("/product/list", {
          state: selOptions,
        });
        toast.dismiss();
        setOpen(false);
      }, 1500);
    }
  };

  return (
    <motion.div
      // initial={{}}
      // animate={{}}
      // exit={{}}
      // transition={{ duration: 0.5, ease: "linear" }}
      className="options-container">
      <BackdropLoader open={open} setOpen={setOpen} />
      <div className="options-contents">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}>
          <BiCategoryAlt className="option-cat-icon" />
          Choose a category
        </motion.h2>

        <div className="options-list">
          <form onSubmit={onSubmit}>
            <div className="options-btn-list">
              {allproducts.map((item) => (
                <OptionItem
                  checkExists={checkExists}
                  selOptions={selOptions}
                  value={item.type}
                  id={1}
                />
              ))}
            </div>

            <motion.button
              disabled={open}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className={
                btnState ? "options-btn-active options-btn" : "options-btn"
              }
              type="submit">
              {btnState ? (
                <div className="lds-ring">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              ) : (
                <BiRightArrowAlt className="options-arrow-icon" />
              )}
            </motion.button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default connect(null, { fetchselProduct, fetchProducts })(Options);
