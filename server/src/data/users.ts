export type Role = "USER" | "ADMIN";

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
};

export const users: User[] = [
  {
    id: 1,
    name: "John User",
    email: "user@abcinsurance.com",
    password: "user123",
    role: "USER",
  },
  {
    id: 2,
    name: "Sarah Admin",
    email: "admin@abcinsurance.com",
    password: "admin123",
    role: "ADMIN",
  },
];