/** @format */

import React, { useState } from "react";

export const authObject = React.createContext();

const AuthContext = ({ children }) => {
  const [authState, setAuthState] = useState(false);

  return (
    <authObject.Provider
      value={{
        state: authState,
        setState: setAuthState,
      }}>
      {children}
    </authObject.Provider>
  );
};

export default AuthContext;
