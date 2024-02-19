import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Task } from "@/pages/tasks/data/schema";
import axios from "axios";
import { useEffect, useState } from "react";

export function RecentSales() {
  const [recenetTasks, setRecentTasks] = useState<Task[]>([]);
  useEffect(() => {
    const recentTasks = async () => {
      try {
        const { data } = await axios.get("tasks/recentTasks");
        setRecentTasks(data);
        data;
      } catch (error) {
        console.error("Error fetching recent tasks:", error);
      }
    };
    recentTasks();
  }, []);
  console.log(recenetTasks);

  return (
    <div className="space-y-4">
      {recenetTasks.map((task, index) => (
        <div
          key={index}
          className={`flex items-center py-2 px-4 rounded ${
            index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
          }`}
        >
          <div className="flex-grow ml-4">
            <p className="text-sm font-medium leading-none">{task.title}</p>
            <p className="text-sm text-muted-foreground">{task.subtitle}</p>
          </div>
          <div className="ml-auto font-medium">{task.status}</div>
        </div>
      ))}
    </div>
  );
}
