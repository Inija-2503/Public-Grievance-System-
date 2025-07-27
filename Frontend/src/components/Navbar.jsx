import { NavLink, useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png";
// import profile from "../assets/profile.jpg";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const ProfileIcon = ({ name }) => (
  <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold cursor-pointer">
    {name ? name.charAt(0).toUpperCase() : "U"}
  </div>
);

const Navbar = () => {
  //   const [showMenu, setShowMenu] = useState(false);
  // const [token, setToken] = useState(true); // when we have token we login and when we dont we have logout
  // const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  // const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // useEffect(() => {
  //   // This can be a token check or API call in real apps
  //   const token = localStorage.getItem("token");
  //   setIsLoggedIn(!!token);
  // }, [location]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    setDropdownOpen(false);
    navigate("/login");
  };
  // const handleToggleDropdown = () => {
  //   setDropdownOpen((prev) => !prev);
  // };
  const handleNavigate = (path) => {
    navigate(path);
    setDropdownOpen(false); // Close dropdown on navigation
  };
  return (
    <div className="flex justify-between items-center bg-white px-4 py-4 shadow-md mb-7">
      <NavLink to="/">
        <img
          src={logo}
          alt="Logo"
          style={{ width: "70px", height: "70px" }}
          className="cursor-pointer"
        />
      </NavLink>

      <ul className="hiddden md:flex items-start gap-5 font-medium">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-[#2772A0] border-b-2 border-[#2772A0] pb-1"
              : "text-black"
          }
        >
          <li className=" py-1 ">Home</li>
          <hr className="border-none outline-none h-0.5 bg-[#2772A0] w-3/5 m-auto hidden" />
        </NavLink>
        {/* <NavLink
          to={"/dashboard"}
          className={({ isActive }) =>
            isActive
              ? "text-[#2772A0] border-b-2 border-[#2772A0] pb-1"
              : "text-black"
          }
        >
          <li className="py-1">Dashboard</li>
          <hr className="border-none outline-none h-0.5 bg-[#2772A0] w-3/5 m-auto hidden" />
        </NavLink> */}
        <NavLink
          to="/report"
          className={({ isActive }) =>
            isActive
              ? "text-[#2772A0] border-b-2 border-[#2772A0] pb-1"
              : "text-black"
          }
        >
          <li className="py-1">Report</li>
          <hr className="border-none outline-none h-0.5 bg-[#2772A0] w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink
          to="/complaint"
          className={({ isActive }) =>
            isActive
              ? "text-[#2772A0] border-b-2 border-[#2772A0] pb-1"
              : "text-black"
          }
        >
          <li className="py-1">Complaint Form</li>
          <hr className="border-none outline-none h-0.5 bg-[#2772A0] w-3/5 m-auto hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-4">
        {/* {isLoggedIn ? (
          <div className=" relative">
            <img
              src={profile}
              alt="profile"
              className="w-10 h-10 rounded-full"
              onClick={handleToggleDropdown}
            /> */}
        {user ? (
          <div className="relative">
            <div onClick={() => setDropdownOpen((prev) => !prev)}>
              <ProfileIcon name={user.firstName} />
            </div>

            {dropdownOpen && (
              <div className="absolute top-14 right-0 text-base font-medium text-[#2772A0] z-20">
                <div className="w-50 bg-[#CCDDEA] text-[#2772A0] rounded-lg shadow-lg p-8 flex flex-col gap-3">
                  <p
                    onClick={() => handleNavigate("/my-profile")}
                    className="hover:text-black cursor-pointer"
                  >
                    My profile
                  </p>
                  <p
                    onClick={handleLogout}
                    className="hover:text-black cursor-pointer"
                  >
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            className="bg-[#2772A0] text-white px-4 py-2 rounded-full font-light cursor-pointer  "
            onClick={() => navigate("/login")}
          >
            Create Account
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
