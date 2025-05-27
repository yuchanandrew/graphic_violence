import React, { useState } from "react";

const Top = () => {
  const [isBlue, setIsBlue] = useState(true);

  const handleMouseOver = () => {
    console.log("mouse hover");
    setIsBlue(false);
  };

  const handleMouseLeave = () => {
    console.log("mouse leave");
    setIsBlue(true);
  };

  return (
    <div className="top-0 flex flex-col translate-x-10 -translate-y-10 items-center justify-center">
      {isBlue ? (
        <img
          src="LOGOBLUE.png"
          onMouseOver={handleMouseOver}
          alt="blue logo"
          className="top-0 flex flex-col translate-x-10 -translate-y-10 items-center justify-center"
        />
      ) : (
        <img
          src="LOGORED.png"
          onMouseLeave={handleMouseLeave}
          alt="red logo"
          className="top-0 flex flex-col translate-x-10 -translate-y-10 items-center justify-center"
        />
      )}
    </div>
  );
};

export default Top;
