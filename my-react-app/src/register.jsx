import { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import "./login.css";

function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTermsChange = (e) => {
    setTermsAccepted(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (!termsAccepted) {
      alert("Please agree to the Terms & Conditions!");
      return;
    }
    // Replace with your API call or registration logic
    console.log("Registration data:", formData);
    setFormData({ fullName: "", email: "", password: "", confirmPassword: "" });
    setTermsAccepted(false);
  };

  return (
    <div className="register-container">
      <h2>Create an Account</h2>
      <p className="subtitle">Join EcoTrade and start recycling smarter.</p>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            placeholder="John Doe"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="you@example.com"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Create a password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            placeholder="Re-enter password"
          />
        </div>
        <div className="form-group terms-group">
          <input
            type="checkbox"
            id="terms"
            name="terms"
            checked={termsAccepted}
            onChange={handleTermsChange}
            required
          />
          <label htmlFor="terms">I agree to the Terms & Conditions</label>
        </div>
        <button type="submit" className="submit-button" disabled={!termsAccepted}>
          Register
        </button>
        <p className="or-text">or</p>
        <button type="button" className="google-button">
          Register with Google
        </button>
      </form>
      <p className="login-link">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Register;