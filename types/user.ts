export type User = {
  email: string;
  username: string;
  avatar: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
  userName: string;
};

export type AuthRequest = {
  email: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type ServerBoolResponse = {
  success: boolean;
};
