import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api/axios";
import systemLogo from "../assets/images/systemLogo.png";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    agree: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Language state: read from route state, default "en"
  const [lang, setLang] = useState(location.state?.lang || "en");

  // Translations for Register page
  const t = {
    hello: { en: "Hello!", my: "ဟယ်လို!" },
    usernamePlaceholder: { en: "Username", my: "အသုံးပြုသူအမည်" },
    emailPlaceholder: { en: "Email", my: "အီးမေးလ်" },
    passwordPlaceholder: { en: "Enter your password", my: "စကားဝှက်ထည့်ပါ" },
    confirmPasswordPlaceholder: {
      en: "Enter your password again",
      my: "စကားဝှက်ပြန်ထည့်ပါ",
    },
    genderPlaceholder: { en: "Gender", my: "ကျား/မ" },
    male: { en: "Male", my: "ကျား" },
    female: { en: "Female", my: "မ" },
    agreeText: {
      en: "I agree to the",
      my: "ကျွန်ုပ်သဘောတူပါသည်",
    },
    termsLink: {
      en: "terms and conditions",
      my: "စည်းကမ်းချက်များ",
    },
    signUpBtn: { en: "Sign Up", my: "အကောင့်ဖွင့်ရန်" },
    alreadyAccount: {
      en: "Already have an account?",
      my: "အကောင့်ရှိပြီးသားလား?",
    },
    signInLink: { en: "Sign in", my: "အကောင့်ဝင်ရန်" },
  };

  useEffect(() => {
    if (location.state && typeof location.state.termsAccepted === "boolean") {
      setFormData((prev) => ({
        ...prev,
        ...location.state,
        agree: location.state.termsAccepted,
      }));
    }
  }, [location.state?.termsAccepted]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirm password is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.agree) newErrors.agree = "You must agree to terms";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    if (formData.password && !passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be 8+ chars, include uppercase, lowercase, number & special char";
    }

    if (
      formData.password &&
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);
    setApiError("");

    console.log("=== Debug: Form Data ===");
    console.log(formData);

    if (formData.password !== formData.confirmPassword) {
      console.warn("Passwords do not match!");
    } else {
      console.log("Passwords match ✔");
    }

    if (Object.keys(validationErrors).length === 0) {
      const payload = {
        name: formData.username,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
        gender: formData.gender,
      };

      console.log("=== Debug: Payload to backend ===");
      console.log(payload);

      setIsSubmitting(true);

      api
        .post("/register", payload)
        .then((res) => {
          console.log("=== Debug: Backend Response ===");
          console.log(res.data);
          alert("Registration successful! Please login.");
          // Pass language so login page opens in the same language
          window.location.href = `/login?lang=${lang}`; // fallback, but better to navigate with state
          // Or use navigate: navigate("/login", { state: { lang } });
        })
        .catch((err) => {
          console.log("=== Debug: API Error Response ===");
          console.error(err.response?.data || err.message);
          if (err.response?.data?.message) {
            setApiError(err.response.data.message);
          } else if (err.response?.data?.errors) {
            setErrors(err.response.data.errors);
            setApiError("Please check the highlighted fields.");
          } else {
            setApiError("Something went wrong. Try again.");
          }
          setFormData({
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            gender: "",
            agree: false,
          });
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    } else {
      console.log("=== Debug: Validation Errors ===");
      console.warn(validationErrors);
    }
  };

  // Navigate to terms page, passing lang and current form data
  const goToTerms = () => {
    navigate("/terms", {
      state: { from: "register", formData, lang },
    });
  };

  return (
    <div className="min-h-screen w-full flex justify-center bg-white">
      <div className="w-full max-w-[402px] px-3 sm:px-4 pt-4 sm:pt-6 pb-8 sm:pb-10">
        <div className="w-full flex flex-col items-center mb-4 sm:mb-6">
          <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-50 md:h-50 bg-white-200 rounded-full flex items-center justify-center overflow-hidden">
            <img
              src={systemLogo}
              alt="Logo"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="bg-green-500 rounded-3xl px-4 sm:px-6 py-6 sm:py-8 shadow-md">
          <h1 className="text-white text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6">
            {t.hello[lang]}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            {/* Username */}
            <div>
              <div className="relative">
                <i className="fa-solid fa-user absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-green-500"></i>
                <input
                  type="text"
                  name="username"
                  placeholder={t.usernamePlaceholder[lang]}
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full bg-white pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 rounded-xl outline-none"
                />
              </div>
              {errors.username && (
                <p className="text-red-200 text-sm mt-1">{errors.username}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <div className="relative">
                <i className="fa-solid fa-envelope absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-green-500"></i>
                <input
                  type="text"
                  name="email"
                  placeholder={t.emailPlaceholder[lang]}
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 rounded-xl outline-none"
                />
              </div>
              {errors.email && (
                <p className="text-red-200 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <i className="fa-solid fa-lock absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-green-500"></i>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder={t.passwordPlaceholder[lang]}
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-white pl-10 sm:pl-12 pr-10 py-2.5 sm:py-3 rounded-xl outline-none"
              />
              <i
                className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"} absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer`}
                onClick={() => setShowPassword(!showPassword)}
              ></i>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <i className="fa-solid fa-lock absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-green-500"></i>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder={t.confirmPasswordPlaceholder[lang]}
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full bg-white pl-10 sm:pl-12 pr-10 py-2.5 sm:py-3 rounded-xl outline-none"
              />
              <i
                className={`fa-solid ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"} absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer`}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              ></i>
            </div>

            {errors.confirmPassword && (
              <p className="text-red-200 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}

            {/* Gender */}
            <div>
              <div className="relative">
                <i className="fa-solid fa-venus-mars absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-green-500"></i>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full bg-white pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 rounded-xl outline-none appearance-none"
                >
                  <option value="">{t.genderPlaceholder[lang]}</option>
                  <option value="male">{t.male[lang]}</option>
                  <option value="female">{t.female[lang]}</option>
                </select>
              </div>
              {errors.gender && (
                <p className="text-red-200 text-sm mt-1">{errors.gender}</p>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-center gap-2 text-sm text-white">
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
              />
              <span>
                {t.agreeText[lang]}{" "}
                <button
                  type="button"
                  className="underline font-semibold"
                  onClick={goToTerms}
                >
                  {t.termsLink[lang]}
                </button>
              </span>
            </div>
            {errors.agree && (
              <p className="text-red-200 text-sm">{errors.agree}</p>
            )}

            {apiError && (
              <p className="text-red-200 text-sm text-center mb-2">
                {apiError}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2.5 sm:py-3 rounded-xl font-semibold mt-4 text-white 
            bg-green-700 
            ${isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-green-800 active:scale-95 transition-all duration-150"}
          `}
            >
              {isSubmitting ? (
                <svg
                  className="animate-spin h-5 w-5 mx-auto text-white"
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
              ) : (
                t.signUpBtn[lang]
              )}
            </button>
          </form>

          {/* Bottom Link */}
          <div
            className="mt-4 sm:mt-6 text-center text-xs sm:text-sm"
            style={{ color: "#fff" }}
          >
            {t.alreadyAccount[lang]}{" "}
            <span
              onClick={() => navigate("/login", { state: { lang } })}
              style={{ color: "#fff", fontWeight: 500, cursor: "pointer" }}
            >
              {t.signInLink[lang]}
            </span>
          </div>

          {/* Language Toggle (same style as Login, adapted for green background) */}
          <div className="mt-6 flex justify-center">
            <div className="flex items-center bg-white rounded-full p-1 cursor-pointer select-none">
              <span
                onClick={() => setLang("en")}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  lang === "en"
                    ? "bg-green-600 text-white shadow-sm"
                    : "text-green-800"
                }`}
              >
                Eng
              </span>
              <span
                onClick={() => setLang("my")}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  lang === "my"
                    ? "bg-green-600 text-white shadow-sm"
                    : "text-green-800"
                }`}
              >
                မြန်မာ
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
