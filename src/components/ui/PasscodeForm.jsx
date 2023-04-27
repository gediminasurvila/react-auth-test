import { useRef, useEffect } from "react";

const PasscodeForm = (p) => {

  const passcodeInputRef = useRef();
  
  useEffect(() => {
    passcodeInputRef.current.focus();
  }, []);

  return (
    <form onSubmit={p.onSubmit}>
      <label htmlFor="passcode">Passcode:</label>
      <div>
        <input
          name="passcode"
          id="passcode"
          placeholder="123456"
          autoComplete="off"
          required
          onChange={p.onChange}
          value={p.value}
          ref={passcodeInputRef}
        />
        <button type="submit">Verify</button>
      </div>
    </form>
  );
};

export default PasscodeForm;