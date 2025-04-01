import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { getCarousel } from "../../actions/api.call";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CarouselHome = () => {
  const navigate = useNavigate();
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  const [data, setData] = useState([]);
  const getCarouselData = async () => {
    const res = await getCarousel();
    if (res.data.success) {
      setData(res.data.allCarousel);
    }
  };

  const openCarousel = (name) => {
    navigate(`search/${name}`);
  };

  useEffect(() => {
    getCarouselData();
  }, []);
  return (
    <>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={2000}
        showDots={true}
        containerClass="z-[10]"
      >
        {data?.map((item, index) => (
          <div
            key={index}
            className="cursor-pointer"
            onClick={() => openCarousel(item.name)}
          >
            <img src={item.url} alt="" className="h-56" />
          </div>
        ))}
      </Carousel>
    </>
  );
};

export default CarouselHome;
