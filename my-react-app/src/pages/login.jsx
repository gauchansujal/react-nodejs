import { useState } from "react";
import { Link, useNavigate} from "react-router-dom"; // Import Link from react-router-dom
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("") //for ui feedback

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("") ; // clear previous errors

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }) // ✅ Clean JSON
      })

      const data = await response.json();

      if (response.ok) {
        alert("Login successful!");
        console.log("User:", data.user);
        navigate('/home');
      } else {
        setError(data.message || "Invalid email or password");
      }
    } catch (error) { // ✅ Fixed: 'error' not 'err'
      setError("Network error. Is backend running?");
      console.error("Login error:", error); // ✅ Fixed variable name
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;