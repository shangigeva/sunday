import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootStateType } from "@/store/bigPie";
import { User } from "@/lib/types";
import EditUser from "../editUser/EditUser";
import ROUTES from "@/Routes/ROUTES";
import HomeIcon from "@mui/icons-material/Home";
const ProfilePage = () => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const userData = useSelector((bigPie: RootStateType) => bigPie.auth.userData);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = userData?.payload?._id;

    if (userId) {
      axios
        .get(`/users/${userId}`)
        .then(({ data }) => {
          setUser(data.user);
        })
        .catch((error) => {
          console.log("Error fetching user data", error);
        });
    }
  }, [userData]);

  const openEditModal = () => {
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  return (
    <div className="flex items-center h-screen w-full justify-center my-10">
      <div className="max-w-md w-full">
        <h1 className="text-3xl mb-4 text-center">Profile</h1>
        {user ? (
          <div
            className=" shadow-xl rounded-lg p-4"
            style={{
              backgroundImage: "url('/assets/images/blob-pink.png')",
            }}
          >
            <div className="photo-wrapper p-4 text-center">
              {user?.profilePicture ? (
                <img
                  className="w-48 h-48 rounded-full mx-auto mb-4"
                  src={user?.profilePicture}
                  alt={`${user?.firstName} ${user?.lastName}`}
                />
              ) : (
                <div className="mb-4">
                  <img
                    className="w-36 h-36 rounded-full mx-auto mb-2"
                    src="/assets/images/avatar.png"
                    alt="Default User"
                  />
                  <input
                    type="file"
                    className="file-input file-input-bordered file-input-xs w-full max-w-xs"
                  />
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-center text-2xl text-gray-900 font-medium leading-8 mb-4">
                {user?.firstName + " " + user?.lastName}
              </h3>
              <table className="text-base my-4 mx-auto">
                <tbody>
                  <tr>
                    <td className="px-2 py-2 text-gray-500 font-semibold">
                      Phone
                    </td>
                    <td className="px-2 py-2">{user?.phone}</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 text-gray-500 font-semibold">
                      Email
                    </td>
                    <td className="px-2 py-2">{user?.email}</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 text-gray-500 font-semibold">
                      Status
                    </td>
                    <td className="px-2 py-2">
                      {user?.isAdmin ? "Admin" : "Regular"}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="flex justify-around">
                <div
                  className=" cursor-pointer flex items-center justify-center space-x-2 my- hover:underline hover:text-indigo-600 font-medium4"
                  onClick={openEditModal}
                >
                  <div className="text-base text-[#715CF8]  hover:underline hover:text-indigo-600 font-medium">
                    Edit
                  </div>
                  <EditIcon className="text-[#715CF8] " />
                </div>

                <div className="text-center my-4 cursor-pointer">
                  <a
                    className="text-base text-[#715CF8]  hover:underline hover:text-indigo-600 font-medium"
                    onClick={() => navigate(ROUTES.TASKS)}
                  >
                    Back Home
                  </a>
                  <HomeIcon className=" text-[#715CF8] " />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-xl text-center">User not found</p>
        )}
      </div>
      <EditUser
        isModalOpen={editModalOpen}
        closeModal={closeEditModal}
        userId={userData?.payload?._id || ""}
      />
    </div>
  );
};

export default ProfilePage;
