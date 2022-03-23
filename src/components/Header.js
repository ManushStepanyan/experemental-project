import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="header">
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Home
        </Link>
        <Link to="/Flows" style={{ color: "white", textDecoration: "none" }}>
          Flows
        </Link>
      </div>
    </>
  );
};

export default Header;
