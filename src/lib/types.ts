export type TaskInput = {
  title: string;
  subtitle: string;
  status: string;
  priority: string;
  label: string;
  owner: string;
  taskId?: string;
  project: string;
};

export type TaskType = {
  id: string;
  title: string;
  status: string;
  label: string;
  priority: string;
  project: string;
};
