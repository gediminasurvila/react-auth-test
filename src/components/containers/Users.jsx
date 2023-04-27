import useUserList from "../../hooks/useUserList";
import { useNavigate, useLocation } from "react-router-dom";

const Users = () => {
  const { users, isLoading, error } = useUserList();
  const navigate = useNavigate();
  const location = useLocation();

  if (error) {
    navigate("/login", { state: { from: location }, replace: true });
  }

  return (
    <>
      <h1>Users</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {users?.length ? (
            users.map((user) => <div key={user.email}>{user.email}</div>)
          ) : (
            <p>No content.</p>
          )}
        </div>
      )}
    </>
  );
};

export default Users;
