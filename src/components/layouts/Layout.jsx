import { useNavigate, Link, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Layout = () => {
  const { token, dispatch } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    // API call to /auth/logout
    dispatch({ type: "DELETE" });
    navigate('/login');
  }

  return (
    <>
      <nav>
        <div>
          <Link to="/">Home</Link>
        </div>
        {token ? (
          <>
            <div>
              <Link to="/users">Users</Link>
            </div>
            <div>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </>
        ) : (
          <>
            <div>
              <Link to="/login">Login</Link>
            </div>
          </>
        )}
      </nav>
      <main className="App">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
