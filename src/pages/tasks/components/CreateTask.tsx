import React, { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { CreateTaskValidation } from "@/validation/CreateTaskValidation";
import ROUTES from "@/Routes/ROUTES";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { owners } from "../data/data";
import { TaskInput } from "@/lib/types";

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

export interface createTaskProps {
  isModalOpen: boolean;
  closeModal: () => void;
  newTask: TaskInput;
  setNewTask: React.Dispatch<React.SetStateAction<TaskInput>>;
}
export type CreateTasks = {
  isModalOpen: boolean;
  closeModal: () => void;
  newTask: TaskInput;
  setNewTask: React.Dispatch<React.SetStateAction<TaskInput>>;
};

const statuses: Status[] = [
  { value: "backlog", label: "Backlog" },
  { value: "todo", label: "Todo" },
  { value: "in progress", label: "In Progress" },
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
// START
const CreateTask: React.FC<{
  isModalOpen: boolean;
  closeModal: () => void;
}> = ({ isModalOpen, closeModal }) => {
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [newTask, setNewTask] = useState<TaskInput>({
    title: "",
    subtitle: "",
    status: "",
    priority: "",
    label: "",
    owner: "",
  });
  const navigate = useNavigate();
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

  const handleUpdateChangesClick = async () => {
    try {
      const { data } = await axios.post("/tasks", {
        title: newTask.title,
        subtitle: newTask.subtitle,
        status: newTask.status,
        priority: newTask.priority,
        label: newTask.label,
        owner: newTask.owner,
      });
      navigate(ROUTES.HOME);
      toast.success("Task created successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error("Error handling update changes:", error);
    }
  };

  return (
    <div>
      {isModalOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="bg-white p-4 rounded shadow-md w-96 relative z-10">
              <h1 className="text-2xl font-bold mb-4">Create New Task</h1>
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
              <label className="block mt-2">Owner:</label>
              <select
                id="owner"
                value={newTask.owner}
                onChange={handleInputChange}
                className="w-full h-10 border border-gray-300 rounded px-2 focus:outline-none focus:border-blue-500"
              >
                <option disabled value={""}>
                  Please choose owner
                </option>
                {owners.map((owner) => (
                  <option key={owner.value} value={owner.value}>
                    {owner.label}
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

export default CreateTask;
