export interface User {
    id: string;
    email: string;
    role: string;
  }
  
  export interface Context {
    user: User | null;
  }
  