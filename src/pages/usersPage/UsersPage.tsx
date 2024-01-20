import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import EditIcon from "@mui/icons-material/Edit";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import { useSelector } from "react-redux";
import { RootStateType } from "@/store/bigPie";
type User = {
  _id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  isAdmin: string;
};

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
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
      });
  };
  console.log(userData?.payload.isAdmin);
  console.log(users);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4 text-center">Users</h1>
      <div className="overflow-x-auto">
        {users.length > 0 ? (
          <table className="table">
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
                    <button onClick={() => handleDeleteUser(user._id)}>
                      <DeleteIcon />
                    </button>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <BusinessCenterIcon />
                    ) : (
                      <button onClick={() => handleUpdateUser(user._id)}>
                        <UpgradeIcon />
                      </button>
                    )}
                  </td>
                  <td>
                    <button onClick={() => handleDeleteUser(user._id)}>
                      <EditIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
};

export default UsersPage;
