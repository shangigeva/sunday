import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface TaskDetailsProps {
  task: {
    id: string;
    title: string;
    subtitle: string;
    status: string;
    priority: string;
    label: string;
    owner: string;
  };
}
interface TaskDetailsProps {
  task: {
    id: string;
    title: string;
    subtitle: string;
    status: string;
    priority: string;
    label: string;
    owner: string;
  };
}
interface TaskType {
  id: string;
  title: string;
  subtitle: string;
  status: string;
  priority: string;
  label: string;
  owner: string;
}

const TaskDetailsPage = () => {
  const [taskDetails, setTaskDetails] = useState<TaskType | null>(null);
  const [loading, setLoading] = useState(true);
  const { taskId } = useParams();

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

  if (!taskDetails) {
    return <div>Loading...</div>;
  }
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="bg-white p-4 rounded shadow-md w-96 relative z-10">
          <h1 className="text-2xl font-bold mb-4">Task Details</h1>
          {loading ? (
            <p>Loading task details...</p>
          ) : taskDetails ? (
            <>
              <div>
                <strong>Title:</strong> {taskDetails.title}
              </div>
              <div>
                <strong>Subitle:</strong> {taskDetails.subtitle}
              </div>{" "}
              <div>
                <strong>Label:</strong> {taskDetails.label}
              </div>
              <div>
                <strong>Status:</strong> {taskDetails.status}
              </div>
              <div>
                <strong>Priority:</strong> {taskDetails.priority}
              </div>
              <div>
                <strong>Label:</strong> {taskDetails.label}
              </div>
              <div>
                <strong>Owner:</strong> {taskDetails.owner}
              </div>
            </>
          ) : (
            <p>Loading task details...</p>
          )}
          <div className="flex justify-end mt-4"></div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
