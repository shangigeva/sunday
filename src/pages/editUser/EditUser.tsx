import { Button } from "@/components/ui/button";
import { User } from "@/lib/types";
import { RootStateType } from "@/store/bigPie";
import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

// interface EditUserProps {
//   isModalOpen: boolean;
//   closeModal: () => void;
//   userId: string;
// }

const EditUser = ({
  isModalOpen,
  closeModal,
  userId,
}: {
  isModalOpen: boolean;
  closeModal: () => void;
  userId: string;
}) => {
  console.log("EditUser component rendered");
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [editUser, setEditUser] = useState<User>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    _id: "",
    isAdmin: false,
  });
  const userData = useSelector((bigPie: RootStateType) => bigPie.auth.userData);

  const handleSelectChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setEditUser((currentState) => ({
      ...currentState,
      [id]: value,
    }));
    setValidationErrors((currentErrors) => ({
      ...currentErrors,
    }));
  };
  console.log(editUser);

  useEffect(() => {
    axios
      .get(`/users/${userId}`)
      .then(({ data }) => {
        setEditUser(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [userId]);
  console.log(editUser);

  const handleEditUser = async () => {
    try {
      const { data } = await axios.put(`users/${userId}`, {
        firstName: editUser.firstName,
        lastName: editUser.lastName,
        phone: editUser.phone,
        email: editUser.email,
      });
      console.log(editUser);
      console.log("Response data:", data);
      // setEditUser(data);
      closeModal();
      toast.success("User edited successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error("Error editing user:", error);
      toast.error("Something went wrong!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.error("Error editing user:", error);
    }
  };

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="bg-white p-4 rounded shadow-md w-96 relative z-10">
              <h1 className="text-2xl font-bold mb-4">Edit User</h1>{" "}
              <label className="block mt-2">First name:</label>
              <input
                type="text"
                id="firstName"
                value={editUser.firstName}
                onChange={handleSelectChange}
                className="w-full h-10 border border-gray-300 rounded px-2 focus:outline-none focus:border-blue-500"
              />
              <label className="block mt-2">Last name:</label>
              <input
                type="text"
                id="lastName"
                value={editUser.lastName}
                onChange={handleSelectChange}
                className="w-full h-10 border border-gray-300 rounded px-2 focus:outline-none focus:border-blue-500"
              />
              <label className="block mt-2">Phone:</label>
              <input
                type="text"
                id="phone"
                value={editUser.phone}
                onChange={handleSelectChange}
                className="w-full h-10 border border-gray-300 rounded px-2 focus:outline-none focus:border-blue-500"
              />
              <label className="block mt-2">Email:</label>
              <input
                type="text"
                id="email"
                value={editUser.email}
                onChange={handleSelectChange}
                className="w-full h-10 border border-gray-300 rounded px-2 focus:outline-none focus:border-blue-500"
              />
              <div className="flex justify-end mt-4">
                <Button
                  onClick={handleEditUser}
                  className="bg-blue-500 text-white mr-2"
                >
                  Save
                </Button>
                <Button onClick={closeModal} className="border border-gray-300">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditUser;
