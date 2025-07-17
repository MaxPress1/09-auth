export type User = {
  id: string;
  email: string;
  userName?: string;
  photoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
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
