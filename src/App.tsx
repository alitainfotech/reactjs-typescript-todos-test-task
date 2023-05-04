import { createContext, useContext, useState } from "react";
import {
  Route,
  Router,
  Routes,
  useNavigate,
  useRoutes,
} from "react-router-dom";
import Login from "./pages/login/login";
import Dashboard from "./pages/dashboard/dashboard";
import PrivateRoute from "./components/privateRoute/privateRoute";
import { Todo, User } from "./interface/interface";
import { mockUsers } from "./controller/mockdata";
import { TaskContext, userLoggedIn } from "./context/context";

function App(): JSX.Element {
  const [loggedInUser, setUserData] = useState<User | null>(null);
  const [taskData, setTodoData] = useState<Todo[]>([]);

  const navigate = useNavigate();

  console.log(taskData,'task')

  // Handle user login
  const handleLogin = (email: string, password: string): Object => {
    const authenticatedUser = mockUsers.find(
      (user) => user.email.toLowerCase() === email.toLowerCase() && user.password === password
    );
    if (authenticatedUser) {
      let genToken = setUserToken(authenticatedUser);
      setUserData({ ...authenticatedUser, token: genToken });
      navigate("/");
      return { message: "successfully logged in", token: genToken };
    } else {
      alert("Invalid credential");
      return { message: "invalid credential" };
    }
  };

  const setUserToken = (user: User) => {
    let token: User[] =
      JSON.parse(localStorage.getItem("LOGGED_IN_USERS")!) || [];
    const newToken = crypto.randomUUID();

    const presentTokenIndex = token && token.findIndex((u) => u.id === user.id);
    if (presentTokenIndex !== -1) {
      token[presentTokenIndex].token = newToken;
    } else {
      token.push({ ...user, token: newToken });
    }
    return newToken;
  };

  return (
    <userLoggedIn.Provider value={loggedInUser}>
      <TaskContext.Provider value={[taskData, setTodoData]}>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
        </Routes>
      </TaskContext.Provider>
    </userLoggedIn.Provider>
  );
}

export default App;
