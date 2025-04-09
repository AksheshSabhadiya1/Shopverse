import React, { useState, useContext, useEffect } from "react";
import SliderContext from "../../context/Slidercontext";
import { Trash2 } from "lucide-react";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function AllUser() {
  const [users, setUsers] = useState([]);
  const { sliderOpen } = useContext(SliderContext);
  const { pathname } = useLocation();
  const path = pathname.split("/").filter(Boolean);


  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/admin/users/${id}`, {
        withCredentials: true,
      });
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      console.error("User Deletion Failed", error);
    }
  };


  const fetchUsers = async (filterType) => {
    try {
      const { data } = await axios.get("http://localhost:5000/admin/users", {
        withCredentials: true,
      });

      let filteredUsers = data;
      if (filterType === "approved") filteredUsers = data.filter((user) => user.approved_status === 1);
      if (filterType === "notapproved") filteredUsers = data.filter((user) => user.approved_status === 0);

      setUsers(filteredUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    if (path.includes("approveduser")) {
      fetchUsers("approved");
    } else if (path.includes("notapproveduser")) {
      fetchUsers("notapproved");
    } else {
      fetchUsers();
    }
  }, [pathname]);

  return (
    <div className={`pt-15 ${sliderOpen ? "pl-64" : "pl-0"}`}>
      <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex flex-col items-center p-6">
        <div className="w-full mt-10 max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {users.length > 0 ? (
            users.map((user) => (
              <div
                key={user.id}
                className="relative p-4 bg-white/10 backdrop-blur-lg border border-white/20 text-white rounded-xl shadow-md hover:scale-105 transition-all duration-300 text-center"
              >
                <button
                  onClick={() => handleDelete(user.id)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  title="Delete"
                >
                  <Trash2 className="w-5 h-5" />
                </button>

                <img
                  src={`http://localhost:5000/uploads/users/${user.gender === "male" ? "male_profile.png" : "female_profile.png"}`}
                  alt="Profile"
                  className="w-30 h-24 object-contain mx-auto mb-3"
                />
                <h3 className="text-lg font-semibold">{user.firstname} {user.lastname}</h3>
                <p className="text-sm text-gray-300">{user.email}</p>
                <p className="mt-2 text-sm">{user.login_status ? "Logged In" : "Not Logged In"}</p>

                <button
                  className={`mt-4 px-4 py-2 rounded transition ${user.approved_status ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}`}
                >
                  {user.approved_status ? "Approved" : "Not Approved"}
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-300 w-full col-span-4">No users available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
