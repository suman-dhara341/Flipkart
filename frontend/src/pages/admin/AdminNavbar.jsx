import React, { useEffect, useState } from "react";
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  styled,
  useTheme,
  Box,
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WidgetsIcon from "@mui/icons-material/Widgets";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
import { NavLink, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setOrders, setProducts } from "../../redux/adminSlice";
import { getAdminOrder, getAdminProduct } from "../../actions/api.call";

const drawerWidth = 240;

const items = [
  {
    name: "Dashboard",
    icon: DashboardIcon,
    path: "/admin",
  },
  {
    name: "Orders",
    icon: WidgetsIcon,
    path: "/admin/orders",
  },
  {
    name: "Products",
    icon: Inventory2Icon,
    path: "/admin/products",
  },
  {
    name: "Add Product",
    icon: AddBoxIcon,
    path: "/admin/add-product",
  },
  // {
  //   name: "My Profile",
  //   icon: AccountBoxIcon,
  //   path: "/admin/my-profile",
  // },
  {
    name: "Logout",
    icon: LogoutIcon,
    path: "/logout",
  },
];

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AdminNavbar = () => {
  const [open, setOpen] = React.useState(true);
  const updateProducts = useSelector((state) => state?.admin?.productsUpdate);
  const ordersProducts = useSelector((state) => state?.admin?.ordersUpdate);
  const dispatch = useDispatch();
  const theme = useTheme();
  const userData = useSelector((state) => state?.profile?.auth);

  const handleDrawer = () => {
    setOpen(!open);
  };

  const productApi = async () => {
    const res = await getAdminProduct();
    if (res?.data?.success) {
      dispatch(setProducts(res.data.products));
    } else {
      toast.error(
        res.response?.data?.message || "Something was wrong. Try again."
      );
    }
  };
  useEffect(() => {
    productApi();
  }, [updateProducts]);

  const getAdminOrderController = async () => {
    const { data } = await getAdminOrder();

    if (data.success) {
      dispatch(setOrders(data.adminOrders));
    }
  };
  useEffect(() => {
    getAdminOrderController();
  }, [ordersProducts]);

  return (
    <Box className="flex bg-[#F0EFF0]">
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: open ? drawerWidth : 60,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: open ? drawerWidth : 60,
            top: "4rem",
            transition: theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            overflowX: "hidden",
            background: "#202938",
            padding: "0",
            marginLeft: "0",
          },
        }}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawer}>
            {open ? (
              <div className="flex items-center justify-between gap-1 w-full">
                <div className="bg-[#374153] flex items-center py-4 px-1 rounded-md text-white w-48">
                  <Avatar />
                  <div className="text-xs flex flex-col gap-1 ml-1">
                    <p className="font-semibold line-clamp-1">
                      {userData?.fullName}
                    </p>
                    <p className="w-36 line-clamp-1">{userData?.email}</p>
                  </div>
                </div>
                <div className="flex items-center bg-black rounded-full">
                  <ChevronLeftIcon sx={{ color: "white" }} />
                </div>
              </div>
            ) : (
              <MenuIcon sx={{ color: "white" }} />
            )}
          </IconButton>
        </DrawerHeader>

        <Divider />

        <List>
          {items.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  component={NavLink}
                  to={item.path}
                  sx={{
                    minHeight: 48,
                    px: 2.5,
                    justifyContent: open ? "initial" : "center",
                  }}
                >
                  <NavLink
                    to={item.path}
                    end
                    className={({ isActive }) =>
                      `px-4 ${isActive ? "text-blue-500" : "text-white"}`
                    }
                  >
                    <IconComponent />
                  </NavLink>
                  {open && (
                    <NavLink
                      to={item.path}
                      end
                      className={({ isActive }) =>
                        `mr-4 ${isActive ? "text-blue-500" : "text-white"}`
                      }
                    >
                      {item.name}
                    </NavLink>
                  )}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>

      <Box
        component="main"
        className="flex-grow p-3 transition-transform duration-700 ease-in-out"
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminNavbar;
