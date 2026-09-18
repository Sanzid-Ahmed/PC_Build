/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import useApi from "../../../hooks/useApi";
import {
  Search,
  UserCheck,
  Shield,
  Trash2,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";

const Manageuser = () => {
  const api = useApi();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setErrorMessage("");
      const response = await api.get("/api/users");
      setUsers(response.data || []);
    } catch (err) {
      console.error("Failed to load users:", err);
      setErrorMessage("Could not fetch user records.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Role toggle handler
  const handleRoleChange = async (userId, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    try {
      await api.patch(`/api/users/${userId}/role`, { role: newRole });
      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
      );
    } catch (err) {
      console.error("Role update failed:", err);
    }
  };

  // User deletion handler
  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to remove this user?")) return;

    try {
      await api.delete(`/api/users/${userId}`);
      setUsers((prev) => prev.filter((u) => u._id !== userId));
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  };

  // Filter users by search input
  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      {/* <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-base-content sm:text-3xl">
            User Management
          </h1>
          <p className="text-xs text-base-content/60 mt-1">
            Manage registered accounts, assign administrative rights, and enforce access roles.
          </p>
        </div>
        <button
          onClick={fetchUsers}
          className="btn btn-outline btn-sm rounded-xl gap-2 text-xs"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Filter and Search Toolbar */}
      {/* <div className="flex items-center justify-between gap-4 rounded-2xl border border-base-content/10 bg-base-100/80 p-4 backdrop-blur-xl">
        <div className="relative w-full max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-base-content/40" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-sm input-bordered w-full pl-9 text-xs bg-base-200/50 focus:bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
        <span className="text-xs font-semibold text-base-content/60 hidden sm:block">
          Total Users: {filteredUsers.length}
        </span>
      </div> */}

      {/* Error Message */}
      {/* {errorMessage && (
        <div className="flex items-center gap-2 rounded-xl bg-error/10 border border-error/20 p-3.5 text-xs text-error">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Table Container */}
      {/* <div className="overflow-hidden rounded-2xl border border-base-content/10 bg-base-100/80 backdrop-blur-xl shadow-sm">
        <div className="overflow-x-auto">
          <table className="table table-md w-full">
            <thead>
              <tr className="border-b border-base-content/10 text-xs text-base-content/50 bg-base-200/30">
                <th>User Detail</th>
                <th>Role</th>
                <th>Build Limit</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="text-xs divide-y divide-base-content/5">
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center py-8">
                    <span className="loading loading-spinner loading-md text-primary" />
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-8 text-base-content/50">
                    No matching users found.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((userItem) => (
                  <tr key={userItem._id || userItem.firebase_id} className="hover:bg-base-200/40 transition-colors">
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="w-9 h-9 rounded-xl ring-1 ring-base-content/10">
                            <img
                              src={userItem.photoURL || "https://i.ibb.co/mR4q4Yq/user-placeholder.png"}
                              alt={userItem.name}
                            />
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-base-content">
                            {userItem.name || "N/A"}
                          </span>
                          <span className="text-[11px] text-base-content/50">
                            {userItem.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          userItem.role === "admin"
                            ? "bg-primary/10 text-primary border border-primary/20"
                            : "bg-base-200 text-base-content/70 border border-base-content/10"
                        }`}
                      >
                        <Shield className="h-3 w-3" />
                        {userItem.role || "user"}
                      </span>
                    </td>
                    <td className="font-semibold text-base-content/80">
                      {userItem.build_limit || 100}
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleRoleChange(userItem._id, userItem.role)}
                          className="btn btn-ghost btn-xs rounded-lg text-primary hover:bg-primary/10"
                          title="Toggle Admin Privilege"
                        >
                          <UserCheck className="h-3.5 w-3.5" />
                          <span>Toggle Role</span>
                        </button>

                        <button
                          onClick={() => handleDeleteUser(userItem._id)}
                          className="btn btn-ghost btn-xs rounded-lg text-error hover:bg-error/10"
                          title="Delete User"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div> */} 

      <p className="text-9xl font-bold text-center mt-50">Comming soon!!! In progress!!!</p>
    </div>
  );
};

export default Manageuser;