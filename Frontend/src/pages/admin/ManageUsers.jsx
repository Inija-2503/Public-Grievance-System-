import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUsers } from "../../features/admin/userSlice";

const ManageUsers = () => {
  const dispatch = useDispatch();
  const { data: users, loading, error } = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  if (loading) return <div className="text-center p-4">Loading users ....</div>;
  if (error)
    return <div className="text-center p-4 text-red-500">Error: {error}</div>;
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Users</h1>
      <div className="overflow-x-auto shadow rounded">
        <table className="min-w-full border border-gray-300 text-sm text-center">
          <thead className="bg-blue-100 text-gray-700 uppercase">
            <tr>
              <th className="p-2 border">Sl.No</th>
              <th className="p-2 border">First Name</th>
              <th className="p-2 border">Last Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Phone Number</th>
              <th className="p-2 border">Address</th>
              <th className="p-2 border">Role</th>
            </tr>
          </thead>

          <tbody>
            {users && users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">{user.firstName}</td>
                  <td className="p-2 border">{user.lastName}</td>
                  <td className="p-2 border">{user.email}</td>
                  <td className="p-2 border">{user.phoneNumber || "N/A"}</td>
                  <td className="p-2 border">{user.address || "N/A"}</td>
                  <td className="p-2 border">{user.role}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  No Users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
