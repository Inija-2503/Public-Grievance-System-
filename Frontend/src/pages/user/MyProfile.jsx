import { useEffect, useState } from "react";
import axios from "axios";

const MyProfile = () => {
  const [user, setUser] = useState({});
  const [originalUser, setOriginalUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  //  Fetch user profile on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!id || id === "undefined" || !token) {
          setError("User not logged in properly");
          return;
        }

        const res = await axios.get(`http://localhost:8080/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data);
        setOriginalUser(res.data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setError("Failed to load profile. Please try again.");
      }
    };

    fetchUser();
  }, [id, token]);

  //  Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  //  Save updates
  const handleSave = async () => {
    try {
      if (!id || id === "undefined" || !token) {
        setError("Invalid user or token");
        return;
      }

      setIsSaving(true);

      const res = await axios.put(
        `http://localhost:8080/api/users/${id}`,
        user,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(res.data);
      setOriginalUser(res.data);
      setEditMode(false);
      setError(null);
    } catch (err) {
      console.error("Failed to update user:", err);
      setError(err.response?.data?.message || "Failed to save changes.");
    } finally {
      setIsSaving(false);
    }
  };

  //  Cancel edit
  const handleCancel = () => {
    setUser(originalUser);
    setEditMode(false);
    setError(null);
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow rounded mb-7">
      <h2 className="text-xl font-bold mb-4">My Profile</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="space-y-4">
        <div>
          <label className="block font-semibold">Name</label>
          <input
            type="text"
            name="firstName"
            value={user.firstName || ""}
            onChange={handleChange}
            disabled={!editMode}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold">Name</label>
          <input
            type="text"
            name="lastName"
            value={user.lastName || ""}
            onChange={handleChange}
            disabled={!editMode}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={user.email || ""}
            onChange={handleChange}
            disabled={!editMode}
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="block font-semibold">Phone</label>
          <input
            type="text"
            name="phoneNumber"
            value={user.phoneNumber || ""}
            onChange={handleChange}
            disabled={!editMode}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold">Phone</label>
          <textarea
            name="address"
            type="text"
            value={user.address || ""}
            onChange={handleChange}
            rows="2"
            disabled={!editMode}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="flex gap-4 mt-4">
          {editMode ? (
            <>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
