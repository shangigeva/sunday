import React, { ChangeEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import axios from "axios";
import { owners } from "../tasks/data/data";
import { TaskInput, User } from "@/lib/types";
import { useSelector } from "react-redux";
import { RootStateType } from "@/store/bigPie";

interface Status {
  value: string;
  label: string;
}
interface Label {
  value: string;
  label: string;
}
interface Priority {
  value: string;
  label: string;
}

const projects: Status[] = [
  { value: "Malam Team", label: "Malam Team" },
  { value: "IBM", label: "IBM" },
  { value: "Amazon", label: "Amazon" },
  { value: "Payoneer", label: "Payoneer" },
];
const statuses: Status[] = [
  { value: "backlog", label: "Backlog" },
  { value: "todo", label: "Todo" },
  { value: "in progress", label: "In Progress" },
  { value: "done", label: "Done" },
];

const priorities: Priority[] = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

const labels: Label[] = [
  { value: "bug", label: "Bug" },
  { value: "feature", label: "Feature" },
  { value: "documentation", label: "Documentation" },
];

const EditTask: React.FC<{
  isModalOpen: boolean;
  closeModal: () => void;
  taskId: string;
}> = ({ isModalOpen, closeModal, taskId }) => {
  console.log("EditTask component rendered");
  const [users, setUsers] = useState<User[]>([]);

  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [editTask, setEditTask] = useState<TaskInput>({
    title: "",
    subtitle: "",
    status: "",
    priority: "",
    label: "",
    owner: "",
    taskId: "",
    project: "",
  });

  const handleSelectChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setEditTask((currentState) => ({
      ...currentState,
      [id]: value,
    }));
    setValidationErrors((currentErrors) => ({
      ...currentErrors,
    }));
  };
  console.log(editTask);

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
  useEffect(() => {
    axios
      .get(`/tasks/${taskId}`)
      .then(({ data }) => {
        setEditTask(data);
      })
      .catch((error) => {
        console.error("Error fetching task data:", error);
      });
  }, [taskId]);

  console.log(editTask);

  const handleUpdateChangesClick = async () => {
    try {
      console.log(editTask);

      const { data } = await axios.put(`/tasks/${taskId}`, {
        label: editTask.label,
        priority: editTask.priority,
        status: editTask.status,
        title: editTask.title,
        subtitle: editTask.subtitle,
        owner: editTask.owner,
        project: editTask.project,
      });
      closeModal();
      toast.success("Task updated successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Unable to edit task", {
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
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="bg-white p-4 rounded shadow-md w-96 relative z-10">
              <h1 className="text-2xl font-bold mb-4">Edit Task</h1>{" "}
              <label className="block mt-2">Project:</label>
              <select
                id="project"
                value={editTask.project}
                onChange={handleSelectChange}
                className="w-full h-10 border border-gray-300 rounded px-2 focus:outline-none focus:border-blue-500"
              >
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
                value={editTask.title}
                onChange={handleSelectChange}
                className="w-full h-10 border border-gray-300 rounded px-2 focus:outline-none focus:border-blue-500"
              />
              <label className="block mt-2">Subtitle:</label>
              <input
                type="text"
                id="subtitle"
                value={editTask.subtitle}
                onChange={handleSelectChange}
                className="w-full h-10 border border-gray-300 rounded px-2 focus:outline-none focus:border-blue-500"
              />
              <label className="block mt-2">Status:</label>
              <select
                id="status"
                value={editTask.status}
                onChange={handleSelectChange}
                className="w-full h-10 border border-gray-300 rounded px-2 focus:outline-none focus:border-blue-500"
              >
                {statuses.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
              <label className="block mt-2">Label:</label>
              <select
                id="label"
                value={editTask.label}
                onChange={handleSelectChange}
                className="w-full h-10 border border-gray-300 rounded px-2 focus:outline-none focus:border-blue-500"
              >
                {labels.map((label) => (
                  <option key={label.value} value={label.value}>
                    {label.label}
                  </option>
                ))}
              </select>
              <label className="block mt-2">Priority:</label>
              <select
                id="priority"
                value={editTask.priority}
                onChange={handleSelectChange}
                className="w-full h-10 border border-gray-300 rounded px-2 focus:outline-none focus:border-blue-500"
              >
                {priorities.map((priority) => (
                  <option key={priority.value} value={priority.value}>
                    {priority.label}
                  </option>
                ))}
              </select>
              <label className="block mt-2">Owner:</label>
              <select
                id="owner"
                value={editTask.owner}
                onChange={handleSelectChange}
                className="w-full h-10 border border-gray-300 rounded px-2 focus:outline-none focus:border-blue-500"
              >
                {users.map((user: User) => (
                  <option key={user._id} value={user._id}>
                    {`${user.firstName} ${user.lastName}`}
                  </option>
                ))}
              </select>
              <div className="flex justify-end mt-4">
                <Button
                  onClick={handleUpdateChangesClick}
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
    </div>
  );
};

export default EditTask;
