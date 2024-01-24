import { RootStateType } from "@/store/bigPie";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
}

interface UserSelectComponentProps {
  users: User[];
  selectedUser: string;
  onSelectUser: (value: string) => void;
}

const UserSelectComponent = ({
  selectedUser,
  onSelectUser,
}: UserSelectComponentProps) => {
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

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectUser(event.target.value);
  };
  //   console.log(user);

  return (
    <select value={selectedUser} onChange={handleSelectChange}>
      {users.map((user: User) => (
        <option key={user._id} value={user._id}>
          {`${user.firstName} ${user.lastName}`}
        </option>
      ))}
    </select>
  );
};

export default UserSelectComponent;
