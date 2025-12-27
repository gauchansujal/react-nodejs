// pages/home.jsx
import React, { useState, useEffect, useRef } from "react";
import "./home.css";

const StudentSearch = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Fetch students from API
  useEffect(() => {
    fetch("http://localhost:5000/api/users/students")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => {
        console.error(err);
        setStudents([]); // fallback
      });
  }, []);

  // Hide dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter students by name or ID
  const filtered = students.filter(
    (student) =>
      searchTerm &&
      (student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.id.toString().includes(searchTerm))
  );

  return (
    <div className="header">
      <h1>Student Search</h1>
      <div className="search-container" ref={dropdownRef}>
        <input
          type="text"
          placeholder="Search by name or ID..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowDropdown(e.target.value.length > 0);
          }}
          onFocus={() => searchTerm && setShowDropdown(true)}
          className="search-input"
        />

        {showDropdown && (
          <div className="dropdown">
            {filtered.length > 0 ? (
              filtered.map((student) => (
                <div
                  key={student.id}
                  onClick={() => {
                    setSearchTerm(student.name);
                    setShowDropdown(false);
                  }}
                  className="dropdown-item"
                >
                  <strong>ID: {student.id}</strong> → {student.name} (Age:{" "}
                  {student.age})
                </div>
              ))
            ) : (
              <div className="no-student">No student found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentSearch;
