import React, { useState } from "react";

// Css file for styling
import "./Login.css";

export default function Login({ loginUser }) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  // Authenticate User Here / Post to the Server or Hardcode
  const authUser = (event) => {
    event.preventDefault();
    // console.log({ user, password });

    // Hardcode Authentication
    if (user === "admin" && password === "admin123") {
      loginUser(true);
    }
  };

  return (
    <div className="login">
      <h1>Login Here</h1>
      <form className="login__form" onSubmit={authUser}>
        <lable>Email Address / Username</lable>
        <input
          type="text"
          // Getting value from the state & putting it in the HTML
          value={user}
          // Onchange getting value from the HTML & putting it in the state
          onChange={(e) => setUser(e.target.value)}
        />
        <lable>Password</lable>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login__form__button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
