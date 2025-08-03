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
      localStorage.setItem("login", "admin");
      navigate("/home");
    } catch {
      setError("wrong password or username");
      setMessage("");
    }
  };

  return (
    <div className="border-2 border-black border-solid p-4 rounded-xl flex flex-col items-center gap-3">
      <h1 className="font-bold text-4xl">Sign in</h1>
      <input
        className="text-xl p-2 border-1 border-gray-400"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="text-xl p-2 border-1 border-gray-400"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="font-semibold text-xl cursor-pointer hover:opacity-70" onClick={handleLogin}>Login</button>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
