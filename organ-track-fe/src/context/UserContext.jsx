import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "../api/axios";
import ClipLoader from "react-spinners/ClipLoader";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [refreshKey, setRefreshKey] = useState(0); // ← new counter

  // Re-fetch whenever token or refreshKey changes
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
  }, [token, refreshKey]); // ← refreshKey added here

  // Function to manually force a re‑fetch of user data
  const refreshUser = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#14AE5C" size={60} />
      </div>
    );
  }

  return (
    <UserContext.Provider value={{ user, setToken, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
