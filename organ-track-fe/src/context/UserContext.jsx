import { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axios";
import ClipLoader from "react-spinners/ClipLoader";
// create context
const UserContext = createContext();

// provider wrapper
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // store real user data
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get("/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  // ✅ display cool spinner while loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#14AE5C" size={60} />
      </div>
    );
  }

  return (
    <UserContext.Provider value={{ user, setToken }}>
      {children}
    </UserContext.Provider>
  );
};

// custom hook
export const useUser = () => useContext(UserContext);
