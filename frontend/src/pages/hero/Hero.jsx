import React, { useEffect, useState } from "react";
import HeroTop from "./HeroTop";
import CarouselHome from "./CarouselHome";
import Box1 from "./Box1";
import Box2 from "./Box2";
import Box3 from "./Box3";
import { allProducts } from "../../actions/api.call";

const card = [
  {
    img: "https://rukminim2.flixcart.com/fk-p-flap/96/96/image/6a99be02898b225d.jpg?q=100",
    name: "Top offers",
  },
  {
    img: "https://rukminim2.flixcart.com/fk-p-flap/96/96/image/6a99be02898b225d.jpg?q=100",
    name: "Mobiles & Tablets",
  },
  {
    img: "https://rukminim2.flixcart.com/fk-p-flap/96/96/image/6a99be02898b225d.jpg?q=100",
    name: "Top offers",
  },
  {
    img: "https://rukminim2.flixcart.com/fk-p-flap/96/96/image/6a99be02898b225d.jpg?q=100",
    name: "Top offers",
  },
  {
    img: "https://rukminim2.flixcart.com/fk-p-flap/96/96/image/6a99be02898b225d.jpg?q=100",
    name: "Top offers",
  },
  {
    img: "https://rukminim2.flixcart.com/fk-p-flap/96/96/image/6a99be02898b225d.jpg?q=100",
    name: "Top offers",
  },
  {
    img: "https://rukminim2.flixcart.com/fk-p-flap/96/96/image/6a99be02898b225d.jpg?q=100",
    name: "Top offers",
  },
  {
    img: "https://rukminim2.flixcart.com/fk-p-flap/96/96/image/6a99be02898b225d.jpg?q=100",
    name: "Top offers",
  },
  {
    img: "https://rukminim2.flixcart.com/fk-p-flap/96/96/image/6a99be02898b225d.jpg?q=100",
    name: "Top offers",
  },
  {
    img: "https://rukminim2.flixcart.com/fk-p-flap/96/96/image/6a99be02898b225d.jpg?q=100",
    name: "Top offers",
  },
];

const box1 = {
  boxName: "Top Offers",
  item: [
    {
      img: "http://res.cloudinary.com/dmfj2lkcn/image/upload/v1741505489/pag5fmcutnedn8foh4av.webp",
      name: "Laptop",
      discount: "60-70% off",
    },
    {
      img: "http://res.cloudinary.com/dmfj2lkcn/image/upload/v1742128491/pg9xa1vizo2jqfdaieof.webp",
      name: "Mobile",
      discount: "50-70% off",
    },
    {
      img: "http://res.cloudinary.com/dmfj2lkcn/image/upload/v1741503085/iygsj7nsprjxdjdbo38p.webp",
      name: "Men's Shirts",
      discount: "90-99% off",
    },
    {
      img: "http://res.cloudinary.com/dmfj2lkcn/image/upload/v1741503510/rmjvzewr4t49l0tuscgk.webp",
      name: "Men's T Shirts",
      discount: "80-90% off",
    },
    {
      img: "http://res.cloudinary.com/dmfj2lkcn/image/upload/v1741599906/krcxqza23caa1ltlgazl.webp",
      name: "Sofa",
      discount: "40-50% off",
    },
    {
      img: "http://res.cloudinary.com/dmfj2lkcn/image/upload/v1741585491/sfpxuys7mbrmwsnosqon.webp",
      name: "Soundbar",
      discount: "50-70% off",
    },
    {
      img: "http://res.cloudinary.com/dmfj2lkcn/image/upload/v1741604800/quvvhxknrzpdkwcenhre.webp",
      name: "Women's T-shirts",
      discount: "60-70% off",
    },
  ],
};

const box2 = [
  {
    boxName: "Top deals",
    item: [
      {
        img: "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/d/j/d/xxl-ts58-vebnor-original-imah4jvvnywphcsf.jpeg?q=70",
        name: "Top Offers",
        discount: "60-70% off",
      },
      {
        img: "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/d/j/d/xxl-ts58-vebnor-original-imah4jvvnywphcsf.jpeg?q=70",
        name: "Top Offers",
        discount: "60-70% off",
      },
      {
        img: "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/d/j/d/xxl-ts58-vebnor-original-imah4jvvnywphcsf.jpeg?q=70",
        name: "Top Offers",
        discount: "60-70% off",
      },
      {
        img: "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/d/j/d/xxl-ts58-vebnor-original-imah4jvvnywphcsf.jpeg?q=70",
        name: "Top Offers",
        discount: "60-70% off",
      },
    ],
  },
  {
    boxName: "Top deals",
    item: [
      {
        img: "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/d/j/d/xxl-ts58-vebnor-original-imah4jvvnywphcsf.jpeg?q=70",
        name: "Top Offers",
        discount: "60-70% off",
      },
      {
        img: "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/d/j/d/xxl-ts58-vebnor-original-imah4jvvnywphcsf.jpeg?q=70",
        name: "Top Offers",
        discount: "60-70% off",
      },
      {
        img: "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/d/j/d/xxl-ts58-vebnor-original-imah4jvvnywphcsf.jpeg?q=70",
        name: "Top Offers",
        discount: "60-70% off",
      },
      {
        img: "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/d/j/d/xxl-ts58-vebnor-original-imah4jvvnywphcsf.jpeg?q=70",
        name: "Top Offers",
        discount: "60-70% off",
      },
    ],
  },
  {
    boxName: "Top deals",
    item: [
      {
        img: "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/d/j/d/xxl-ts58-vebnor-original-imah4jvvnywphcsf.jpeg?q=70",
        name: "Top Offers",
        discount: "60-70% off",
      },
      {
        img: "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/d/j/d/xxl-ts58-vebnor-original-imah4jvvnywphcsf.jpeg?q=70",
        name: "Top Offers",
        discount: "60-70% off",
      },
      {
        img: "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/d/j/d/xxl-ts58-vebnor-original-imah4jvvnywphcsf.jpeg?q=70",
        name: "Top Offers",
        discount: "60-70% off",
      },
      {
        img: "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/d/j/d/xxl-ts58-vebnor-original-imah4jvvnywphcsf.jpeg?q=70",
        name: "Top Offers",
        discount: "60-70% off",
      },
    ],
  },
];

const box3 = [
  {
    img: "http://res.cloudinary.com/dmfj2lkcn/image/upload/v1741604962/csyvql8wxozocq3nearo.webp",
    name: "Women's T-shirts",
    discount: "30-70% off",
  },
  {
    img: "http://res.cloudinary.com/dmfj2lkcn/image/upload/v1741503717/bojwophxcl1omknryi42.webp",
    name: "Men's T Shirts",
    discount: "60-70% off",
  },
  {
    img: "http://res.cloudinary.com/dmfj2lkcn/image/upload/v1741504700/fufeilunbiscl29lajxj.webp",
    name: "Men's Shirts",
    discount: "30-70% off",
  },
  {
    img: "http://res.cloudinary.com/dmfj2lkcn/image/upload/v1741585491/sfpxuys7mbrmwsnosqon.webp",
    name: "Soundbar",
    discount: "60-70% off",
  },
  {
    img: "http://res.cloudinary.com/dmfj2lkcn/image/upload/v1741600411/aq568r5hxszhpoflv5dp.webp",
    name: "Sofa",
    discount: "60-70% off",
  },
  {
    img: "http://res.cloudinary.com/dmfj2lkcn/image/upload/v1741524093/sbnyuhu1ojfyqutbmtjc.webp",
    name: "Laptop",
    discount: "60-70% off",
  },
];

const box4 = {
  boxName: "Recently Viewed",
  item: [
    {
      img: "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/d/j/d/xxl-ts58-vebnor-original-imah4jvvnywphcsf.jpeg?q=70",
      name: "Top Offers",
      discount: "60-70% off",
    },
    {
      img: "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/d/j/d/xxl-ts58-vebnor-original-imah4jvvnywphcsf.jpeg?q=70",
      name: "Top Offers",
      discount: "60-70% off",
    },
    {
      img: "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/d/j/d/xxl-ts58-vebnor-original-imah4jvvnywphcsf.jpeg?q=70",
      name: "Top Offers",
      discount: "60-70% off",
    },
    {
      img: "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/d/j/d/xxl-ts58-vebnor-original-imah4jvvnywphcsf.jpeg?q=70",
      name: "Top Offers",
      discount: "60-70% off",
    },
    {
      img: "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/d/j/d/xxl-ts58-vebnor-original-imah4jvvnywphcsf.jpeg?q=70",
      name: "Top Offers",
      discount: "60-70% off",
    },
    {
      img: "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/d/j/d/xxl-ts58-vebnor-original-imah4jvvnywphcsf.jpeg?q=70",
      name: "Top Offers",
      discount: "60-70% off",
    },
    {
      img: "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/d/j/d/xxl-ts58-vebnor-original-imah4jvvnywphcsf.jpeg?q=70",
      name: "Top Offers",
      discount: "60-70% off",
    },
    {
      img: "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/d/j/d/xxl-ts58-vebnor-original-imah4jvvnywphcsf.jpeg?q=70",
      name: "Top Offers",
      discount: "60-70% off",
    },
    {
      img: "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/d/j/d/xxl-ts58-vebnor-original-imah4jvvnywphcsf.jpeg?q=70",
      name: "Top Offers",
      discount: "60-70% off",
    },
  ],
};

const Hero = () => {
  const [page, setPage] = useState(3);

  const getProducts = async () => {
    const res = await allProducts({ page });
  };

  useEffect(() => {
    getProducts();
  }, [page]);
  return (
    <div className="mx-4 pb-5">
      <div className="bg-white my-2 px-6 py-4 shadow-lg hidden md:block">
        <HeroTop card={card} />
      </div>

      <div className="bg-white shadow-lg">
        <CarouselHome />
      </div>

      <div className="bg-white my-2 px-6 py-4 shadow-lg">
        <Box1 item={box1} />
      </div>

      {/* <div>
        <Box2 box2={box2} />
      </div> */}

      <div className="bg-white my-2  py-4 shadow-lg">
        <Box3 box3={box3} />
      </div>

      <div className="bg-white my-2 px-6 py-4 shadow-lg">
        <Box1 item={box4} />
      </div>
    </div>
  );
};

export default Hero;
