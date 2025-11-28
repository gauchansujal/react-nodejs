// pages/home.jsx  (or wherever your file is)

import React, { useState, useEffect, useRef } from "react";

const StudentSearch = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/users/students")
      .then(res => res.json())
      .then(data => setStudents(data))
      .catch(err => console.error(err));
  }, []);

  // Click outside → hide dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = students.filter(student =>
    searchTerm && (
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toString().includes(searchTerm)
    )
  );

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h1>Student Search</h1>

      <div style={{ position: "relative", display: "inline-block", width: "100%", maxWidth: "500px" }} ref={dropdownRef}>
        <input
          type="text"
          placeholder="Search by name or ID..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowDropdown(e.target.value.length > 0);   // only show if typing
          }}
          onFocus={() => searchTerm && setShowDropdown(true)}
          style={{
            width: "100%",
            padding: "16px 20px",
            fontSize: "18px",
            borderRadius: "12px",
            border: "2px solid #333",
            outline: "none",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        />

        {/* DROPDOWN — ONLY SHOWS WHEN searchTerm is not empty */}
        {searchTerm && showDropdown && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              background: "white",
              border: "2px solid #333",
              borderTop: "none",
              borderRadius: "0 0 12px 12px",
              maxHeight: "320px",
              overflowY: "auto",
              zIndex: 10,
              boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
            }}
          >
            {filtered.length > 0 ? (
              filtered.map(student => (
                <div
                  key={student.id}
                  onClick={() => {
                    setSearchTerm(student.name);
                    setShowDropdown(false);
                  }}
                  style={{
                    padding: "16px 20px",
                    textAlign: "left",
                    cursor: "pointer",
                    backgroundColor: "#f8be9fd",
                    margin: "8px 10px",
                    borderRadius: "10px",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = "#68e0ff"}
                  onMouseLeave={(e) => e.target.style.backgroundColor = "#8be9fd"}
                >
                  <strong>ID: {student.id}</strong> → {student.name} (Age: {student.age})
                </div>
              ))
            ) : (
              <div style={{ padding: "20px", color: "#999" }}>
                No student found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentSearch;