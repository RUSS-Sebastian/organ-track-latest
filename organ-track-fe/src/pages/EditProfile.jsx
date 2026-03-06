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
    <div className="min-h-[874px] w-full flex justify-center bg-white">
      {/* ⚡ Loading overlay at the very top */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner">Processing...</div>
        </div>
      )}
      {/* Mobile container */}
      <div className="w-full max-w-[402px] px-4 pt-6 pb-10">
        <div className="relative flex items-center justify-center h-[56px]">
          {/* Back Button (left aligned) */}
          <button
            onClick={() => navigate("/settings")}
            className="
              absolute left-0
              text-[22px]
              font-semibold
              text-black
              w-[32px]
              h-[32px]
              flex items-center justify-center
              active:scale-95
            "
          >
            ←
          </button>

          {/* Centered Title */}
          <h1 className="text-[20px] font-bold font-['Roboto'] text-black">
            Edit Profile
          </h1>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="spinner">Loading profile...</div>
          </div>
        ) : (
          <div className="profile-content">
            {/* Profile Picture Section */}
            <div className="profile-picture-section">
              <div className="profile-image-wrapper">
                <div className="profile-image-container">
                  {profileImage && (
                    <img src={profileImage} className="profile-image" />
                  )}
                  {isEditing && (
                    <div className="image-overlay">
                      <span className="camera-icon">📷</span>
                    </div>
                  )}
                </div>
                {isEditing && (
                  <>
                    <input
                      type="file"
                      id="profile-image-input"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="profile-image-input"
                    />
                    <label
                      htmlFor="profile-image-input"
                      className="change-photo-link"
                    >
                      Change Photo
                    </label>
                  </>
                )}
              </div>
            </div>

            {/* Profile Info Table */}
            {/* Profile Info Section */}
            <div className="w-full mt-6 px-1">
              {/* Name */}
              <div className="mb-5">
                <div className="text-[14px] font-semibold text-black mb-2">
                  Name
                </div>

                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={tempData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full h-[44px] px-4 rounded-[8px] border border-gray-300 bg-gray-100 text-[14px] outline-none focus:bg-white focus:border-gray-400 transition"
                  />
                ) : (
                  <div className="w-full h-[44px] px-4 flex items-center rounded-[8px] border border-gray-200 bg-gray-100 text-[14px] text-gray-700">
                    {userData.name}
                  </div>
                )}
              </div>

              {/* Email */}
              {!isEditing && (
                <div className="mb-5">
                  <div className="text-[14px] font-semibold text-black mb-2">
                    Email
                  </div>
                  <div className="w-full h-[44px] px-4 flex items-center rounded-[8px] border border-gray-200 bg-gray-100 text-[14px] text-gray-700">
                    {userData.email}
                  </div>
                </div>
              )}

              {/* Password */}
              {isEditing && (
                <div className="mb-5">
                  <div className="text-[14px] font-semibold text-black mb-2">
                    Password
                  </div>

                  <div className="relative w-full">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={tempPassword}
                      onChange={handleChange}
                      placeholder="Enter new password"
                      className="w-full h-[44px] px-4 pr-10 rounded-[8px] border border-gray-300 bg-gray-100 text-[14px] outline-none focus:bg-white focus:border-gray-400 transition"
                    />

                    <span
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
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
                    <div className="text-red-500 text-[12px] mt-1">
                      {passwordError}
                    </div>
                  )}
                </div>
              )}

              {/* Gender */}
              <div className="mb-6">
                <div className="text-[14px] font-semibold text-black mb-2">
                  Gender
                </div>

                {isEditing ? (
                  <select
                    name="gender"
                    value={tempData.gender}
                    onChange={handleChange}
                    className="w-full h-[44px] px-4 rounded-[8px] border border-gray-300 bg-gray-100 text-[14px] outline-none focus:bg-white focus:border-gray-400 transition"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                ) : (
                  <div className="w-full h-[44px] px-4 flex items-center rounded-[8px] border border-gray-200 bg-gray-100 text-[14px] text-gray-700">
                    {userData.gender}
                  </div>
                )}
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="action-buttons">
              {isEditing ? (
                <>
                  <button
                    className="save-btn"
                    onClick={handleSaveClick}
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    className="cancel-btn"
                    onClick={handleCancel}
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button className="edit-profile-btn" onClick={handleEdit}>
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 🔐 PASSWORD CONFIRMATION MODAL - Re-enter new password */}
      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Password</h3>
            <p className="modal-subtitle">
              Please re-enter your password to confirm
            </p>

            <div className="modal-input-wrapper">
              <div className="relative w-full">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={reenterPassword}
                  onChange={(e) => {
                    setReenterPassword(e.target.value);
                    setConfirmError("");
                  }}
                  className={`w-full h-[44px] px-4 pr-10 rounded-[8px] border border-gray-300 bg-gray-100 text-[14px] outline-none focus:bg-white focus:border-gray-400 transition ${confirmError ? "border-red-500" : ""}`}
                  placeholder="Re-enter your password"
                />

                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
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
                <div className="modal-error">
                  <span className="error-icon">⚠️</span>
                  {confirmError}
                </div>
              )}
            </div>

            <div className="modal-buttons">
              <button
                className="modal-cancel-btn"
                onClick={() => {
                  setShowConfirmModal(false);
                  setReenterPassword("");
                  setConfirmError("");
                }}
              >
                Cancel
              </button>
              <button
                className="modal-confirm-btn"
                onClick={handleConfirmPassword}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Confirm & Save"}
              </button>
            </div>

            <div className="modal-footer mt-4">
              <p>Re-enter the password you just typed above</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
