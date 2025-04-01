import React from "react";

const HeroTop = ({ card }) => {
  return (
    <div className="grid grid-cols-10 gap-6">
      {card?.map((item, index) => (
        <div key={index}>
          <img src={item.img} alt={item.name} className="h-16" />
          <p className="text-sm font-semibold line-clamp-2">{item.name}</p>
        </div>
      ))}
    </div>
  );
};

export default HeroTop;
