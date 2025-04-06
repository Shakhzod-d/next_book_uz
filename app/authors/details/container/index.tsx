import React from "react";
import { scrollToDefault } from "@/utils/scrollToDefault/scrollToDefault";
import { AuthorBooks, AuthorInfo } from "../components";

const Index = () => {
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

export default Index;
