import React from "react";
import { scrollToDefault } from "@/utils/scrollToDefault/scrollToDefault";
import { AuthorBooks, AuthorInfo } from "../components";

const AuthorDetailsPage = () => {
  React.useEffect(() => {
    scrollToDefault();
  }, []);
  return (
    <div className="container">
      <AuthorInfo />
      <AuthorBooks />
    </div>
  );
};

export default AuthorDetailsPage;
