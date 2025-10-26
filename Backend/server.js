const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 5000;

// test user
const user = {
  email: "test@gmail.com",
  password: "123456",
};

app.get("/", (req, res) => {
  res.send("✅ Server is running! Use POST /login to log in.");
});

app.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Missing credentials" });
    }
    if (email === user.email && password === user.password) {
      res.json({ success: true, message: "Login successful ✅" });
    } else {
      res.status(401).json({ success: false, message: "Invalid user ❌" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at: http://localhost:${PORT}`);
});
