import React, { useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Box, Drawer, List } from "@mui/material";

const LeftPage = () => {
  const [open, setOpen] = useState(false);

  const filter = () => {
    return (
      <div>
        <p className="font-semibold text-xl">Filters</p>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold">Order Status</p>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <input id="onTheWay" type="checkbox" />
              <label htmlFor="onTheWay">On the way</label>
            </div>

            <div className="flex gap-2">
              <input id="delivered" type="checkbox" />
              <label htmlFor="delivered">Delivered</label>
            </div>

            <div className="flex gap-2">
              <input id="returned" type="checkbox" />
              <label htmlFor="returned">Returned</label>
            </div>

            <div className="flex gap-2">
              <input id="canceled" type="checkbox" />
              <label htmlFor="canceled">Canceled</label>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="hidden md:block p-4 bg-white rounded-md">{filter()}</div>
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center justify-end md:hidden"
      >
        <FilterListIcon />
        <p>Filter</p>
      </div>
      <Drawer anchor={"bottom"} open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: "bottom" ? "auto" : 250 }} role="presentation">
          <List>
            <div className=" md:hidden p-4 bg-white rounded-md">{filter()}</div>
          </List>
        </Box>
      </Drawer>
    </div>
  );
};

export default LeftPage;
