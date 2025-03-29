import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Login from "./Pages/Login";
import ProtectedRoute from "./auth/ProtectedRoute";
import UserList from "./Pages/UserList";

function App() {
  return (
    <div className="h-screen w-screen bg-white flex justify-center items-center pt-10">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <UserList />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
