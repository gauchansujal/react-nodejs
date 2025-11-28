// controller/studentController.js

const students = [
  { id: 1, name: "Sujal", age: 18 },
  { id: 2, name: "Ram", age: 19 },
  { id: 3, name: "Hari", age: 12 },
  { id: 4, name: "Bimal", age: 20 },
];

// GET /students?search=su   → returns Sujal
exports.getStudents = (req, res) => {
  try {
    const search = (req.query.search || "").trim().toLowerCase();

    // If no search term, return all
    if (!search) {
      return res.json(students);
    }

    const filtered = students.filter((stu) =>
      stu.name.toLowerCase().includes(search)
    );

    res.status(200).json(filtered);
  } catch (error) {
    // In case something unexpected happens (very rare here, but good habit)
    console.error("Error in getStudents:", error);
    res.status(500).json({ message: "Server error" });
  }
};