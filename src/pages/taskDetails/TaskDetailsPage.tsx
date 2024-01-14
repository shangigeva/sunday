import axios from "axios";
import { useEffect, useState } from "react";

interface TaskDetailsProps {
  task: {
    id: string;
    title: string;
    status: string;
    priority: string;
    label: string;
  };
  onClose: () => void;
}

interface TaskType {
  id: string;
  title: string;
  status: string;
  priority: string;
  label: string;
  // Add more properties as needed
}

const TaskDetailsPage: React.FC<TaskDetailsProps> = ({ task, onClose }) => {
  const [taskDetails, setTaskDetails] = useState<TaskType | null>(null);

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await axios.get(`/tasks/${task.id}`);
        setTaskDetails(response.data);
      } catch (error) {
        console.error("Error fetching task details:", error);
      }
    };

    if (task) {
      fetchTaskDetails();
    }
  }, [task]);

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="bg-white p-4 rounded shadow-md w-96 relative z-10">
          <h1 className="text-2xl font-bold mb-4">Task Details</h1>
          {taskDetails ? (
            <>
              <div>
                <strong>Title:</strong> {taskDetails.title}
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
              {/* Add more details as needed */}
            </>
          ) : (
            <p>Loading task details...</p>
          )}
          <div className="flex justify-end mt-4">
            <button className="border border-gray-300" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
