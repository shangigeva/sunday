import React, { ChangeEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TaskInput, User } from "@/lib/types";
import { useSelector } from "react-redux";
import { RootStateType } from "@/store/bigPie";
import { labels, priorities, projects, statuses } from "../data/data";

export interface createTaskProps {
  isModalOpen: boolean;
  closeModal: () => void;
  newTask: TaskInput;
  setNewTask: React.Dispatch<React.SetStateAction<TaskInput>>;
}

// START
const CreateTask: React.FC<{
  isModalOpen: boolean;
  closeModal: () => void;
}> = ({ isModalOpen, closeModal }) => {
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [users, setUsers] = useState<User[]>([]);
  const [newTask, setNewTask] = useState<TaskInput>({
    title: "",
    subtitle: "",
    status: "",
    priority: "",
    label: "",
    owner: "",
    project: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    console.log(id);
    setNewTask((currentState) => ({
      ...currentState,
      [id]: value,
    }));
    setValidationErrors((currentErrors) => ({
      ...currentErrors,
    }));
  };
  console.log(newTask);

  // const userData = useSelector((bigPie: RootStateType) => bigPie.auth.userData);
  // console.log(userData?.payload.isAdmin);
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

  const handleUpdateChangesClick = async () => {
    try {
      const { data } = await axios.post("/tasks", {
        project: newTask.project,
        title: newTask.title,
        subtitle: newTask.subtitle,
        status: newTask.status,
        priority: newTask.priority,
        label: newTask.label,
        owner: newTask.owner,
      });

      toast.success(
        "Task number: " + data?.task?.TaskNumb + " created successfully!",
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    } catch (error) {
      console.error("Error handling update changes:", error);
      toast.error("something went wrong, plese try again", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    window.location.reload();
  };

  return (
    <div>
      {isModalOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto ">
          <div className="flex items-center justify-center min-h-screen ">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="bg-white p-4 rounded shadow-md w-96 relative z-10 ">
              <h1 className="text-2xl font-bold mb-4">Create New Task</h1>
              <label className="block mt-2">Project:</label>
              <select
                id="project"
                value={newTask.project}
                onChange={handleInputChange}
                className=" w-full h-10 border border-gray-300 rounded px-2 focus:outline-none focus:border-blue-500"
              >
                <option disabled value={""}>
                  please choose project
                </option>
                {projects.map((project) => (
                  <option key={project.value} value={project.value}>
                    {project.label}
                  </option>
                ))}
              </select>
              <label className="block mt-2">Title:</label>
              <input
                type="text"
                id="title"
                value={newTask.title}
                onChange={handleInputChange}
                className="w-full h-10 border border-gray-300 rounded px-2 focus:outline-none focus:border-blue-500"
              />
              <label className="block mt-2">Subtitle:</label>
              <input
                type="text"
                id="subtitle"
                value={newTask.subtitle}
                onChange={handleInputChange}
                className="w-full h-10 border border-gray-300 rounded px-2 focus:outline-none focus:border-blue-500"
              />
              <label className="block mt-2">Status:</label>
              <select
                id="status"
                value={newTask.status}
                onChange={handleInputChange}
                className="w-full h-10 border border-gray-300 rounded px-2 focus:outline-none focus:border-blue-500"
              >
                <option disabled value={""}>
                  please choose status
                </option>
                {statuses.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
              <label className="block mt-2">Label:</label>
              <select
                id="label"
                value={newTask.label}
                onChange={handleInputChange}
                className="w-full h-10 border border-gray-300 rounded px-2 focus:outline-none focus:border-blue-500"
              >
                <option disabled value={""}>
                  please choose label
                </option>
                {labels.map((label) => (
                  <option key={label.value} value={label.value}>
                    {label.label}
                  </option>
                ))}
              </select>
              <label className="block mt-2">Priority:</label>
              <select
                id="priority"
                value={newTask.priority}
                onChange={handleInputChange}
                className="w-full h-10 border border-gray-300 rounded px-2 focus:outline-none focus:border-blue-500"
              >
                <option disabled value={""}>
                  Please choose priority
                </option>
                {priorities.map((priority) => (
                  <option key={priority.value} value={priority.value}>
                    {priority.label}
                  </option>
                ))}
              </select>{" "}
              <label className="block mt-2">Assign to:</label>
              <select
                id="owner"
                value={newTask.owner}
                onChange={handleInputChange}
                className="w-full h-10 border border-gray-300 rounded px-2 focus:outline-none focus:border-blue-500"
              >
                <option disabled value={""}>
                  Please choose assignment
                </option>
                {users.map((user: User) => (
                  <option key={user._id} value={user._id}>
                    {`${user.firstName} ${user.lastName}`}
                  </option>
                ))}
              </select>
              <div className="flex justify-end mt-4">
                <Button
                  onClick={handleUpdateChangesClick}
                  className="bg-blue-500 mr-2"
                >
                  Save
                </Button>
                <Button onClick={closeModal}>Cancel</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateTask;
