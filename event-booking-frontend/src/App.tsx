import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/auth/signIn";
import SignUp from "./pages/auth/signUp";
import Home from "./pages/home";
import EventPage from "./pages/event";
import RequireAuth from "@auth-kit/react-router/RequireAuth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
      <Route
        path="/home"
        element={
          <RequireAuth fallbackPath={"/"}>
            <Home />
          </RequireAuth>
        }
      />
      <Route
        path="/event/:id"
        element={
          <RequireAuth fallbackPath={"/"}>
            <EventPage />
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default App;
