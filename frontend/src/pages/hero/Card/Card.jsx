import React from "react";

const Card = ({ item }) => {

  return (
    <div>
      <div className="group overflow-hidden md:w-48 h-44">
        <img
          src={item.img}
          alt=""
          className="transition-transform duration-300 ease-in-out  group-hover:scale-110 h-full w-full "
        />
      </div>

      <p className="line-clamp-1 text-gray-800">{item.name}</p>
      <p className="font-semibold">{item.discount}</p>
    </div>
  );
};

export default Card;
