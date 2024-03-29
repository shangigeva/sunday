import ROUTES from "@/Routes/ROUTES";
import { EditTasks, TaskInput, TaskType, User } from "@/lib/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditTask from "../editTask.tsx/EditTask";

const TaskDetailsPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [taskDetails, setTaskDetails] = useState<TaskType | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  const { taskId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/tasks/${taskId}`)
      .then(({ data }) => {
        setTaskDetails(data);
        axios
          .get(`/users/${data.owner}`)
          .then(({ data }) => {
            setUser(data.user);
          })
          .catch((error) => {
            console.log("Error fetching user data", error);
          });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching task details:", error);
        setLoading(false);
      });
  }, [taskId]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  const openModal = () => {
    console.log("Modal opened");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const editTaskProps: EditTasks = {
    isModalOpen,
    closeModal,
    editTask,
    setEditTask,
    taskId: taskId!,
  };

  return (
    <div className="task-details-page min-h-screen p-8 relative overflow-hidden flex flex-col">
      <div className="bg-wave h-full w-full absolute top-0 left-0" />
      <div className="flex-1 p-6 rounded-md max-w-2xl mx-auto relative z-10">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Task Details</h1>
        {taskDetails ? (
          <div className="details space-y-4">
            <div>
              <strong className="text-gray-700">Project:</strong>{" "}
              {taskDetails.project}
            </div>
            <div>
              <strong className="text-gray-700">Title:</strong>{" "}
              {taskDetails.title}
            </div>
            <div>
              <strong className="text-gray-700">Subtitle:</strong>{" "}
              {taskDetails.subtitle}
            </div>
            <div>
              <strong className="text-gray-700">Label:</strong>{" "}
              {taskDetails.label}
            </div>
            <div>
              <strong className="text-gray-700">Status:</strong>{" "}
              {taskDetails.status}
            </div>
            <div>
              <strong className="text-gray-700">Priority:</strong>{" "}
              {taskDetails.priority}
            </div>
            <div>
              <strong className="text-gray-700">Owner:</strong>{" "}
              {user?.firstName + " " + user?.lastName}
            </div>
            <div>
              <strong className="text-gray-700">Create Time:</strong>{" "}
              {new Date(taskDetails.createTime).toLocaleString()}
            </div>
          </div>
        ) : (
          <p className="error">Error loading task details...</p>
        )}
        <div className="mt-8">
          <a
            onClick={() => navigate(ROUTES.TASKS)}
            className="bg-[#9584FF] text-white py-2 px-4 rounded-md hover:bg-[#715CF8] transition duration-300"
          >
            Back to Tasks
          </a>
          <button
            onClick={openModal}
            className="bg-[#9584FF] text-white py-2 px-4 rounded-md hover:bg-[#715CF8] transition duration-300 ml-4"
          >
            Edit Task
          </button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="wave-svg"
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#715CF8"
            fillOpacity="1"
            d="M0,96L60,74.7C120,53,240,11,360,37.3C480,64,600,160,720,186.7C840,213,960,171,1080,149.3C1200,128,1320,128,1380,128L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </div>{" "}
      {isModalOpen && <EditTask {...editTaskProps} />}
    </div>
  );
};

export default TaskDetailsPage;
