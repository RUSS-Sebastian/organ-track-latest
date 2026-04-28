import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./EditProfile.css";
import axios from "../api/axios";

const MASKED_PASSWORD = "••••••••";

const EditProfile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState("");

  const [userData, setUserData] = useState({
    name: "Melissa Peters",
    email: "melpeters@gmail.com",
    gender: "Male",
  });

  const [passwordError, setPasswordError] = useState("");
  const [tempPassword, setTempPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [tempData, setTempData] = useState({ ...userData });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔐 Confirm modal states - now for re-entering NEW password
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [reenterPassword, setReenterPassword] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file); // save real file for backend

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // show preview
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      setIsLoading(true); // show spinner while loading
      setError(null);

      try {
        // Get token from localStorage (replace with your actual storage method)
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("User not authenticated");
        }

        // Call backend with Authorization header
        const response = await axios.get("/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const user = response.data;
        // Update frontend state with backend data
        setUserData({
          name: user.name || "",
          email: user.email || "",
          gender: user.gender || "",
        });

        setProfileImage(user.image);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load profile.",
        );
      } finally {
        setIsLoading(false); // hide spinner
      }
    };

    fetchUserProfile();
  }, []);

  const handleEdit = () => {
    setTempData({ ...userData });
    setTempPassword(MASKED_PASSWORD);
    setIsPasswordChanged(false);
    setIsEditing(true);
    setError(null);
    setPasswordError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "password") {
      setTempPassword(value);
      setIsPasswordChanged(true);
    } else {
      setTempData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validatePassword = (password) => {
    if (!password) return ""; // empty password is allowed (nullable)
    if (password.length < 8) return "Password must be at least 8 characters";
    if (!/[A-Z]/.test(password))
      return "Password must contain an uppercase letter";
    if (!/[a-z]/.test(password))
      return "Password must contain a lowercase letter";
    if (!/[0-9]/.test(password)) return "Password must contain a number";
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
      return "Password must contain a special character";
    return ""; // no error
  };

  const hasTextChanges = () => {
    return (
      tempData.name !== userData.name || tempData.gender !== userData.gender
    );
  };

  const hasPasswordChange = () => {
    return (
      isPasswordChanged &&
      tempPassword !== MASKED_PASSWORD &&
      tempPassword.trim() !== ""
    );
  };

  const handleSaveClick = async () => {
    const textChanged = hasTextChanges();
    const passwordChanged = hasPasswordChange();
    const imageChanged = !!selectedFile;

    if (!textChanged && !passwordChanged && !imageChanged) {
      alert("No changes to save");
      return;
    }

    // 🔹 Password validation before confirm modal
    if (passwordChanged) {
      const pwError = validatePassword(tempPassword);
      if (pwError) {
        setPasswordError(pwError); // show inline error below password input
        return; // stop here, don't open confirm modal
      }
    }

    // 🔹 If password valid or not changed, proceed
    if (passwordChanged) {
      setShowConfirmModal(true); // only now show confirmation modal
    } else {
      // normal save for text fields / image
      await performSave({ textChanged, passwordChanged, imageChanged });
    }
  };

  const performSave = async ({
    textChanged,
    passwordChanged,
    imageChanged,
  }) => {
    try {
      setIsLoading(true);
      setError(null);

      const token = localStorage.getItem("token");

      // 1️⃣ Upload image
      /*if (imageChanged) {
        const formData = new FormData();
        formData.append("image", selectedFile);
        await axios.post("/profile/image", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }*/

      if (imageChanged) {
        console.log("image route called");
        const formData = new FormData();
        formData.append("image", selectedFile);

        console.log("=== FormData entries ===");
        for (let [key, value] of formData.entries()) {
          console.log(key, value); // should log "image" and the File object
        }

        const response = await axios.post("/profile/image", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("=== Backend response ===", response.data);
      }

      // 2️⃣ Update profile
      if (textChanged || passwordChanged) {
        console.log("text change called");
        await axios.put(
          "/profile",
          {
            name: tempData.name,
            gender: tempData.gender,
            ...(passwordChanged && {
              password: tempPassword,
              password_confirmation: tempPassword,
            }),
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
      }

      alert("Profile updated successfully");
      window.location.reload();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Update failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmPassword = () => {
    if (!reenterPassword) {
      setConfirmError("Please re-enter your new password");
      return;
    }

    if (reenterPassword !== tempPassword) {
      setConfirmError("Passwords do not match");
      return;
    }

    setShowConfirmModal(false);

    const textChanged = hasTextChanges();
    const passwordChanged = hasPasswordChange();
    const imageChanged = !!selectedFile;

    performSave({ textChanged, passwordChanged, imageChanged });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempPassword(MASKED_PASSWORD);
    setIsPasswordChanged(false);
    setPendingChanges(null);
    setPasswordError("");
  };

  return (
  <div className="min-h-screen w-full flex justify-center bg-white">
    {/* Loading overlay */}
    {isLoading && (
      <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
        <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium">Processing...</p>
        </div>
      </div>
    )}

    {/* Main content – full width, responsive padding */}
    <div className="w-full px-4 sm:px-6 lg:px-8 pt-6 pb-10 max-w-2xl mx-auto">
      {/* Header with back button */}
      <div className="relative flex items-center justify-center h-14 sm:h-16 mb-6">
        <button
          onClick={() => navigate("/settings")}
          className="absolute left-0 text-2xl sm:text-3xl font-semibold text-black w-8 h-8 flex items-center justify-center active:scale-95"
        >
          ←
        </button>
        <h1 className="text-xl sm:text-2xl font-bold text-black">
          Edit Profile
        </h1>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-gray-500">Loading profile...</p>
          </div>
        </div>
      ) : (
        <div className="profile-content space-y-6">
          {/* Profile Picture Section – now with FontAwesome icons */}
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full bg-gray-200 overflow-hidden">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  {/* FontAwesome user icon – fills the entire circle */}
                  <i className="fa-solid fa-user text-[6rem] sm:text-[8rem] lg:text-[10rem]"></i>
                </div>
              )}
              {isEditing && (
                <label className="absolute inset-0 bg-black/30 flex items-center justify-center cursor-pointer hover:bg-black/40 transition">
                  {/* FontAwesome camera icon */}
                  <i className="fa-solid fa-camera text-white text-3xl sm:text-4xl"></i>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            {isEditing && (
              <p className="mt-2 text-sm text-green-600 font-medium">
                Tap to change photo
              </p>
            )}
          </div>

          {/* Profile Info Form – unchanged */}
          <div className="w-full space-y-5">
            {/* Name */}
            <div>
              <div className="text-sm sm:text-base font-semibold text-black mb-1.5">Name</div>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={tempData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full h-11 sm:h-12 px-4 rounded-lg border border-gray-300 bg-gray-50 text-sm sm:text-base outline-none focus:bg-white focus:border-green-500 transition"
                />
              ) : (
                <div className="w-full h-11 sm:h-12 px-4 flex items-center rounded-lg border border-gray-200 bg-gray-50 text-sm sm:text-base text-gray-700">
                  {userData.name}
                </div>
              )}
            </div>

            {/* Email (only when not editing) */}
            {!isEditing && (
              <div>
                <div className="text-sm sm:text-base font-semibold text-black mb-1.5">Email</div>
                <div className="w-full h-11 sm:h-12 px-4 flex items-center rounded-lg border border-gray-200 bg-gray-50 text-sm sm:text-base text-gray-700">
                  {userData.email}
                </div>
              </div>
            )}

            {/* Password (only when editing) */}
            {isEditing && (
              <div>
                <div className="text-sm sm:text-base font-semibold text-black mb-1.5">Password</div>
                <div className="relative w-full">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={tempPassword}
                    onChange={handleChange}
                    placeholder="Enter new password"
                    className="w-full h-11 sm:h-12 px-4 pr-10 rounded-lg border border-gray-300 bg-gray-50 text-sm sm:text-base outline-none focus:bg-white focus:border-green-500 transition"
                  />
                  <span
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <i className="fa-solid fa-eye-slash"></i>
                    ) : (
                      <i className="fa-solid fa-eye"></i>
                    )}
                  </span>
                </div>
                {passwordError && (
                  <p className="text-red-500 text-xs mt-1">{passwordError}</p>
                )}
              </div>
            )}

            {/* Gender */}
            <div>
              <div className="text-sm sm:text-base font-semibold text-black mb-1.5">Gender</div>
              {isEditing ? (
                <select
                  name="gender"
                  value={tempData.gender}
                  onChange={handleChange}
                  className="w-full h-11 sm:h-12 px-4 rounded-lg border border-gray-300 bg-gray-50 text-sm sm:text-base outline-none focus:bg-white focus:border-green-500 transition"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              ) : (
                <div className="w-full h-11 sm:h-12 px-4 flex items-center rounded-lg border border-gray-200 bg-gray-50 text-sm sm:text-base text-gray-700 capitalize">
                  {userData.gender}
                </div>
              )}
            </div>
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          {/* Action Buttons – unchanged */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6">
            {isEditing ? (
              <>
                <button
                  onClick={handleSaveClick}
                  disabled={isLoading}
                  className="flex-1 h-12 bg-green-500 text-white rounded-lg font-semibold text-sm sm:text-base hover:bg-green-600 disabled:opacity-50 transition"
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={isLoading}
                  className="flex-1 h-12 border border-gray-300 rounded-lg text-sm sm:text-base font-medium hover:bg-gray-100 disabled:opacity-50 transition"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={handleEdit}
                className="w-full h-12 bg-[#14AE5C] text-white rounded-lg font-semibold text-sm sm:text-base hover:bg-green-700 transition"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      )}

      {/* Password Confirmation Modal – unchanged */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="w-full max-w-md bg-white rounded-xl p-5 sm:p-6 shadow-lg">
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Confirm Password</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4">
              Please re-enter your password to confirm
            </p>

            <div className="space-y-3">
              <div className="relative w-full">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={reenterPassword}
                  onChange={(e) => {
                    setReenterPassword(e.target.value);
                    setConfirmError("");
                  }}
                  className={`w-full h-11 sm:h-12 px-4 pr-10 rounded-lg border bg-gray-50 text-sm sm:text-base outline-none focus:bg-white focus:border-green-500 transition ${
                    confirmError ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Re-enter your password"
                />
                <span
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <i className="fa-solid fa-eye-slash"></i>
                  ) : (
                    <i className="fa-solid fa-eye"></i>
                  )}
                </span>
              </div>
              {confirmError && (
                <p className="text-red-500 text-xs flex items-center gap-1">
                  <span>⚠️</span> {confirmError}
                </p>
              )}
            </div>

            <div className="flex gap-3 mt-5">
              <button
                onClick={() => {
                  setShowConfirmModal(false);
                  setReenterPassword("");
                  setConfirmError("");
                }}
                className="flex-1 h-11 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPassword}
                disabled={isLoading}
                className="flex-1 h-11 bg-green-500 text-white rounded-lg text-sm font-semibold hover:bg-green-600 disabled:opacity-50 transition"
              >
                {isLoading ? "Saving..." : "Confirm & Save"}
              </button>
            </div>

            <p className="text-xs text-gray-400 mt-4 text-center">
              Re-enter the password you just typed above
            </p>
          </div>
        </div>
      )}
    </div>
  </div>
);
};

export default EditProfile;
