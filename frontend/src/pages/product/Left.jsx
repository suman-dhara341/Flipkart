import React, { useEffect, useState } from "react";
import {
  Collapse,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Slider,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const Left = ({ allCategories }) => {
  const [DrawerSet, setDrawerSet] = useState(false);
  const [open, setOpen] = React.useState(true);
  const [value, setValue] = React.useState([0, 200000]);
  const [review, setReview] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { search } = useParams();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const minPrice = params.get("minPrice") || 0;
    const maxPrice = params.get("maxPrice") || 200000;
    const review = params.getAll("review") || {};

    // const reviewState = {};
    // review.forEach((key) => {
    //   console.log(key);
    //   review({ key: true });
    // });
    // console.log(review);

    setReview((review) => ({ ...review, review }));
    setValue([Number(minPrice), Number(maxPrice)]);
  }, []);

  useEffect(() => {
    const params =
      new URLSearchParams() || new URLSearchParams(location.search);

    params.append("minPrice", value[0]);
    params.append("maxPrice", value[1]);
    Object.keys(review).forEach((key) => {
      if (review[key]) {
        params.append("review", key);
      }
    });

    navigate(`/search/${search}/?${params.toString()}`, { replace: true });
  }, [value, review]);

  const handleClick = () => {
    setOpen(!open);
  };

  function valuetext(value) {
    return `${value}`;
  }
  const handleChangeValue = (event, newValue) => {
    setValue(newValue);
  };

  const handelChange = (e) => {
    setReview((pre) => ({ ...pre, [e.target.name]: e.target.checked }));
  };

  const filter = () => {
    return (
      <div className="bg-white pt-4">
        <p className="text-lg font-semibold border-b px-4 pb-2">Filters</p>
        <div>
          <p className="text-sm font-bold px-4 py-2">Price</p>
          <div className="border-b px-4 py-2">
            <Slider
              min={0}
              // step={1}
              max={200000}
              value={value}
              valueLabelDisplay="auto"
              onChange={handleChangeValue}
              getAriaValueText={valuetext}
            />
            <div className="flex items-center justify-between gap-2">
              <div className="border bg-gray-100 px-4 py-1">
                <input
                  type="text"
                  disabled
                  value={`₹${value[0]}`}
                  className="outline-none w-full"
                />
              </div>
              <p>to</p>
              <div className="border bg-gray-100 px-4 py-1">
                <input
                  type="text"
                  disabled
                  value={`₹${value[1]}`}
                  className="outline-none w-full"
                />
              </div>
            </div>
          </div>
          {/* <List>
            <ListItemButton onClick={handleClick}>
              <ListItemText primary="Customer Ratings" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit className="px-4">
              <div className="cursor-pointer flex items-center gap-2">
                <input
                  type="checkbox"
                  id="rating-4"
                  className="w-4 h-4"
                  name="rating4"
                  onChange={handelChange}
                />
                <label
                  htmlFor="rating-4"
                  className="text-gray-700 cursor-pointer"
                >
                  4★ & above
                </label>
              </div>
              <div className="cursor-pointer flex items-center gap-2">
                <input
                  type="checkbox"
                  id="rating-3"
                  className="w-4 h-4"
                  name="rating3"
                  onClick={handelChange}
                />
                <label
                  htmlFor="rating-3"
                  className="text-gray-700 cursor-pointer"
                >
                  3★ & above
                </label>
              </div>
              <div className="cursor-pointer flex items-center gap-2">
                <input
                  type="checkbox"
                  id="rating-2"
                  className="w-4 h-4"
                  name="rating2"
                  onClick={handelChange}
                />
                <label
                  htmlFor="rating-2"
                  className="text-gray-700 cursor-pointer"
                >
                  2★ & above
                </label>
              </div>
              <div className="cursor-pointer flex items-center gap-2">
                <input
                  type="checkbox"
                  id="rating-1"
                  className="w-4 h-4"
                  name="rating1"
                  onClick={handelChange}
                />
                <label
                  htmlFor="rating-1"
                  className="text-gray-700 cursor-pointer"
                >
                  1★ & above
                </label>
              </div>
            </Collapse>
          </List>

          <List>
            <ListItemButton onClick={handleClick}>
              <ListItemText primary="Category" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit className="px-4">
              {allCategories?.map((item, index) => (
                <div
                  key={index}
                  className="cursor-pointer flex items-center gap-2"
                >
                  <input
                    type="checkbox"
                    id="rating-4"
                    className="w-4 h-4"
                    name="rating4"
                    onChange={handelChange}
                  />
                  <label
                    htmlFor="rating-4"
                    className="text-gray-700 cursor-pointer"
                  >
                    {item}
                  </label>
                </div>
              ))}
            </Collapse>
          </List> */}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="hidden md:block">{filter()}</div>
      <div className="p-4">
        <div
          onClick={() => setDrawerSet(!DrawerSet)}
          className="flex items-center justify-end md:hidden"
        >
          <FilterListIcon />
          <p>Filter</p>
        </div>
        <Drawer
          anchor={"bottom"}
          open={DrawerSet}
          onClose={() => setDrawerSet(false)}
        >
          <div>{filter()}</div>
        </Drawer>
      </div>
    </div>
  );
};

export default Left;
