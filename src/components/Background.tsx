import React from "react";

const Background = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/background.png')] bg-cover bg-center"></div>
    </div>
  );
};

export default Background;
