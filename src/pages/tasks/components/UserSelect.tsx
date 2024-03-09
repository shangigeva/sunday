import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  selectedUser: string;
}

const UserSelectComponent = ({ selectedUser }: UserSelectComponentProps) => {
  const [user, setUser] = useState<User>();

  if (selectedUser === "last" || selectedUser === "lastq")
    return <h1>לא קיים יוזר</h1>;
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0).toUpperCase()}${lastName
      .charAt(0)
      .toUpperCase()}`;
  };

  const getUser = () => {
    axios
      .get(`/users/${selectedUser}`)
      .then(({ data }) => {
        setUser(data.user);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
        // toast.error("Failed to fetch users. Please try again later.");
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  //   console.log(user);

  return (
    <div
      className="lg:tooltip"
      data-tip={
        user ? `${user?.firstName} ${user?.lastName}` : "User does not exist"
      }
    >
      <Avatar>
        <AvatarFallback className="bg-[#F1C2D9] text-primary">
          {user && getInitials(user?.firstName || "", user?.lastName || "")}
        </AvatarFallback>
      </Avatar>
    </div>
  );
};

export default UserSelectComponent;
