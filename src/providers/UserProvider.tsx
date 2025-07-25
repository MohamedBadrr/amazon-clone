import { useState, type ReactNode } from "react";
import { UserContext, type User } from "../context/userUser";

type UserProviderProps = {
  children: ReactNode;
};

const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  return <UserContext value={{ user, setUser }}>{children}</UserContext>;
};

export default UserProvider;
