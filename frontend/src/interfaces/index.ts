export interface EmployeeType {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };

  phone: string;
  website: string;
  compnay: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface LoadingState {
  isLoading: boolean;
  setIsLoading: () => void;
}

export interface UserType {
  firstname?: string;
  lastname?: string;
  email: string;
  password: string;
  level?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}
