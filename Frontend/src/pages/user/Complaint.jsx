import axios from "axios";
import { useEffect, useState } from "react";

const ComplaintForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    district: "",
    taluk: "",
    pincode: "",
    address: "",
    location: "",
    file: null,
    remarks: "",
  });

  // const [preview, setPreview] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [taluks, setTaluks] = useState([]);
  // useEffect(() => {
  //   const fetchUserDetails = async () => {
  //     const email = localStorage.getItem("email");
  //     if (!email) return;

  //     try {
  //       const res = await axios.get(
  //         `http://localhost:8080/api/users/getByEmail/${email}`
  //       );
  //       const { firstName, email: userEmail, phoneNumber } = res.data;
  //       setForm((prev) => ({
  //         ...prev,
  //         name: firstName,
  //         email: userEmail,
  //         phoneNumber,
  //       }));
  //     } catch (error) {
  //       console.error("Failed to load user details", error);
  //     }
  //   };

  //   fetchUserDetails();
  // }, []);
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8080/api/districts")
  //     .then((res) => setDistricts(res.data))
  //     .catch((err) => console.error("Failed to load districts", err));
  // }, []);
  // useEffect(() => {
  //   if (form.district) {
  //     axios
  //       .get(`http://localhost:8080/api/{id}/taluks?district=${form.district}`)
  //       .then((res) => setTaluks(res.data))
  //       .catch((err) => console.error("Failed to load taluks", err));
  //   } else {
  //     setTaluks([]);
  //   }
  // }, [form.district]);
  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/districts");
        setDistricts(res.data);
      } catch (err) {
        console.error("Failed to load districts", err);
      }
    };
    fetchDistricts();
  }, []);
  useEffect(() => {
    const fetchTaluks = async () => {
      // Fetch taluks based on selected district
      if (form.district) {
        try {
          const res = await axios.get(
            `http://localhost:8080/api/taluks?district=${form.district}`
          );
          setTaluks(res.data);
        } catch (err) {
          console.error("Failed to load taluks", err);
        }
      } else {
        setTaluks([]);
      }
    };
    fetchTaluks();
  }, [form.district]);

  // const handleChange = (e) => {
  //   const { name, value, files } = e.target;
  //   if (name === "file") {
  //     const file = files[0];
  //     setForm((prev) => ({ ...prev, file }));
  //     if (file) {
  //       const reader = new FileReader();
  //       reader.onloadend = () => {
  //         setPreview(reader.result);
  //       };
  //       reader.readAsDataURL(file);
  //     } else {
  //       setPreview(null);
  //     }
  //   } else {
  //     setForm((prev) => ({ ...prev, [name]: value }));
  //   }
  // };
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const data = new FormData();
    // Object.entries(form).forEach(([key, value]) => {
    //   data.append(key, value);
    // });

    const data = { ...form };
    // If a district ID is selected, format it for the backend
    if (data.district) {
      data.district = { id: data.district };
    } else {
      delete data.district;
    }
    // If a taluk ID is selected, format it for the backend
    if (data.taluk) {
      data.taluk = { id: data.taluk };
    } else {
      delete data.taluk;
    }

    console.log("Form data being submitted:", data);
    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      await axios.post("http://localhost:8080/api/complaints", data, {
        headers: {
          // "Content-Type": "multipart/form-data",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log(res.data);
      alert("Complaint submitted successfully");
    } catch {
      alert("Failed to submit complaint");
    }
  };

  const inputStyle =
    "w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2772A0]";

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white p-6 shadow-md rounded space-y-4 mt-5 mb-5"
      encType="multipart/form-data"
    >
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Name
      </label>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        className={inputStyle}
        placeholder="Name"
      />
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Email
      </label>
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        className={inputStyle}
        placeholder="Email"
      />
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Phone Number
      </label>
      <input
        name="phoneNumber"
        value={form.phoneNumber}
        onChange={handleChange}
        className={inputStyle}
        placeholder="Phone Number"
      />

      <label className="block text-sm font-medium text-gray-700 mb-2">
        District
      </label>
      {/* <input
        name="district"
        value={form.district}
        onChange={handleChange}
        placeholder="District"
        className={inputStyle}
      /> */}
      <select
        name="district"
        value={form.district}
        onChange={handleChange}
        required
      >
        <option value="">Select District</option>
        {districts.map((d) => (
          <option key={d.id} value={d.id}>
            {d.name}
          </option>
        ))}
      </select>

      <label className="block text-sm font-medium text-gray-700 mb-2">
        Taluk
      </label>
      {/* <input
        name="taluk"
        value={form.taluk}
        onChange={handleChange}
        placeholder="Taluk"
        className={inputStyle}
      /> */}
      <select name="taluk" value={form.taluk} onChange={handleChange} required>
        <option value="">Select Taluk</option>
        {taluks.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select>

      <label className="block text-sm font-medium text-gray-700 mb-2">
        Pincode
      </label>
      <input
        name="pincode"
        value={form.pincode}
        onChange={handleChange}
        placeholder="Pincode"
        className={inputStyle}
      />

      <label className="block text-sm font-medium text-gray-700 mb-2">
        Address
      </label>
      <textarea
        name="address"
        value={form.address}
        onChange={handleChange}
        placeholder="Address"
        className={inputStyle}
        rows="2"
      />

      <label className="block text-sm font-medium text-gray-700 mb-2">
        Location
      </label>
      <input
        name="location"
        value={form.location}
        onChange={handleChange}
        placeholder="Location"
        className={inputStyle}
      />

      {/* <div>
        <label
          htmlFor="fileUpload"
          className="block mb-1 text-sm font-medium text-gray-700"
        >
          Upload Image/Video
        </label>
        <label
          htmlFor="fileUpload"
          className="inline-block cursor-pointer bg-[#2772A0] text-white py-2 px-4 rounded hover:bg-[#1e5f8c]"
        >
          Choose File
        </label>
        <input
          id="fileUpload"
          name="file"
          type="file"
          accept="image/*,video/*"
          onChange={handleChange}
          className="hidden"
        /> */}
      {/* {preview && (
          <div className="mt-2">
            {form.file?.type?.startsWith("video") ? (
              <video controls className="w-full max-h-64 rounded">
                <source src={preview} type={form.file.type} />
              </video>
            ) : (
              <img
                src={preview}
                alt="Preview"
                className="w-full max-h-64 object-contain rounded"
              />
            )}
          </div>
        )} */}
      {/* </div> */}
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Remarks
      </label>
      <input
        name="remarks"
        value={form.remarks}
        onChange={handleChange}
        placeholder="Type your complaint here...."
        className={inputStyle}
      />

      <button
        type="submit"
        className="bg-[#2772A0] text-white font-semibold py-2 px-6 rounded hover:bg-[#1e5f8c] transition duration-200"
      >
        Submit
      </button>
    </form>
  );
};

export default ComplaintForm;
