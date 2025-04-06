"use client";

import React from "react";
import ProfileContext from "./ProfileContext";
import { useProfile } from "./useProfile";

const ProfileProvider = ({ children }: any) => {
  const value = useProfile();
  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};

export default ProfileProvider;
