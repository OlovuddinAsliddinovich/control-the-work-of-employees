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
