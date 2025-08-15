import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDepartments,
  addDepartment,
  updateDepartment,
  deleteDepartment,
} from "../../features/admin/departmentSlice";
import Modal from "../../components/Modal";
const ManageDepartments = () => {
  const dispatch = useDispatch();
  const {
    data: departments,
    loading,
    error,
  } = useSelector((state) => state.departments);

  // --- State for the Modal and Form ---
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    // email: "",
    // password: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.name.trim()
      // !formData.email.trim() ||
      // !formData.password.trim()
    ) {
      alert("Please fill out all fields.");
      return;
    }

    if (editingId) {
      dispatch(updateDepartment({ id: editingId, departmentData: formData }));
    } else {
      dispatch(addDepartment(formData));
    }
    closeModal();
  };

  const handleEdit = (department) => {
    setEditingId(department.id);

    setFormData({
      name: department.name,
      // email: department.email || "", // Use fallbacks for safety
      // password: department.password, // Don't show old password
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      dispatch(deleteDepartment(id));
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    // setFormData({ name: "", email: "", password: "" });
    setFormData({ name: "" });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ name: "", email: "", password: "" });
  };

  if (loading)
    return <div className="p-6 text-center">Loading departments...</div>;
  if (error)
    return <div className="p-6 text-center text-red-600">Error: {error}</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Departments</h1>
        <button
          onClick={openAddModal}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + Add Department
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-xl font-bold mb-4">
          {editingId ? "Edit Department" : "Add New Department"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Department Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              className="w-full p-2 border rounded mt-1"
              required
            />
          </div>
          {/* <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              className="w-full p-2 border rounded mt-1"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleFormChange}
              placeholder={editingId ? "Enter new password (optional)" : ""}
              className="w-full p-2 border rounded mt-1"
              required={!editingId} // Password is only required when creating
            />
          </div> */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {editingId ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </Modal>

      {/* Departments Table */}
      <div className="overflow-x-auto shadow rounded">
        <table className="min-w-full border text-sm text-center">
          <thead className="bg-blue-100 uppercase">
            <tr>
              <th className="p-2 border">Sl No</th>
              <th className="p-2 border">Department Name</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dept, index) => (
              <tr key={dept.id} className="hover:bg-gray-100">
                <td className="p-2 border">{index + 1}</td>
                <td className="p-2 border text-left">{dept.name}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => handleEdit(dept)}
                    className="text-blue-600 hover:underline mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(dept.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ManageDepartments;
