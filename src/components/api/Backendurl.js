/** @format */

export const backendUrl = () => {
  if (process.env.NODE_ENV === "production") {
    return "https://shoe-store-app.onrender.com/v1";
  } else {
    return "http://localhost:5000/v1";
  }
};
