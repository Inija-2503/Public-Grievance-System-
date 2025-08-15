import { useNavigate } from "react-router-dom";
import header from "../../assets/header.png";
const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen  flex flex-col bg-[#CCDDEA] mb-7  rounded-md shadow-lg">
      {/* Header Section */}
      <header className="bg-[#2772A0] text-white py-8 px-6 text-center rounded-md shadow-lg">
        <h1 className="text-4xl font-bold mb-2">Public Grievance Portal</h1>
        <p className="text-lg">
          Your voice matters. Raise complaints and view reports.
        </p>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between p-6 gap-6 mt-6">
        {/* Left content */}
        <div className="flex-1 space-y-4 text-center lg:text-left">
          <h2 className="text-2xl font-semibold text-[#2772A0]">
            Welcome to the Public Grievance System
          </h2>
          <p className="text-gray-700">
            Easily report civic issues, raise complaints, and help make your
            city better. This platform connects you directly with the concerned
            departments.
          </p>

          <div className="mt-4 flex gap-4 justify-center lg:justify-start">
            <button
              onClick={() => navigate("/report")}
              className="bg-[#2772A0] hover:bg-[#1f5e85] text-white py-2 px-6 rounded shadow"
            >
              View Reports
            </button>
            <button
              onClick={() => navigate("/complaint")}
              className="bg-white hover:bg-gray-100 text-[#2772A0] border border-[#2772A0] py-2 px-6 rounded shadow"
            >
              Lodge Complaint
            </button>
          </div>
        </div>

        {/* Right image */}
        <div className="flex-1">
          <img
            src={header}
            alt="Public Grievance Illustration"
            className="w-full max-w-md mx-auto rounded shadow"
          />
        </div>
      </section>

      {/* Footer  */}
      <footer className="mt-auto text-center py-4 text-sm text-gray-600">
        © 2025 Public Grievance Portal. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
