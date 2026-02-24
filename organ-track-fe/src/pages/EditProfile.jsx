import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EditProfile.css";

const MOCK_USER_ID = "user_123456";
const MASKED_PASSWORD = "••••••••";

const EditProfile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(
    "https://via.placeholder.com/150",
  );

  const [userData, setUserData] = useState({
    name: "Melissa Peters",
    email: "melpeters@gmail.com",
    dateOfBirth: "1995-05-23",
    gender: "Male",
  });

  // 🔐 STORED PASSWORD (simulates backend password)
  const [storedPassword, setStoredPassword] = useState("mypassword");
  const [tempPassword, setTempPassword] = useState("");

  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [tempData, setTempData] = useState({ ...userData });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔐 Confirm modal states - now for re-entering NEW password
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [reenterPassword, setReenterPassword] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [pendingChanges, setPendingChanges] = useState(null);

  const handleEdit = () => {
    setTempData({ ...userData });
    setTempPassword(MASKED_PASSWORD);
    setIsPasswordChanged(false);
    setIsEditing(true);
    setError(null);
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 📋 Prepare JSON data for backend
  const prepareBackendJSON = () => {
    const backendJSON = {
      userId: MOCK_USER_ID,
      profileData: {
        name: tempData.name,
        email: tempData.email,
        dateOfBirth: tempData.dateOfBirth,
        gender: tempData.gender,
        profileImage: profileImage,
        updatedAt: new Date().toISOString(),
      },
    };

    // Only include password if it was changed
    if (
      isPasswordChanged &&
      tempPassword !== MASKED_PASSWORD &&
      tempPassword.trim() !== ""
    ) {
      backendJSON.profileData.password = tempPassword;
    }

    return backendJSON;
  };

  // Verify that re-entered password matches the new password
  const verifyPasswordMatch = () => {
    return reenterPassword === tempPassword;
  };

  // Mock API call to update profile
  const updateProfileInBackend = async (profileJSON) => {
    setIsLoading(true);
    setError(null);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock successful response
    const response = {
      success: true,
      data: {
        user: {
          id: profileJSON.userId,
          ...profileJSON.profileData,
          updatedAt: new Date().toISOString(),
        },
      },
      message: "Profile updated successfully",
      timestamp: new Date().toISOString(),
    };

    setIsLoading(false);
    return response;
  };

  const handleSaveClick = () => {
    // Validate required fields
    if (!tempData.name || !tempData.email) {
      setError("Name and email are required");
      return;
    }

    // Check if password was changed
    if (
      isPasswordChanged &&
      tempPassword !== MASKED_PASSWORD &&
      tempPassword.trim() !== ""
    ) {
      // Validate new password length
      if (tempPassword.length < 6) {
        setError("New password must be at least 6 characters long");
        return;
      }

      // Show confirmation modal to re-enter new password
      const changes = prepareBackendJSON();
      setPendingChanges(changes);
      setShowConfirmModal(true);
      setReenterPassword("");
      setConfirmError("");
    } else {
      // No password change, proceed directly to save
      const changes = prepareBackendJSON();
      proceedWithSave(changes); // Pass changes directly
    }
  };

  const handleConfirmPassword = () => {
    if (!reenterPassword) {
      setConfirmError("Please re-enter your new password");
      return;
    }

    const isMatch = verifyPasswordMatch();

    if (!isMatch) {
      setConfirmError("Passwords do not match. Please try again.");
      return;
    }

    // Close modal and proceed with save
    setShowConfirmModal(false);

    // Use pendingChanges that was set when opening modal
    if (pendingChanges) {
      proceedWithSave(pendingChanges);
    } else {
      setError("No changes to save");
    }
  };

  const proceedWithSave = async (changes) => {
    // Make sure changes exist
    if (!changes) {
      setError("No changes to save");
      return;
    }

    try {
      const response = await updateProfileInBackend(changes);

      if (response.success) {
        // Update local state with new data
        setUserData({
          name: response.data.user.name,
          email: response.data.user.email,
          dateOfBirth: response.data.user.dateOfBirth,
          gender: response.data.user.gender,
        });

        // Update stored password if it was changed
        if (changes.profileData.password) {
          setStoredPassword(changes.profileData.password);
        }

        setIsEditing(false);
        setTempPassword(MASKED_PASSWORD);
        setIsPasswordChanged(false);
        setPendingChanges(null);

        // Show success message
        alert(response.message);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempPassword(MASKED_PASSWORD);
    setIsPasswordChanged(false);
    setPendingChanges(null);
  };

  const formatDisplayDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-GB");
  };

  return (
    <div className="min-h-[874px] w-full flex justify-center bg-white">
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

        <div className="profile-content">
          {/* Profile Picture Section */}
          <div className="profile-picture-section">
            <div className="profile-image-wrapper">
              <div className="profile-image-container">
                <img src={profileImage} className="profile-image" />
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
            <div className="mb-5">
              <div className="text-[14px] font-semibold text-black mb-2">
                Email
              </div>

              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={tempData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full h-[44px] px-4 rounded-[8px] border border-gray-300 bg-gray-100 text-[14px] outline-none focus:bg-white focus:border-gray-400 transition"
                />
              ) : (
                <div className="w-full h-[44px] px-4 flex items-center rounded-[8px] border border-gray-200 bg-gray-100 text-[14px] text-gray-700">
                  {userData.email}
                </div>
              )}
            </div>

            {/* Password */}
            <div className="mb-5">
              <div className="text-[14px] font-semibold text-black mb-2">
                Password
              </div>

              {isEditing ? (
                <input
                  type="password"
                  name="password"
                  value={tempPassword}
                  onChange={handleChange}
                  placeholder="Enter new password"
                  className="w-full h-[44px] px-4 rounded-[8px] border border-gray-300 bg-gray-100 text-[14px] outline-none focus:bg-white focus:border-gray-400 transition"
                />
              ) : (
                <div className="w-full h-[44px] px-4 flex items-center rounded-[8px] border border-gray-200 bg-gray-100 text-[14px] text-gray-700">
                  {MASKED_PASSWORD}
                </div>
              )}
            </div>

            {/* Date of Birth */}
            <div className="mb-5">
              <div className="text-[14px] font-semibold text-black mb-2">
                Date of Birth
              </div>

              {isEditing ? (
                <input
                  type="date"
                  name="dateOfBirth"
                  value={tempData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full h-[44px] px-4 rounded-[8px] border border-gray-300 bg-gray-100 text-[14px] outline-none focus:bg-white focus:border-gray-400 transition"
                />
              ) : (
                <div className="w-full h-[44px] px-4 flex items-center rounded-[8px] border border-gray-200 bg-gray-100 text-[14px] text-gray-700">
                  {formatDisplayDate(userData.dateOfBirth)}
                </div>
              )}
            </div>

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
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
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
              <input
                type="password"
                value={reenterPassword}
                onChange={(e) => {
                  setReenterPassword(e.target.value);
                  setConfirmError("");
                }}
                className={`modal-input ${confirmError ? "error" : ""}`}
                placeholder="Re-enter your password"
                autoFocus
              />
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
                  setPendingChanges(null);
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
