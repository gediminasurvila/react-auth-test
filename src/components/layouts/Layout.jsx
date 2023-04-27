import { useNavigate, Link, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Layout = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    // API call to /auth/logout
    setAuth({});
    navigate('/login');
  }

  return (
    <>
      <nav>
        <div>
          <Link to="/">Home</Link>
        </div>
        {auth?.email ? (
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
