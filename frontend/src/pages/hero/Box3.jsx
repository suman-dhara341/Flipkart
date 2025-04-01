import React from "react";
import { useNavigate } from "react-router-dom";

const Box3 = ({ box3 }) => {
    const navigate = useNavigate();
  
  const openItem = (name) => {
    navigate(`search/${name}`);
  };
  return (
    <div className="grid md:grid-cols-3 gap-2">
      {box3.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between py-4 px-4 bg-[#B8D4B4] rounded-md"
          onClick={() => openItem(item?.name)}
        >
          <div>
            <p className="text-xl font-semibold">{item.name}</p>
            <p>{item.discount}</p>
          </div>
          <img src={item.img} alt="" className="h-40" />
        </div>
      ))}
    </div>
  );
};

export default Box3;
