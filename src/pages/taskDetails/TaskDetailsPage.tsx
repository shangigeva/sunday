import ROUTES from "@/Routes/ROUTES";
import { TaskType } from "@/lib/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const TaskDetailsPage = () => {
  const [taskDetails, setTaskDetails] = useState<TaskType | null>(null);
  const [loading, setLoading] = useState(true);
  const { taskId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`/tasks/${taskId}`)
      .then(({ data }) => {
        setTaskDetails(data);
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
  return (
    <div className="task-details-page min-h-screen p-8">
      <div className="bg-white p-6 rounded-md shadow-md max-w-2xl mx-auto">
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
              {taskDetails.owner}
            </div>
            <div>
              <strong className="text-gray-700">create Time:</strong>{" "}
              {taskDetails.createTime}
            </div>
          </div>
        ) : (
          <p className="error">Error loading task details...</p>
        )}
        <div className="mt-8">
          <a
            onClick={() => navigate(ROUTES.TASKS)}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Back to Tasks
          </a>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
