import { useState } from "react";
import PasswordChecklist from "react-password-checklist";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { loginSuccess } from "../../features/auth/authSlice";

const Login = () => {
  const [state, setState] = useState("Sign up");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validate = () => {
    const newErrors = {};

    if (state === "Sign up") {
      if (!firstName) newErrors.firstName = "First name is required";
      if (!lastName) newErrors.lastName = "Last name is required";

      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneNumber) {
        newErrors.phoneNumber = "Phone number is required";
      } else if (!phoneRegex.test(phoneNumber)) {
        newErrors.phoneNumber =
          "Phone number must start with 6-9 and be 10 digits";
      }

      if (!address) newErrors.address = "Address is required";
    }

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email)) {
      newErrors.email = "Enter a valid email (e.g. user@gmail.com)";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length > 8) {
      newErrors.password = "Password must not exceed 8 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      if (state === "Sign up") {
        const payload = {
          firstName,
          lastName,
          email,
          password,
          phoneNumber,
          address,
        };
        console.log(" Submitting signup data:", payload);
        await axios.post("http://localhost:8080/api/users/signup", payload);
        alert("Sign up successful!");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setPhoneNumber("");
        setAddress("");
        setState("Sign in");
      } else {
        const res = await axios.post("http://localhost:8080/api/users/signin", {
          email,
          password,
        });

        // localStorage.setItem("token", res.data.token);
        // // localStorage.setItem(
        // //   "id",
        // //   res.data.id || res.data.user.id || (res.user && res.user.id)
        // // );
        // //  To save the user ID from the response
        // console.log("Response from backend:", res.data);

        // localStorage.setItem("id", res.data.id);
        // localStorage.setItem("email", email);
        // navigate("/");
        const { token } = res.data;
        const userPayload = jwtDecode(token);
        dispatch(loginSuccess({ user: userPayload, token })); // Dispatch the login action()
        localStorage.setItem("token", token);
        localStorage.setItem("id", userPayload.id);
        alert("Login successful!");
        switch (userPayload.role) {
          case "admin":
            navigate("/admin/AdminDashboard");
            break;
          case "department":
            navigate("/department/DepartmentDashboard");
            break;
          default:
            navigate("/");
            break;
        }
      }
    } catch (err) {
      console.error(" Error:", err.response?.data);
      alert(err.response?.data?.message || "Server error");
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-[90vh] flex items-center justify-center mt-7 mb-7 px-4"
    >
      <div className="flex flex-col gap-4 w-full max-w-md mx-auto p-8 bg-white shadow-xl rounded-lg">
        <h2 className="text-2xl font-bold text-[#2772A0] text-center">
          {state === "Sign up" ? "Create Account" : "Sign In"}
        </h2>
        <p className="text-center text-sm text-gray-600 mb-2">
          Please {state === "Sign up" ? "Sign up" : "Sign in"} to continue
        </p>

        {/* First Name */}
        {state === "Sign up" && (
          <>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-[#2772A0]">
                First Name <span className="text-red-500"> *</span>
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2772A0]"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>

            {/* Last Name */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-[#2772A0]">
                Last Name <span className="text-red-500"> *</span>
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2772A0]"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>

            {/* Phone Number */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-[#2772A0]">
                Phone Number <span className="text-red-500"> *</span>
              </label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2772A0]"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phoneNumber}
                </p>
              )}
            </div>

            {/* Address */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-[#2772A0]">
                Address <span className="text-red-500"> *</span>
              </label>
              <textarea
                rows="2"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2772A0]"
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>
          </>
        )}

        {/* Email */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-[#2772A0]">
            Email <span className="text-red-500"> *</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2772A0]"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-[#2772A0]">
            Password <span className="text-red-500"> *</span>
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2772A0]"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}

          {state === "Sign up" && (
            <PasswordChecklist
              rules={["minLength", "specialChar", "number", "capital"]}
              minLength={6}
              value={password}
              valueAgain={password}
              onChange={(isValid) => console.log("Password valid:", isValid)}
              className="mt-2"
            />
          )}
        </div>

        <button
          type="submit"
          className="bg-[#2772A0] text-white font-semibold py-2 px-4 rounded-md hover:bg-[#1d5b85] transition-colors duration-200"
        >
          {state === "Sign up" ? "Create Account" : "Sign In"}
        </button>

        <p className="text-sm text-center text-gray-600 mt-2">
          {state === "Sign up"
            ? "Already have an account?"
            : "Don't have an account?"}{" "}
          <span
            onClick={() =>
              setState(state === "Sign up" ? "Sign in" : "Sign up")
            }
            className="text-[#2772A0] font-medium cursor-pointer hover:underline"
          >
            {state === "Sign up" ? "Sign in" : "Sign up"}
          </span>
        </p>
      </div>
    </form>
  );
};

export default Login;
