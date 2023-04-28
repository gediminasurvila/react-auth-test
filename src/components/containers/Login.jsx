import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import LoginForm from "../ui/LoginForm";
import PasscodeForm from "../ui/PasscodeForm";
import axios from "../../api/axios";

const Login = () => {
  const { dispatch } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [passcode, setPasscode] = useState("");
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(true);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/passcode", { email });
    } catch (err) {
      console.warn(err);
    }
    setIsLoginFormVisible(false);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasscodeSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/auth/login",
        {
          email,
          passcode,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.accessToken;
      dispatch({ type: "SET", payload: accessToken });
      setEmail("");
      setPasscode("");
      navigate(from, { replace: true });
    } catch (err) {
      console.warn(err);
    }
  };

  const handlePasscodeChange = (e) => {
    setPasscode(e.target.value);
  };

  return (
    <>
      <h1>Login</h1>
      {isLoginFormVisible ? (
        <LoginForm
          onSubmit={handleEmailSubmit}
          onChange={handleEmailChange}
          value={email}
        />
      ) : (
        <PasscodeForm
          onSubmit={handlePasscodeSubmit}
          onChange={handlePasscodeChange}
          value={passcode}
        />
      )}
    </>
  );
};

export default Login;
