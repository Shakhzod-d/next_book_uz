"use client";

import React from "react";
import { NavbarBottom, NavbarTop } from "../components";

const Navbar = () => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="container">
      <NavbarTop />
      <NavbarBottom />
    </div>
  );
};

export default Navbar;
