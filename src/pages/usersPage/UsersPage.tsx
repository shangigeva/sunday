import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import EditIcon from "@mui/icons-material/Edit";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import { useSelector } from "react-redux";
import { RootStateType } from "@/store/bigPie";
import { EditUsers, User } from "@/lib/types";
import EditUser from "../editUser/EditUser";

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editUser, setEditUser] = useState<User>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    _id: "",
    isAdmin: false,
  });

  const openModal = (user: User) => {
    console.log("Modal opened");
    setEditUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const userData = useSelector((bigPie: RootStateType) => bigPie.auth.userData);
  console.log(userData?.payload.isAdmin);
  const getUsers = () => {
    axios
      .get("/users/allusers")
      .then(({ data }) => {
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error("Unexpected response structure:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        toast.error("Failed to fetch users. Please try again later.");
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleUpdateUser = (userId: string) => {
    axios
      .patch(`users/${userId}`, { isAdmin: true })
      .then((response) => {
        toast.success("🎉 User updated successfully!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log(userData?.payload.isAdmin);
        getUsers();
        setEditUser(response.data);
      })
      .catch((error) => {
        toast.error("Something went wrong!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.error("Error updating user:", error);
      });
  };
  const handleDeleteUser = (userId: string) => {
    axios
      .delete(`users/${userId}`)
      .then((response) => {
        toast.success("🎉 User deleted successfully!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        getUsers();
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          // message for 403 Forbidden error
          toast.error("You cannot delete yourself!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          //a generic error message for other errors
          toast.error("Something went wrong!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          console.error("Error deleting user:", error);
        }
      });
  };
  console.log(userData?.payload._id);
  console.log(users);
  const editUserProps: EditUsers = {
    isModalOpen,
    closeModal,
    editUser,
    setEditUser,
    userId: editUser._id,
  };
  return (
    <div className="container mx-auto">
      <h1 className="text-xl font-bold mb-4 text-center">Users</h1>
      <div className="overflow-x-auto">
        {users.length > 0 ? (
          <table className="table w-full">
            <thead>
              <tr>
                <th>first name</th>
                <th>last name</th>
                <th>phone</th>
                <th>email</th>
                <th>delete</th>
                <th>status</th>
                <th>edit</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: User) => (
                <tr key={user._id} className="bg-base-200">
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                  <td>
                    {" "}
                    <label htmlFor={`delete_modal_${user._id}`} className="btn">
                      <DeleteIcon />
                    </label>
                    <input
                      type="checkbox"
                      id={`delete_modal_${user._id}`}
                      className="modal-toggle"
                    />
                    <div className="modal" role="dialog">
                      <div className="modal-box">
                        <p className="py-4">
                          Are you sure you want to delete this user?
                        </p>
                        <div className="modal-action">
                          <label
                            htmlFor={`delete_modal_${user._id}`}
                            className="btn"
                          >
                            NO
                          </label>
                          <label
                            htmlFor={`delete_modal_${user._id}`}
                            className="btn"
                            onClick={() => handleDeleteUser(user._id)}
                          >
                            YES
                          </label>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td>
                    {user.isAdmin ? (
                      <label className="btn">
                        <BusinessCenterIcon />
                      </label>
                    ) : (
                      <div>
                        <label className="btn">
                          <UpgradeIcon />
                        </label>
                        <input
                          type="checkbox"
                          id={`upgrade_modal_${user._id}`}
                          className="modal-toggle"
                        />
                        <div className="modal" role="dialog">
                          <div className="modal-box">
                            <p className="py-4">
                              Are you sure you want to upgrade this user?
                            </p>
                            <div className="modal-action">
                              <label
                                htmlFor={`upgrade_modal_${user._id}`}
                                className="btn"
                              >
                                NO
                              </label>
                              <label
                                htmlFor={`upgrade_modal_${user._id}`}
                                className="btn"
                                onClick={() => handleUpdateUser(user._id)}
                              >
                                YES
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </td>

                  <td>
                    <label className="btn" onClick={() => openModal(user)}>
                      <EditIcon />
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No users found.</p>
        )}
      </div>{" "}
      {isModalOpen && <EditUser {...editUserProps} />}
    </div>
  );
};

export default UsersPage;
