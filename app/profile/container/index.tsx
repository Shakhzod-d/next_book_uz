"use client";

import React from "react";
import ProfileProvider from "../context/ProfileProvider";
import Profile from "./Profile";

const index = () => {
  return (
    <ProfileProvider>
      <Profile />
    </ProfileProvider>
  );
};

export default index;
