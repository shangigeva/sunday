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
  subtitle: string;
  status: string;
  label: string;
  priority: string;
  project: string;
  owner: string;
  createTime: string;
};
export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  isAdmin: boolean;
  profilePicture?: string;
};
export type EditTasks = {
  isModalOpen: boolean;
  closeModal: () => void;
  editTask: TaskInput;
  setEditTask: React.Dispatch<React.SetStateAction<TaskInput>>;
  taskId: string;
};
export type EditUsers = {
  isModalOpen: boolean;
  closeModal: () => void;
  editUser: User;
  setEditUser: React.Dispatch<React.SetStateAction<User>>;
  userId: string;
};
export type IJWTPayload = {
  _id: string;
  email: string;
  isAdmin: boolean;
};
export type Link = {
  to: string;
  children: string;
};
export type IUser = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  isAdmin?: boolean;
  createdAt?: Date;
  _id?: string;
  failedLoginAttempts: number;
  lastFailedLogin: Date;
};
export type CreateTasks = {
  isModalOpen: boolean;
  closeModal: () => void;
  newTask: TaskInput;
  setNewTask: React.Dispatch<React.SetStateAction<TaskInput>>;
};

export type UserRegister = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
};
