import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ConfirmModal from "../components/ConfirmModal";
import api from "../api/axios";
import { useUser } from "../context/UserContext";

// ---------- Translations ----------
const translations = {
  settings: { en: "Settings", mm: "ဆက်တင်များ" },
  account: { en: "Account", mm: "အကောင့်" },
  supportAbout: { en: "Support & About", mm: "အကူအညီနှင့်အကြောင်း" },
  actions: { en: "Actions", mm: "လုပ်ဆောင်ချက်များ" },
  editProfile: { en: "Edit profile", mm: "ကိုယ်ရေးပြင်ဆင်ရန်" },
  security: { en: "Security", mm: "လုံခြုံရေး" },
  notifications: { en: "Notifications", mm: "အကြောင်းကြားချက်များ" },
  privacy: { en: "Privacy", mm: "ကိုယ်ရေးလုံခြုံမှု" },
  language: { en: "Language", mm: "ဘာသာစကား" },
  helpSupport: { en: "Help & Support", mm: "အကူအညီ" },
  termsPolicies: { en: "Terms and Policies", mm: "စည်းမျဉ်းများ" },
  reportProblem: { en: "Report a problem", mm: "ပြဿနာတစ်ခုသတင်းပို့ရန်" },
  addAccount: { en: "Add account", mm: "အကောင့်ထည့်ရန်" },
  logout: { en: "Log out", mm: "အကောင့်ထွက်ရန်" },
  confirmLogoutTitle: { en: "Confirm Logout", mm: "ထွက်ခွာရန်အတည်ပြုပါ" },
  confirmLogoutMessage: {
    en: "Are you sure you want to log out?",
    mm: "ထွက်ခွာလိုသည်မှာသေချာပါသလား။",
  },
  logoutSuccess: {
    en: "Logged out successfully",
    mm: "အောင်မြင်စွာထွက်ခွာပြီးပါပြီ",
  },
  logoutFailed: {
    en: "Logout failed. Please try again.",
    mm: "ထွက်ခွာ၍မရပါ။ ထပ်စမ်းကြည့်ပါ။",
  },
  selectLanguage: { en: "Select Language", mm: "ဘာသာစကားရွေးချယ်ပါ" },
  english: { en: "English", mm: "English" },
  burmese: { en: "Burmese", mm: "မြန်မာ" },
  cancel: { en: "Cancel", mm: "မလုပ်တော့" },
  save: { en: "Save", mm: "သိမ်းမည်" },
  languageSaveError: {
    en: "Failed to save language",
    mm: "ဘာသာစကားသိမ်းဆည်း၍မရပါ",
  },
};

const Settings = () => {
  const { user, refreshUser } = useUser(); // get refreshUser instead of setToken
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [savingLang, setSavingLang] = useState(false);

  // Language state
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("en");

  // Sync selectedLang with user's preference
  useEffect(() => {
    if (user?.language_preference) {
      setSelectedLang(user.language_preference === "Bur" ? "mm" : "en");
    }
  }, [user]);

  const isBurmese = user?.language_preference === "Bur";
  const t = (en, mm) => (isBurmese ? mm : en);

  // ---------- Navigation ----------
  const handleNavigation = (path) => {
    if (path === "logout") {
      setIsModalOpen(true);
    } else if (path === "edit-profile") {
      navigate("/EditProfile");
    } else if (path === "terms") {
      navigate("/Terms");
    } else if (path === "language") {
      setIsLangModalOpen(true);
    } else {
      console.log(`Navigating to: ${path}`);
    }
  };

  // ---------- Logout ----------
  const handleLogout = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await api.post(
        "/logout",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      localStorage.removeItem("token");
      localStorage.removeItem("pendingReportId");

      alert(t(translations.logoutSuccess.en, translations.logoutSuccess.mm));
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      let msg = t(translations.logoutFailed.en, translations.logoutFailed.mm);
      if (error.response) {
        msg = error.response.data?.message || msg;
      } else if (error.message) {
        msg = error.message;
      }
      alert(msg);
    } finally {
      setLoading(false);
      setIsModalOpen(false);
    }
  };

  // ---------- Save Language ----------
  const handleSaveLanguage = async () => {
    setSavingLang(true);
    try {
      const token = localStorage.getItem("token");
      await api.put(
        "/user/language",
        { language_preference: selectedLang === "mm" ? "Bur" : "Eng" },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      // Force UserContext to re‑fetch /me
      refreshUser();

      setIsLangModalOpen(false);
    } catch (error) {
      console.error("Language update failed:", error);
      alert(
        t(translations.languageSaveError.en, translations.languageSaveError.mm),
      );
    } finally {
      setSavingLang(false);
    }
  };

  // List items definition (icon, label key, route)
  const accountItems = [
    ["fa-user", "editProfile", "edit-profile"],
    ["fa-lock", "security", "security"],
    ["fa-bell", "notifications", "notifications"],
    ["fa-shield-halved", "privacy", "privacy"],
    ["fa-globe", "language", "language"],
  ];

  const supportItems = [
    ["fa-circle-question", "helpSupport", "help"],
    ["fa-file-lines", "termsPolicies", "terms"],
  ];

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1
          className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-green-800 ${isBurmese ? "leading-relaxed py-1" : ""}`}
        >
          {t(translations.settings.en, translations.settings.mm)}
        </h1>
      </div>

      <div className="flex flex-col gap-5 sm:gap-6">
        {/* Account */}
        <div className="bg-white rounded-2xl shadow-sm p-3 sm:p-4">
          <h2
            className={`px-3 pb-2 text-xs sm:text-sm font-semibold text-green-600 uppercase tracking-wide ${isBurmese ? "leading-relaxed" : ""}`}
          >
            {t(translations.account.en, translations.account.mm)}
          </h2>

          {accountItems.map(([icon, labelKey, route]) => (
            <div
              key={route}
              onClick={() => handleNavigation(route)}
              className="flex items-center justify-between px-3 py-3 sm:py-3.5 rounded-xl hover:bg-green-50 cursor-pointer transition-colors"
            >
              <span className="flex items-center gap-3 text-gray-700 font-medium text-sm sm:text-base">
                <i
                  className={`fa-solid ${icon} text-green-500 text-lg sm:text-xl`}
                ></i>
                {t(translations[labelKey].en, translations[labelKey].mm)}
              </span>
              <span className="text-green-400 text-lg sm:text-xl font-light">
                ›
              </span>
            </div>
          ))}
        </div>

        {/* Support & About */}
        <div className="bg-white rounded-2xl shadow-sm p-3 sm:p-4">
          <h2
            className={`px-3 pb-2 text-xs sm:text-sm font-semibold text-green-600 uppercase tracking-wide ${isBurmese ? "leading-relaxed" : ""}`}
          >
            {t(translations.supportAbout.en, translations.supportAbout.mm)}
          </h2>

          {supportItems.map(([icon, labelKey, route]) => (
            <div
              key={route}
              onClick={() => handleNavigation(route)}
              className="flex items-center justify-between px-3 py-3 sm:py-3.5 rounded-xl hover:bg-green-50 cursor-pointer transition-colors"
            >
              <span className="flex items-center gap-3 text-gray-700 font-medium text-sm sm:text-base">
                <i
                  className={`fa-solid ${icon} text-green-500 text-lg sm:text-xl`}
                ></i>
                {t(translations[labelKey].en, translations[labelKey].mm)}
              </span>
              <span className="text-green-400 text-lg sm:text-xl font-light">
                ›
              </span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="bg-white rounded-2xl shadow-sm p-3 sm:p-4">
          <h2
            className={`px-3 pb-2 text-xs sm:text-sm font-semibold text-green-600 uppercase tracking-wide ${isBurmese ? "leading-relaxed" : ""}`}
          >
            {t(translations.actions.en, translations.actions.mm)}
          </h2>

          {/* Report a problem */}
          <div
            onClick={() => handleNavigation("report")}
            className="flex items-center justify-between px-3 py-3 sm:py-3.5 rounded-xl hover:bg-green-50 cursor-pointer transition-colors"
          >
            <span className="flex items-center gap-3 text-gray-700 font-medium text-sm sm:text-base">
              <i className="fa-solid fa-bug text-green-500 text-lg sm:text-xl"></i>
              {t(translations.reportProblem.en, translations.reportProblem.mm)}
            </span>
            <span className="text-green-400 text-lg sm:text-xl font-light">
              ›
            </span>
          </div>

          {/* Add account */}
          <div
            onClick={() => handleNavigation("add-account")}
            className="flex items-center justify-between px-3 py-3 sm:py-3.5 rounded-xl hover:bg-green-50 cursor-pointer transition-colors"
          >
            <span className="flex items-center gap-3 text-gray-700 font-medium text-sm sm:text-base">
              <i className="fa-solid fa-user-plus text-green-500 text-lg sm:text-xl"></i>
              {t(translations.addAccount.en, translations.addAccount.mm)}
            </span>
            <span className="text-green-400 text-lg sm:text-xl font-light">
              ›
            </span>
          </div>

          {/* Log out */}
          <div
            onClick={() => handleNavigation("logout")}
            className="flex items-center justify-between px-3 py-3 sm:py-3.5 rounded-xl hover:bg-red-50 cursor-pointer transition-colors"
          >
            <span className="flex items-center gap-3 text-red-500 font-medium text-sm sm:text-base">
              <i className="fa-solid fa-right-from-bracket text-lg sm:text-xl"></i>
              {t(translations.logout.en, translations.logout.mm)}
            </span>
            <span className="text-red-400 text-lg sm:text-xl font-light">
              ›
            </span>
          </div>

          {/* Logout confirmation modal (translated) */}
          <ConfirmModal
            isOpen={isModalOpen}
            title={t(
              translations.confirmLogoutTitle.en,
              translations.confirmLogoutTitle.mm,
            )}
            message={t(
              translations.confirmLogoutMessage.en,
              translations.confirmLogoutMessage.mm,
            )}
            onCancel={() => setIsModalOpen(false)}
            onConfirm={handleLogout}
            loading={loading}
          />
        </div>
      </div>

      {/* Language Selection Popup */}
      {isLangModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xs sm:max-w-sm p-5 sm:p-6 mx-auto">
            {/* Title */}
            <h3
              className={`text-lg sm:text-xl font-bold text-green-800 mb-5 text-center ${isBurmese ? "leading-relaxed" : ""}`}
            >
              {t(
                translations.selectLanguage.en,
                translations.selectLanguage.mm,
              )}
            </h3>

            {/* Language options */}
            <div className="flex flex-col gap-3 mb-6">
              {/* English */}
              <label
                className={`flex items-center p-3 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedLang === "en"
                    ? "border-green-500 bg-green-50 shadow-sm"
                    : "border-gray-200 hover:border-green-300"
                }`}
              >
                <input
                  type="radio"
                  name="language"
                  value="en"
                  checked={selectedLang === "en"}
                  onChange={() => setSelectedLang("en")}
                  className="sr-only"
                />
                <span className="w-5 h-5 rounded-full border-2 border-gray-300 mr-3 flex items-center justify-center flex-shrink-0">
                  {selectedLang === "en" && (
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                  )}
                </span>
                <span className="text-gray-800 font-medium text-sm sm:text-base">
                  {translations.english.en} {/* English never changes */}
                </span>
              </label>

              {/* Burmese */}
              <label
                className={`flex items-center p-3 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedLang === "mm"
                    ? "border-green-500 bg-green-50 shadow-sm"
                    : "border-gray-200 hover:border-green-300"
                }`}
              >
                <input
                  type="radio"
                  name="language"
                  value="mm"
                  checked={selectedLang === "mm"}
                  onChange={() => setSelectedLang("mm")}
                  className="sr-only"
                />
                <span className="w-5 h-5 rounded-full border-2 border-gray-300 mr-3 flex items-center justify-center flex-shrink-0">
                  {selectedLang === "mm" && (
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                  )}
                </span>
                <span className="text-gray-800 font-medium text-sm sm:text-base">
                  {translations.burmese.mm} {/* Always show in Burmese */}
                </span>
              </label>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2 sm:gap-3">
              <button
                onClick={() => setIsLangModalOpen(false)}
                className="px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
              >
                {t(translations.cancel.en, translations.cancel.mm)}
              </button>
              <button
                onClick={handleSaveLanguage}
                disabled={savingLang}
                className="px-4 py-2.5 text-sm font-medium text-white bg-green-600 rounded-xl hover:bg-green-700 transition-colors shadow-sm flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {savingLang ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                    {t(translations.save.en, translations.save.mm)}
                  </>
                ) : (
                  t(translations.save.en, translations.save.mm)
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
