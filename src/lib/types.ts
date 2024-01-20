export type TaskInput = {
  title: string;
  subtitle: string;
  status: string;
  priority: string;
  label: string;
  owner: string;
  taskId?: string;
};

export type TaskType = {
  id: string;
  title: string;
  status: string;
  label: string;
  priority: string;
};
