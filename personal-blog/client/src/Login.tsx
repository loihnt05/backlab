import { useState } from "react";
import { fetchProtectedData } from "./api";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await fetchProtectedData(username, password);
      setMessage(data.message);
      setError("wow successful sign in ");
      localStorage.setItem("login", "admin")
      navigate('/home')
    } catch {
      setError("wrong password or username");
      setMessage("");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      /><br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br />
      <button onClick={handleLogin}>Login</button>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}