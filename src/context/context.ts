import { createContext } from "react";
import { Todo, User } from "../interface/interface";

export const userLoggedIn = createContext<User | null>(null)
export const TaskContext = createContext<[Todo[], React.Dispatch<React.SetStateAction<Todo[]>>]>([
    [],
    () => { }
]);