import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from "./Card/Card";
import { useNavigate } from "react-router-dom";

const Box1 = ({ item }) => {
  const navigate = useNavigate();
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3.5,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  const openItem = (name) => {
    navigate(`search/${name}`);
  };

  return (
    <div className="py-1">
      <div className="flex items-center justify-between cursor-pointer">
        <h1 className="font-semibold text-xl">{item.boxName}</h1>
        <NavigateNextIcon fontSize={"large"} />
      </div>
      <div className="py-4 ">
        <Carousel
          responsive={responsive}
          slidesToSlide={4}
          containerClass="z-[10]"
        >
          {item?.item.map((item, index) => (
            <div
              key={index}
              className="p-2 border mx-2 cursor-pointer"
              onClick={() => openItem(item?.name)}
            >
              <Card item={item} />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Box1;
