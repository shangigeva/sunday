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

const UsersPage = () => {
  type User = {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  };

  const [users, setUsers] = useState<User[]>([]);
  const getUsers = () => {
    // get all users
    axios.get("/users/users").then(({ data }) => {
      setUsers(data.users);
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
      {" "}
      <h1 className="text-xl font-bold mb-4 text-center">Users</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>first name</TableHead>
            <TableHead>last name</TableHead>
            <TableHead>phone</TableHead>
            <TableHead>email</TableHead>
            <TableHead>status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.email}</TableCell>
              {/* <TableCell>{user.email}</TableCell> upgrade */}
              {/* <TableCell>{user.email}</TableCell> delete */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersPage;
