import React from "react";

type LionMapProps = {
  lionBg: string;
  areas: number[][];
  handleAreaClick: () => void;
  handleAreaHover: (index: number) => void;
  handleAreaHoverExit: () => void;
};

const LionMap: React.FC<LionMapProps> = ({
  lionBg,
  areas,
  handleAreaClick,
  handleAreaHover,
  handleAreaHoverExit,
}) => {
  return (
    <div className="relative">
      <img
        src={lionBg}
        alt="Lion Background"
        useMap="#lionMap"
        className="w-[auto] h-4/5"
      />
      <map name="lionMap">
        {areas.map((coords, index) => (
          <area
            key={index}
            alt=""
            shape="rect"
            coords={coords.join(",")}
            onClick={handleAreaClick}
            onMouseEnter={() => handleAreaHover(index)}
            onMouseLeave={handleAreaHoverExit}
          />
        ))}
      </map>
    </div>
  );
};

export default LionMap;
