import { useRef, useEffect } from "react";

const LoginForm = (p) => {
  const emailInputRef = useRef();
  
  useEffect(() => {
    emailInputRef.current.focus();
  }, []);

  return (
    <form onSubmit={p.onSubmit}>
      <label htmlFor="email">Email:</label>
      <div>
        <input
          name="email"
          id="email"
          type="email"
          placeholder="me@example.com"
          autoComplete="off"
          required
          onChange={p.onChange}
          value={p.value}
          ref={emailInputRef}
        />
        <button type="submit">Login</button>
      </div>
    </form>
  );
};

export default LoginForm;
