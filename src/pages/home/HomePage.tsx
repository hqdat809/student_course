import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="HomePage">
      <li>
        <Link to="/signIn">Login</Link>
      </li>
    </div>
  );
};

export default HomePage;
