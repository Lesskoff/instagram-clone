import React from "react";
import "./Header.css";
import Login from "./Login";
import Logo from "./Logo";

function Header({ user, setUser }) {
  return (
    <div className="header">
      <div className="header__content">
        <Logo />
        <Login user={user} setUser={setUser} />
      </div>
    </div>
  );
}

export default Header;
