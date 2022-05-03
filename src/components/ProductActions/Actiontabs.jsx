/** @format */

import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";

import UserAvatar from "../LikedUsers/UserAvatar";
import { useDispatch, useSelector } from "react-redux";
import { fetchIndUser } from "../actions/User";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const ProductTabs = ({ likes, ratings, views, creator }) => {
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();
  const createdUser = useSelector((state) => state.User.foundUserDetails);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab
            iconPosition="start"
            clas
            icon={<PermIdentityIcon style={{ fontSize: "1.32rem" }} />}
            label="Posted By"
            {...a11yProps(0)}
          />
          <Tab
            iconPosition="start"
            icon={<FavoriteBorder style={{ fontSize: "1.28rem" }} />}
            label="Likes"
            {...a11yProps(0)}
          />
          <Tab
            iconPosition="start"
            icon={<StarBorderIcon style={{ fontSize: "1.4rem" }} />}
            label="Ratings"
            {...a11yProps(1)}
          />
          <Tab
            iconPosition="start"
            icon={<RemoveRedEyeIcon style={{ fontSize: "1.4rem" }} />}
            label="Views"
            {...a11yProps(2)}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div className="selproduct-likes">
          <UserAvatar
            avatar={createdUser.profileUrl}
            name={createdUser.username}
            key={createdUser._id}
            userId={createdUser._id}
          />
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className="selproduct-likes">
          {likes?.map(
            ({ userId }) =>
              userId && (
                <UserAvatar
                  avatar={userId.profileUrl}
                  name={userId.username}
                  key={userId._id}
                  value=""
                  userId={createdUser._id}
                />
              )
          )}
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div className="selproduct-likes">
          {ratings?.map(
            ({ user, value }) =>
              user && (
                <UserAvatar
                  avatar={user.profileUrl}
                  name={user.username}
                  key={user._id}
                  value={value}
                  userId={createdUser._id}
                />
              )
          )}
        </div>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <div className="selproduct-likes">
          <p className="selporudct-views_count">Total Views : {views}</p>
        </div>
      </TabPanel>
    </Box>
  );
};
