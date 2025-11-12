import React from 'react';
import Header from "../components/Header"; // ✅ capital H

function Home() {
  return (
    <div>
      <Header /> {/* 👈 your header component */}
      <h1>Hello World</h1>
    </div>
  );
}

export default Home;
