import React from "react";
import Sidebar from "../components/Sidebar";

const BaseLayout = (props) => {
  return (
    <div className="w-full min-h-screen flex">
      <Sidebar />
      <div className="layout-child">{props.children}</div>
    </div>
  );
};

export default BaseLayout;
