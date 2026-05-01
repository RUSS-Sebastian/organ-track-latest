import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./EditProfile.css";
import axios from "../api/axios";
import { useUser } from "../context/UserContext";

const MASKED_PASSWORD = "••••••••";

// ---------- Translations ----------
const translations = {
  header: { en: "Edit Profile", mm: "ကိုယ်ရေးအချက်အလက် ပြင်ဆင်ရန်" },
  loadingProfile: {
    en: "Loading profile...",
    mm: "ကိုယ်ရေးအချက်အလက်များ ရယူနေပါသည်...",
  },
  name: { en: "Name", mm: "အမည်" },
  email: { en: "Email", mm: "အီးမေးလ်" },
  password: { en: "Password", mm: "စကားဝှက်" },
  gender: { en: "Gender", mm: "ကျား/မ" },
  male: { en: "Male", mm: "ကျား" },
  female: { en: "Female", mm: "မ" },
  saveChanges: { en: "Save Changes", mm: "ပြောင်းလဲမှုများကို သိမ်းဆည်းမည်" },
  cancel: { en: "Cancel", mm: "ပယ်ဖျက်ရန်" },
  editProfile: { en: "Edit Profile", mm: "ကိုယ်ရေးအချက်အလက် ပြင်ဆင်ရန်" },
  tapToChangePhoto: {
    en: "Tap to change photo",
    mm: "ဓာတ်ပုံပြောင်းရန် နှိပ်ပါ",
  },
  processing: { en: "Processing...", mm: "လုပ်ဆောင်နေပါသည်..." },
  noChanges: {
    en: "No changes to save",
    mm: "သိမ်းဆည်းရန် ပြောင်းလဲမှု မရှိပါ",
  },
  profileUpdateSuccess: {
    en: "Profile updated successfully",
    mm: "ကိုယ်ရေးအချက်အလက် အောင်မြင်စွာ ပြောင်းလဲပြီးပါပြီ",
  },
  updateFailed: { en: "Update failed", mm: "ပြောင်းလဲခြင်း မအောင်မြင်ပါ" },
  confirmPasswordTitle: { en: "Confirm Password", mm: "စကားဝှက် အတည်ပြုပါ" },
  confirmPasswordPrompt: {
    en: "Please re-enter your password to confirm",
    mm: "အတည်ပြုရန် စကားဝှက်ကို ပြန်လည်ရိုက်ထည့်ပါ",
  },
  reenterPasswordPlaceholder: {
    en: "Re-enter your password",
    mm: "စကားဝှက် ပြန်ရိုက်ထည့်ပါ",
  },
  confirmSave: { en: "Confirm & Save", mm: "အတည်ပြု၍ သိမ်းမည်" },
  reenterNote: {
    en: "Re-enter the password you just typed above",
    mm: "အထက်တွင် ရိုက်ထည့်ခဲ့သော စကားဝှက်ကို ပြန်လည်ရိုက်ထည့်ပါ",
  },
  passwordValidation: {
    atLeast8: {
      en: "Password must be at least 8 characters",
      mm: "စကားဝှက် အနည်းဆုံး ၈ လုံး ရှိရမည်",
    },
    uppercase: {
      en: "Password must contain an uppercase letter",
      mm: "စကားဝှက်တွင် အင်္ဂလိပ်စာလုံးကြီး တစ်လုံး ပါဝင်ရမည်",
    },
    lowercase: {
      en: "Password must contain a lowercase letter",
      mm: "စကားဝှက်တွင် အင်္ဂလိပ်စာလုံးသေး တစ်လုံး ပါဝင်ရမည်",
    },
    number: {
      en: "Password must contain a number",
      mm: "စကားဝှက်တွင် ဂဏန်းတစ်လုံး ပါဝင်ရမည်",
    },
    special: {
      en: "Password must contain a special character",
      mm: "စကားဝှက်တွင် အထူးအက္ခရာ တစ်လုံး ပါဝင်ရမည်",
    },
  },
  backButton: { en: "←", mm: "←" }, // same symbol
};

const EditProfile = () => {
  const navigate = useNavigate();
  const { user: currentUser } = useUser(); // get user for language preference
  const isBurmese = currentUser?.language_preference === "Bur";
  const t = (en, mm) => (isBurmese ? mm : en);

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

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [reenterPassword, setReenterPassword] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("User not authenticated");
        const response = await axios.get("/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const user = response.data;
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
        setIsLoading(false);
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
      setTempData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validatePassword = (password) => {
    if (!password) return "";
    if (password.length < 8)
      return t(
        translations.passwordValidation.atLeast8.en,
        translations.passwordValidation.atLeast8.mm,
      );
    if (!/[A-Z]/.test(password))
      return t(
        translations.passwordValidation.uppercase.en,
        translations.passwordValidation.uppercase.mm,
      );
    if (!/[a-z]/.test(password))
      return t(
        translations.passwordValidation.lowercase.en,
        translations.passwordValidation.lowercase.mm,
      );
    if (!/[0-9]/.test(password))
      return t(
        translations.passwordValidation.number.en,
        translations.passwordValidation.number.mm,
      );
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
      return t(
        translations.passwordValidation.special.en,
        translations.passwordValidation.special.mm,
      );
    return "";
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
      alert(t(translations.noChanges.en, translations.noChanges.mm));
      return;
    }

    if (passwordChanged) {
      const pwError = validatePassword(tempPassword);
      if (pwError) {
        setPasswordError(pwError);
        return;
      }
    }

    if (passwordChanged) {
      setShowConfirmModal(true);
    } else {
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

      if (imageChanged) {
        const formData = new FormData();
        formData.append("image", selectedFile);
        await axios.post("/profile/image", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      if (textChanged || passwordChanged) {
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
          { headers: { Authorization: `Bearer ${token}` } },
        );
      }

      alert(
        t(
          translations.profileUpdateSuccess.en,
          translations.profileUpdateSuccess.mm,
        ),
      );
      window.location.reload();
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error ||
          t(translations.updateFailed.en, translations.updateFailed.mm),
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmPassword = () => {
    if (!reenterPassword) {
      setConfirmError(
        t(
          translations.confirmPasswordPrompt.en,
          translations.confirmPasswordPrompt.mm,
        ),
      );
      return;
    }
    if (reenterPassword !== tempPassword) {
      setConfirmError(
        isBurmese ? "စကားဝှက်များ မတူညီပါ" : "Passwords do not match",
      );
      return;
    }
    setShowConfirmModal(false);
    performSave({
      textChanged: hasTextChanges(),
      passwordChanged: hasPasswordChange(),
      imageChanged: !!selectedFile,
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempPassword(MASKED_PASSWORD);
    setIsPasswordChanged(false);
    setPasswordError("");
  };

  return (
    <div className="min-h-screen w-full flex justify-center bg-white">
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-medium">
              {t(translations.processing.en, translations.processing.mm)}
            </p>
          </div>
        </div>
      )}

      <div className="w-full px-4 sm:px-6 lg:px-8 pt-6 pb-10 max-w-2xl mx-auto">
        {/* Header with back button */}
        <div className="relative flex items-center justify-center h-14 sm:h-16 mb-6">
          <button
            onClick={() => navigate("/settings")}
            className="absolute left-0 text-2xl sm:text-3xl font-semibold text-black w-8 h-8 flex items-center justify-center active:scale-95"
          >
            {t(translations.backButton.en, translations.backButton.mm)}
          </button>
          <h1
            className={`text-xl sm:text-2xl font-bold text-black ${isBurmese ? "leading-relaxed" : ""}`}
          >
            {t(translations.header.en, translations.header.mm)}
          </h1>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-gray-500">
                {t(
                  translations.loadingProfile.en,
                  translations.loadingProfile.mm,
                )}
              </p>
            </div>
          </div>
        ) : (
          <div className="profile-content space-y-6">
            {/* Profile Picture Section */}
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
                    <i className="fa-solid fa-user text-[6rem] sm:text-[8rem] lg:text-[10rem]"></i>
                  </div>
                )}
                {isEditing && (
                  <label className="absolute inset-0 bg-black/30 flex items-center justify-center cursor-pointer hover:bg-black/40 transition">
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
                  {t(
                    translations.tapToChangePhoto.en,
                    translations.tapToChangePhoto.mm,
                  )}
                </p>
              )}
            </div>

            {/* Profile Info Form */}
            <div className="w-full space-y-5">
              {/* Name */}
              <div>
                <div className="text-sm sm:text-base font-semibold text-black mb-1.5">
                  {t(translations.name.en, translations.name.mm)}
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={tempData.name}
                    onChange={handleChange}
                    placeholder={isBurmese ? "အမည်ထည့်ပါ" : "Enter your name"}
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
                  <div className="text-sm sm:text-base font-semibold text-black mb-1.5">
                    {t(translations.email.en, translations.email.mm)}
                  </div>
                  <div className="w-full h-11 sm:h-12 px-4 flex items-center rounded-lg border border-gray-200 bg-gray-50 text-sm sm:text-base text-gray-700">
                    {userData.email}
                  </div>
                </div>
              )}

              {/* Password (only when editing) */}
              {isEditing && (
                <div>
                  <div className="text-sm sm:text-base font-semibold text-black mb-1.5">
                    {t(translations.password.en, translations.password.mm)}
                  </div>
                  <div className="relative w-full">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={tempPassword}
                      onChange={handleChange}
                      placeholder={
                        isBurmese ? "စကားဝှက်အသစ်ထည့်ပါ" : "Enter new password"
                      }
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
                <div className="text-sm sm:text-base font-semibold text-black mb-1.5">
                  {t(translations.gender.en, translations.gender.mm)}
                </div>
                {isEditing ? (
                  <select
                    name="gender"
                    value={tempData.gender}
                    onChange={handleChange}
                    className="w-full h-11 sm:h-12 px-4 rounded-lg border border-gray-300 bg-gray-50 text-sm sm:text-base outline-none focus:bg-white focus:border-green-500 transition"
                  >
                    <option value="male">
                      {t(translations.male.en, translations.male.mm)}
                    </option>
                    <option value="female">
                      {t(translations.female.en, translations.female.mm)}
                    </option>
                  </select>
                ) : (
                  <div className="w-full h-11 sm:h-12 px-4 flex items-center rounded-lg border border-gray-200 bg-gray-50 text-sm sm:text-base text-gray-700 capitalize">
                    {userData.gender === "male"
                      ? t(translations.male.en, translations.male.mm)
                      : t(translations.female.en, translations.female.mm)}
                  </div>
                )}
              </div>
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSaveClick}
                    disabled={isLoading}
                    className="flex-1 h-12 bg-green-500 text-white rounded-lg font-semibold text-sm sm:text-base hover:bg-green-600 disabled:opacity-50 transition"
                  >
                    {isLoading
                      ? t(
                          translations.processing.en,
                          translations.processing.mm,
                        )
                      : t(
                          translations.saveChanges.en,
                          translations.saveChanges.mm,
                        )}
                  </button>
                  <button
                    onClick={handleCancel}
                    disabled={isLoading}
                    className="flex-1 h-12 border border-gray-300 rounded-lg text-sm sm:text-base font-medium hover:bg-gray-100 disabled:opacity-50 transition"
                  >
                    {t(translations.cancel.en, translations.cancel.mm)}
                  </button>
                </>
              ) : (
                <button
                  onClick={handleEdit}
                  className="w-full h-12 bg-[#14AE5C] text-white rounded-lg font-semibold text-sm sm:text-base hover:bg-green-700 transition"
                >
                  {t(translations.editProfile.en, translations.editProfile.mm)}
                </button>
              )}
            </div>
          </div>
        )}

        {/* Password Confirmation Modal */}
        {showConfirmModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="w-full max-w-md bg-white rounded-xl p-5 sm:p-6 shadow-lg">
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                {t(
                  translations.confirmPasswordTitle.en,
                  translations.confirmPasswordTitle.mm,
                )}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4">
                {t(
                  translations.confirmPasswordPrompt.en,
                  translations.confirmPasswordPrompt.mm,
                )}
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
                    placeholder={t(
                      translations.reenterPasswordPlaceholder.en,
                      translations.reenterPasswordPlaceholder.mm,
                    )}
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
                  {t(translations.cancel.en, translations.cancel.mm)}
                </button>
                <button
                  onClick={handleConfirmPassword}
                  disabled={isLoading}
                  className="flex-1 h-11 bg-green-500 text-white rounded-lg text-sm font-semibold hover:bg-green-600 disabled:opacity-50 transition"
                >
                  {isLoading
                    ? t(translations.processing.en, translations.processing.mm)
                    : t(
                        translations.confirmSave.en,
                        translations.confirmSave.mm,
                      )}
                </button>
              </div>

              <p className="text-xs text-gray-400 mt-4 text-center">
                {t(translations.reenterNote.en, translations.reenterNote.mm)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
