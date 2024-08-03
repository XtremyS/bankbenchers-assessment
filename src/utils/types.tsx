export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  phone: string;
}

export interface TypeMessage {
  type: string | null;
  message: string | null;
}
