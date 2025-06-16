import { useState } from "react";

const Top = () => {
  const [isBlue, setIsBlue] = useState(true);

  const handleMouseOver = () => {
    console.log("mouse hover");
    setIsBlue(false);
  };

  const handleMouseOut = () => {
    console.log("mouse out");
    setIsBlue(true);
  };

  const handleClick = () => {
    setIsBlue(!isBlue);
  };

  return (
    <div className="top-0 flex flex-col translate-x-16 -translate-y-0 items-center justify-center overflow-hidden">
      <img
        src={isBlue ? "/LOGOBLUE.svg" : "LOGORED.svg"}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onClick={handleClick}
        alt="logo"
        className="transition-all transform object-contain hover:scale-105 hover:-translate-y-1"
      />
    </div>
  );
};

export default Top;
