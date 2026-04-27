import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import api from "../api/axios";
import { useUser } from "../context/UserContext";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setToken } = useUser();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  // Language state: read from route state if coming from Register, else default "en"
  const [lang, setLang] = useState(location.state?.lang || "en");

  // Translations object
  const t = {
    welcome: { en: "Welcome", my: "ပြန်လည်" },
    back: { en: "Back!", my: "ကြိုဆိုပါတယ်!" },
    niceToSee: {
      en: "Nice to see you again",
      my: "ပြန်တွေ့ရတာ ဝမ်းသာပါတယ်",
    },
    emailPlaceholder: { en: "Email", my: "အီးမေးလ်" },
    passwordPlaceholder: { en: "Password", my: "စကားဝှက်" },
    signIn: { en: "Sign In", my: "အကောင့်ဝင်ရန်" },
    noAccount: {
      en: "Don’t have an account?",
      my: "အကောင့်မရှိသေးဘူးလား?",
    },
    signUp: { en: "Sign Up", my: "အကောင့်ဖွင့်ရန်" },
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;
    if (formData.password && !passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be 6+ chars, include uppercase, lowercase, number & special char";
    }

    setErrors(newErrors);
    setApiError("");

    if (Object.keys(newErrors).length === 0) {
      const payload = {
        email: formData.email,
        password: formData.password,
      };

      setIsSubmitting(true);

      try {
        const res = await api.post("/login", payload);
        console.log("Login success:", res.data);

        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);

        navigate("/");
      } catch (err) {
        console.error("Login failed:", err.response?.data || err.message);
        alert(err.response?.data?.message || "Login unsuccessful");

        setFormData({
          email: "",
          password: "",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-white">
      <div className="w-full max-w-[402px] px-3 sm:px-4 pt-4 sm:pt-6 pb-8 sm:pb-10">
        {/* Form Container */}
        <div className="bg-white px-4 sm:px-6 py-6 sm:py-8">
          <h1 className="text-2xl sm:text-3xl md:text-3xl font-bold text-center mb-4 sm:mb-6">
            {t.welcome[lang]}{" "}
            <span className="text-green-600">{t.back[lang]}</span>
          </h1>
          <p className="text-sm sm:text-base text-center text-gray-500 mb-8 sm:mb-12">
            {t.niceToSee[lang]}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Email */}
            <div>
              <div className="relative">
                <i className="fa-solid fa-envelope absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-green-500"></i>
                <input
                  type="email"
                  name="email"
                  placeholder={t.emailPlaceholder[lang]}
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-100 pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 rounded-xl outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="relative mb-8 sm:mb-12">
              <i className="fa-solid fa-lock absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-green-500"></i>

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder={t.passwordPlaceholder[lang]}
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-gray-100 pl-10 sm:pl-12 pr-12 py-2.5 sm:py-3 rounded-xl outline-none focus:ring-2 focus:ring-green-500"
                required
              />

              <i
                className={`fa-solid absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 ${
                  showPassword ? "fa-eye-slash" : "fa-eye"
                }`}
                onClick={() => setShowPassword(!showPassword)}
              ></i>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition block mx-auto mt-4
            w-44 sm:w-56 md:w-[229px] h-12 sm:h-14 md:h-[59px] text-sm sm:text-base
            ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
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
                t.signIn[lang]
              )}
            </button>
          </form>

          {/* Bottom Link */}
          <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-700">
            {t.noAccount[lang]}{" "}
            <span
              onClick={() => navigate("/register", { state: { lang } })}
              className="text-green-600 font-medium cursor-pointer"
            >
              {t.signUp[lang]}
            </span>
          </div>

          {/* Language Toggle */}
          <div className="mt-6 flex justify-center">
            <div className="flex items-center bg-gray-100 rounded-full p-1 cursor-pointer select-none">
              <span
                onClick={() => setLang("en")}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  lang === "en"
                    ? "bg-green-600 text-white shadow-sm"
                    : "text-gray-700"
                }`}
              >
                Eng
              </span>
              <span
                onClick={() => setLang("my")}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  lang === "my"
                    ? "bg-green-600 text-white shadow-sm"
                    : "text-gray-700"
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
