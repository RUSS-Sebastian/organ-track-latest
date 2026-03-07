import { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axios";
import ClipLoader from "react-spinners/ClipLoader";
// create context
const UserContext = createContext();

// provider wrapper
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // store real user data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token"); // assuming you store token here
        if (!token) throw new Error("No token found");

        const response = await axios.get("/me", {
          headers: {
            Authorization: `Bearer ${token}`, // send token in header
          },
        });

        setUser(response.data); // store name, gender, email, id
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // ✅ display cool spinner while loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#14AE5C" size={60} />
      </div>
    );
  }

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

// custom hook
export const useUser = () => useContext(UserContext);
