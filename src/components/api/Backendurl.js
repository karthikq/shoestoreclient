/** @format */

export const backendUrl = () => {
  if (process.env.NODE_ENV === "production") {
    return "https://murmuring-reef-49332.herokuapp.com/v1";
  } else {
    return "http://localhost:5000/v1";
  }
};
