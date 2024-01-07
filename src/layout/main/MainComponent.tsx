import React from "react";

const MainComponent = ({ children }: { children: React.ReactNode }) => {
  return <div className="min-h-screen">{children}</div>;
};

export default MainComponent;
