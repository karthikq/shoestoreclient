/** @format */

import React, { useEffect, useState } from "react";
import { BiRightArrowAlt } from "react-icons/bi";
import toast from "react-hot-toast";
import { connect, useDispatch, useSelector } from "react-redux";
import "./createp.styles.scss";

import Select from "react-select";
import makeAnimated from "react-select/animated";

import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import ImageSlider from "../../components/ImageSlider";

import UploadImg from "../../components/uploads/UploadImg";
import {
  createProduct,
  editProduct,
  singleProduct,
} from "../../components/actions";
import BackdropLoader from "../../components/loader/Backdrop";
import WordConvertor from "../../components/currency/toWords";
import allproducts from "../../ProdCat.json";
import { Skeleton } from "@mui/material";
import FormLoader from "../../components/loader/FormLoader";
import { Gmaps } from "../../components/Location/Gmaps";
import GetPrice from "../../components/GetPrice";

const animatedComponents = makeAnimated();

const Createproduct = ({ createProduct, editState, editProduct }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.Products[0]);
  const userDetails = useSelector((state) => state.User.userDetails);

  const [backdropState, setBackdropState] = useState(false);
  const [sklState, setSklState] = useState(true);

  const [errors, setErrors] = useState({
    type: "",
    text: "",
  });
  const [uploadedImg, setUploadedImg] = useState("");
  const [uploadedImgState, setUploadedImgState] = useState(false);
  const [priceInwords, setPriceinWords] = useState("");

  const [uploads, setUploads] = useState([]);

  const [urlarray, setUrlarray] = useState("");

  const [userData, setUserData] = useState({
    p_name: "",
    p_img: [],
    p_desp: "",
    p_price: "",
    p_category: "",
    p_type: "",
    p_brand: "",
  });
  const { id } = useParams();

  useEffect(() => {
    setTimeout(() => {
      setSklState(false);
    }, 600);
    if (!id) {
      return;
    }

    fetchproduct();
  }, [id, editState]);

  const fetchproduct = async () => {
    if (editState && id) {
      await dispatch(singleProduct(id));
    }
  };
  useEffect(() => {
    if (editState) {
      setBackdropState(true);
      setTimeout(() => {
        if (productDetails && userDetails._id === productDetails.userId) {
          setBackdropState(false);
          setUserData({
            p_name: productDetails.p_name,
            p_img: productDetails.p_img,
            p_desp: productDetails.p_desp,
            p_price: productDetails.price,
            p_category: productDetails.keywords,
            p_brand: productDetails.p_brand,
            p_type: productDetails.p_type,
          });
          setUploadedImg(productDetails.p_img);
          setPriceinWords(WordConvertor(productDetails.price));
        }
      }, 500);
    }
  }, [productDetails, userDetails, editState]);
  const handleUploadedImg = (e) => {
    setUploadedImg("");

    const file = e.target.files;

    if (file.length > 3) {
      return toast.error("You can select only Three images");
    } else {
      setBackdropState(true);
      for (let index = 0; index < file.length; index++) {
        const url = URL.createObjectURL(file[index]);
        setUploadedImg((preValue) => [...preValue, url]);
      }
      setUploads((preValue) => [...file]);
      setTimeout(() => {
        setBackdropState(false);
      }, 200);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // setUploadedImgState(true);
    // const sliderdiv = document.querySelector(".animate-bar");

    if (!uploadedImg) {
      return toast.error("Imagefile is required");
    }

    if (!userData.p_type) {
      toast.error("Product type is required");
      return setErrors({
        type: "type",
        text: "Product type is required",
      });
    }
    if (userData.p_category.length === 0) {
      toast.error("Please select a category");
      return setErrors({
        type: "category",
        text: "Please select a category",
      });
    }
    if (userData.p_category.length > 3) {
      toast.error("You cann't select more than 3 categories");
      return setErrors({
        type: "category",
        text: "You can't select more than 3 categories",
      });
    }
    if (userData.p_price <= 0) {
      toast.error("Price cannot be less than zero");
      return setErrors({
        type: "price",
        text: "Price cannot be less than zero",
      });
    }

    if (editState) {
      const result = productDetails.p_img.map(
        (item) => uploadedImg.includes(item) && true
      );

      if (result[0] !== true) {
        toast.loading("Uploading image's");
        setUploadedImgState(true);
      } else {
        setUploadedImgState(false);
        editProduct(productDetails, userData, uploadedImg, navigate);
      }
    } else {
      toast.loading("Uploading image's");
      setUploadedImgState(true);
    }

    // sliderdiv.style.left = `${0}%`;

    // const innerDiv = `<div class="innerdiv-loader">
    // <p>Uploading all Images please wait...</p>
    // <span class="percentage-up"></span>
    // <div class="loader">Loading...</div>
    // </div>`;
    // sliderdiv.innerHTML = innerDiv;

    // const perValue = document.querySelector(".percentage-up");

    // setTimeout(() => {
    //   sliderdiv.style.left = `${-100}%`;
    // }, 5000);
  };

  useEffect(() => {
    if (uploadedImgState) {
      toast.dismiss();
      if (urlarray.length > 0 && urlarray.length === uploads.length) {
        // setUserData({ ...userData, p_img: urlarray });
        toast.success("Images uploaded");
        if (editState && productDetails) {
          editProduct(productDetails, userData, urlarray, navigate);
        } else {
          createProduct(userData, urlarray, navigate);
        }
      }
    }
  }, [urlarray]);

  // function loop() {
  //   // return uploads.forEach((item) => {
  //   //   return <UploadImg file={item} />;
  //   // });
  //   for (let index = 0; index < uploads.length; index++) {
  //     return <UploadImg file={uploads[index]} />;
  //   }
  // }

  const options = [
    { value: "Shoes", label: "Shoe", color: "#00B8D9" },
    { value: "Mobiles", label: "Mobile", color: "#0052CC" },
    { value: "Electronics", label: "Electronics", color: "#5243AA" },
    { value: "Watches", label: "Watches" },
    { value: "Games", label: "Games", color: "#FF8B00" },
  ];

  return (
    <motion.div className="create-p_container">
      <BackdropLoader open={backdropState} setOpen={setBackdropState} />

      <div className="create-p_contents">
        <h3>
          {uploadedImgState
            ? "Uploading please wait"
            : editState
            ? "Edit your product"
            : "Upload your product"}
        </h3>
        {sklState && <FormLoader />}
        {!sklState && (
          <React.Fragment>
            {uploadedImgState ? (
              <div style={{ marginTop: "2rem" }}>
                {uploads.map((item) => (
                  <>
                    <UploadImg
                      file={item}
                      setUrlarray={setUrlarray}
                      urlarray={urlarray}
                      uploadsLength={uploads.length}
                      setUploadedImgState={setUploadedImgState}
                    />
                  </>
                ))}
              </div>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{
                  duration: 0.5,
                  ease: "linear",
                  layout: { ease: "anticipate" },
                }}
                onSubmit={onSubmit}
                className="create-p_form">
                <motion.div className="create-p_form-contents">
                  <label htmlFor="upload_img" className="file-label">
                    Select Image files
                  </label>
                  {uploads.length !== 3 && (
                    <span className="create-p_span">
                      You can select upto 3 images
                    </span>
                  )}
                  <input
                    type="file"
                    multiple
                    accept=".jpeg, .png, .jpg"
                    id="upload_img"
                    className="upload_img"
                    onChange={handleUploadedImg}
                  />
                  {uploadedImg && (
                    <div
                      className={
                        uploadedImg
                          ? "create-p_uploaded-img create-p_uploaded-img-active"
                          : "create-p_uploaded-img"
                      }>
                      <ImageSlider
                        imagesArray={uploadedImg}
                        imgClass="uploaded-img"
                      />
                    </div>
                  )}
                  <label className="other-label">Product name</label>
                  <input
                    type="text"
                    required
                    minLength={5}
                    name="p_name"
                    maxLength={45}
                    value={userData.p_name}
                    onChange={(e) =>
                      setUserData({ ...userData, p_name: e.target.value })
                    }
                  />
                  <label className="other-label">
                    Product price
                    <span
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: "300",
                        opacity: 0.7,
                        marginLeft: "0.4rem",
                      }}>
                      <GetPrice userData={userDetails} />
                    </span>
                  </label>
                  <input
                    type="number"
                    required
                    name="p_price"
                    min={1}
                    max={10000}
                    value={userData.p_price}
                    onChange={(e) => {
                      setUserData({ ...userData, p_price: e.target.value });
                      setPriceinWords(WordConvertor(e.target.value));
                    }}
                  />
                  {errors.type === "price" && (
                    <span className="product-error_span">{errors.text}</span>
                  )}
                  <span className="product-price_words">{priceInwords}</span>
                  <label className="other-label">Product Brand</label>
                  <input
                    type="text"
                    required
                    name="p_brand"
                    minLength={2}
                    maxLength={25}
                    value={userData.p_brand}
                    onChange={(e) => {
                      setUserData({ ...userData, p_brand: e.target.value });
                    }}
                  />
                  {errors.type === "brand" && (
                    <span className="product-error_span">{errors.text}</span>
                  )}
                  <label className="other-label">Select Type</label>
                  <Select
                    className="select-input select-input_type"
                    closeMenuOnSelect={false}
                    value={options.filter(
                      (option) =>
                        userData?.p_type?.includes(option.value) && option.value
                    )}
                    components={animatedComponents}
                    isLoading={userData.p_type ? false : true}
                    isClearable
                    options={options}
                    onChange={(e) => {
                      setUserData({
                        ...userData,
                        p_type: e.value,
                        p_category: [],
                      });
                    }}
                  />
                  {errors.type === "type" && (
                    <span className="product-error_span">{errors.text}</span>
                  )}
                  <label className="other-label">
                    Choose a category{" "}
                    <span
                      style={{
                        fontWeight: "300",
                        fontSize: "0.9rem",
                        marginLeft: "0.5rem",
                        color: "rgb(95, 95, 95)",
                      }}>
                      max 3
                    </span>{" "}
                  </label>
                  <Select
                    className="select-input"
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    isLoading={userData?.p_category?.length > 0 ? false : true}
                    value={allproducts
                      .find((item) => {
                        if (!userData?.p_type) {
                          return [""];
                        } else {
                          return item.type === userData?.p_type;
                        }
                      })
                      .options.filter(
                        (option) =>
                          userData?.p_category?.includes(option.value) &&
                          option.value
                      )}
                    options={
                      allproducts.find((item) => {
                        if (!userData?.p_type) {
                          return [""];
                        } else {
                          return item.type === userData?.p_type;
                        }
                      }).options
                    }
                    onChange={(e) => {
                      setUserData({
                        ...userData,
                        p_category: e.map((item) => item.value.toLowerCase()),
                      });
                    }}
                  />
                  {errors.type === "category" && (
                    <span className="product-error_span">{errors.text}</span>
                  )}
                  <label className="other-label">
                    Product despscription (optional)
                    <span
                      className={
                        userData.p_desp?.length === 200
                          ? "desp_length desp_length-active"
                          : "desp_length"
                      }>
                      {userData.p_desp?.length}/200
                    </span>
                  </label>
                  <textarea
                    name="p_desp"
                    cols="30"
                    rows="5"
                    value={userData.p_desp}
                    maxLength={200}
                    onChange={(e) =>
                      setUserData({ ...userData, p_desp: e.target.value })
                    }></textarea>{" "}
                </motion.div>
                <button type="submit" className="create-p_btn">
                  <BiRightArrowAlt className="create-p_icon" />
                </button>
              </motion.form>
            )}
          </React.Fragment>
        )}
      </div>
    </motion.div>
  );
};

export default connect(null, { createProduct, editProduct })(Createproduct);
