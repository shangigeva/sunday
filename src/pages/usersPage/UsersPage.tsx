import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
type User = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
};
const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const getUsers = () => {
    axios.get("/users/allusers").then(({ data }) => {
      if (data) {
        setUsers(data);
      } else {
        // Handle unexpected response structure
      }
      console.log(data.users);
      console.log(data);
    });
  };
  useEffect(() => {
    getUsers();
  }, []);

  //  edit user
  // delete user
  // upgrade user to admin
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
                <tr key={user.email} className="bg-base-200">
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                  <td>{/* Status column content */}</td>
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
