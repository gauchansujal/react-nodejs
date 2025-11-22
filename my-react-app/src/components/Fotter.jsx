// components/Footer.jsx
import "./Fotter.css";  // rename file to Footer.css (not Fotter.css)

function Footer() {
  return (
    <footer className="footer">   {/* Use <footer>, not <div className="box"> */}
      <div className="footer-content">
        <section className="col">
          <h1>EcoTrade</h1>
          <p className="paragraph">
            smart recycling marketplace<br />
            connecting individuals and businesses<br />
            for sustainable material exchange.
          </p>
        </section>

        <section className="col">
          <h3>Quick Links</h3>
          <ul className="list">
            <li>Home</li>
            <li>Marketplace</li>
            <li>Price Trends</li>
            <li>Request Pickup</li>
            <li>Become a Collection</li>
          </ul>
        </section>

        <section className="col">
          <h3>Materials</h3>
          <ul className="list">
            <li>Plastic</li>
            <li>Metal</li>
            <li>Paper</li>
            <li>Glass</li>
            <li>Electronics</li>
          </ul>
        </section>
      </div>
    </footer>
  );
}

export default Footer;