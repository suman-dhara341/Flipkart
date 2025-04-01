import React, { useState } from "react";
import PropTypes from "prop-types";
import { Badge, Drawer, Menu } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DoorBackIcon from "@mui/icons-material/DoorBack";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import WidgetsIcon from "@mui/icons-material/Widgets";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import LoginIcon from "@mui/icons-material/Login";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/api.call";
import toast from "react-hot-toast";
import { auth } from "../redux/authSlice";

const Navbar = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const { search } = useParams();
  const [input, setInput] = useState("" || search);

  const isUser = localStorage.getItem("Id");
  const cartItem = useSelector((state) => state?.cart?.cartItems);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  const onClick = (event) => {
    setOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const drawer = (
    <div className="h-full bg-[#FFFFFF] w-60">
      <div className="bg-[#0F6BD5] p-4 text-white text-sm">
        Flipkart Customer
      </div>
    </div>
  );

  const searchHandle = (e) => {
    e.preventDefault();
    if (input) {
      navigate(`search/${input}`);
    }
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  // api call
  const logoutApi = () => {
    navigate("/logout");
  };

  return (
    <div className="relative ">
      <div className="h-16 bg-white shadow-md flex gap-4 px-4 fixed top-0 z-50 w-full">
        <div className="flex items-center h-full">
          <div onClick={handleDrawerToggle} className="sm:hidden">
            <MenuIcon />
          </div>
          <NavLink to={"/"} className="h-10 w-32">
            <img
              src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/fkheaderlogo_plus-055f80.svg"
              alt="icon"
              className="h-full w-full"
            />
          </NavLink>
        </div>
        <div className="flex items-center justify-between w-full gap-4 md:gap-0">
          <form
            onSubmit={searchHandle}
            className="bg-[#F0F5FF] p-2 rounded-2xl xl:w-[34rem] h-10 flex gap-2"
          >
            <SearchIcon />
            <input
              type="text"
              onChange={(e) => setInput(e.target.value)}
              value={input}
              className="h-full w-full outline-none bg-[#F0F5FF]"
            />
          </form>
          <div
            className="flex gap-2 items-center"
            onMouseEnter={(event) => onClick(event)}
            onMouseLeave={() => handleClose()}
          >
            {isUser ? (
              <>
                <PersonIcon />
                <p className="hidden md:block">Flipkart</p>
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                <Menu
                  sx={{ marginTop: "10px" }}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                >
                  <div className="px-4 py-1 flex flex-col gap-3">
                    <NavLink
                      to={"account"}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <PersonIcon />
                      <p>My Profile</p>
                    </NavLink>
                    <NavLink
                      to={"orders"}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <WidgetsIcon />
                      <p>Order</p>
                    </NavLink>
                    <NavLink
                      to={"account/wishlist"}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <FavoriteIcon />
                      <p>Wishlist</p>
                    </NavLink>
                    <button
                      onClick={logoutApi}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <ArrowCircleRightIcon />
                      <p>Logout</p>
                    </button>
                  </div>
                </Menu>
              </>
            ) : (
              <NavLink to={"login"} className="flex gap-2">
                <LoginIcon />
                <p>Login</p>
              </NavLink>
            )}
          </div>
          {isUser ? (
            <NavLink to={"viewcart"} className="flex gap-2">
              <Badge badgeContent={cartItem.length} color="error">
                <ShoppingCartIcon color="action" />
              </Badge>
              <p className="hidden md:block">Cart</p>
            </NavLink>
          ) : (
            ""
          )}

          <div className="hidden md:block md:flex gap-4 ">
            <DoorBackIcon />
            <p>Become a Seller</p>
          </div>
          <div className="hidden md:block">
            <MoreVertIcon />
          </div>
        </div>
      </div>

      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
        >
          {drawer}
        </Drawer>
      </nav>
    </div>
  );
};

Navbar.propTypes = {
  window: PropTypes.func,
};

export default Navbar;
