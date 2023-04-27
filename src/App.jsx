import { Routes, Route } from "react-router-dom";
import Layout from "./components/layouts/Layout";
import Home from "./components/containers/Home";
import Login from "./components/containers/Login";
import NotFound from "./components/containers/NotFound";
import Users from "./components/containers/Users";
import AuthGuard from "./components/routeGuards/AuthGuard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route element={<AuthGuard />}>
          <Route path="/users" element={<Users />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
