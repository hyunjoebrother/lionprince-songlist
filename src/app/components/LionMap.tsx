import React from "react";

type LionMapProps = {
  lionBg: string;
  handleAreaClick: () => void;
};

const LionMap: React.FC<LionMapProps> = ({ lionBg, handleAreaClick }) => {
  return (
    <div className="relative">
      <img
        src={lionBg}
        alt="Lion Background"
        onClick={handleAreaClick}
        className="w-full h-auto cursor-pointer"
      />
    </div>
  );
};

export default LionMap;
