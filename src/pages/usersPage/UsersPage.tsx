import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

type User = {
  _id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
};

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  const getUsers = () => {
    axios
      .get("/users/allusers")
      .then(({ data }) => {
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          // Handle unexpected response structure
          console.error("Unexpected response structure:", data);
        }
      })
      .catch((error) => {
        // Handle error when the request fails
        console.error("Error fetching users:", error);
        toast.error("Failed to fetch users. Please try again later.");
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

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
                <th>status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="bg-base-200">
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                  <td>
                    <button onClick={() => handleDeleteUser(user._id)}>
                      delete
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
