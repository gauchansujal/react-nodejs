// pages/home.jsx
import Header from "../components/Header";
import "./home.css";

function Home() {
  return (
    <>
      <Header />
      <div className="homepage">
        <h1>Hello World</h1>
      </div>
      {/* REMOVE <Footer /> FROM HERE! */}
    </>
  );
}

export default Home;