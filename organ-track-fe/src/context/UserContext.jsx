import { createContext, useContext } from "react";

// create context
const UserContext = createContext();

// provider wrapper
export const UserProvider = ({ children }) => {
  // simulate logged-in user
  const user = {
    name: "Russ",
    gender: "female", // change to female to test
  };

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

// custom hook
export const useUser = () => useContext(UserContext);
