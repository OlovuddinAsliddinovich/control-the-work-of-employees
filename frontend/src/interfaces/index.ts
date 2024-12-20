export interface LoadingState {
  isLoading: boolean;
  setIsLoading: () => void;
}

export interface UserType {
  _id?: string;
  id?: string;
  firstname?: string;
  lastname?: string;
  email: string;
  password: string;
  level?: string;
  image?: string | File;
  createdAt?: string;
  updatedAt?: string;
}

export interface AdminType {
  username?: string;
  password?: string;
  role?: string;
}
