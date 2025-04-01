import api from "../services/axios";

export const allProducts = (getQueryParamsURL) => {
  const { search = "", page, minPrice, maxPrice } = getQueryParamsURL;

  // let limit = 40;
  let category = "";

  return api
    .get(
      `/product/products?page=${page}&search=${search}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}`
    )
    .then((response) => response)
    .catch((err) => err?.response);
};

export const oneProductGet = (id) => {
  return api
    .get(`product/product/${id}`)
    .then((response) => response)
    .catch((err) => err);
};

// admin
export const productCreate = (payload) => {
  return api
    .post("/product/product-create", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((response) => response)
    .catch((err) => err);
};

export const getAdminProduct = () => {
  return api
    .get("/product/getAdminProduct")
    .then((response) => response)
    .catch((err) => err);
};

export const deleteAdminProduct = (id) => {
  return api
    .delete(`/product/delete/${id}`)
    .then((response) => response)
    .catch((err) => err);
};

export const deleteAdminProductImg = ({ productId, imgId }) => {
  return api
    .delete(`/product/delete/product-img/${productId}/${imgId}`)
    .then((response) => response)
    .catch((err) => err);
};

export const addOneProductImg = (payload) => {
  return api
    .put("/product/add-one/product-img", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((response) => response)
    .catch((err) => err);
};

export const productDataUpdate = ({ payload, productId }) => {
  console.log(payload);

  return api
    .put(`/product/product-update/${productId}`, payload)
    .then((response) => response)
    .catch((err) => err);
};

// login
export const OTP = (payload) => {
  return api
    .post("/auth/otp", payload)
    .then((response) => response)
    .catch((err) => err);
};

export const signUp = (payload) => {
  return api
    .post("/auth/register", payload)
    .then((response) => response)
    .catch((err) => err);
};

export const login = (payload) => {
  return api
    .post("/auth/login", payload)
    .then((response) => response)
    .catch((err) => err);
};

export const logout = () => {
  return api
    .get("/auth/logout")
    .then((response) => response)
    .catch((err) => err);
};

export const getProfile = () => {
  return api
    .get("/auth/profile")
    .then((response) => response)
    .catch((err) => err);
};

export const updateProfile = (payload) => {
  return api
    .put("/auth/profile-update", payload)
    .then((response) => response)
    .catch((err) => err);
};

export const addAddress = (payload) => {
  return api
    .post("/auth/address", payload)
    .then((response) => response)
    .catch((err) => err);
};

export const getAddress = () => {
  return api
    .get("/auth/address")
    .then((response) => response)
    .catch((err) => err);
};

export const deleteAddress = (id) => {
  return api
    .delete(`/auth/delete-address/${id}`)
    .then((response) => response)
    .catch((err) => err);
};

// cart page.

export const createCart = (payload) => {
  return api
    .post(`/order/create-cart-item/${payload}`)
    .then((response) => response)
    .catch((err) => err);
};

export const oneCartDelete = (payload) => {
  return api
    .delete(`/order/create-cart-item/${payload}`)
    .then((response) => response)
    .catch((err) => err);
};

export const getCartItem = () => {
  return api
    .get("/order/get-cart-item")
    .then((response) => response)
    .catch((err) => err);
};

// wishlist

export const wishList = (id) => {
  return api
    .post(`/auth/wishlist/${id}`)
    .then((response) => response)
    .catch((err) => err);
};

export const getWishList = () => {
  return api
    .get("auth/wishlist")
    .then((response) => response)
    .catch((err) => err);
};

export const createOrder = (payload) => {
  return api
    .post("payment/create-order", payload)
    .then((response) => response)
    .catch((err) => err);
};

export const verifyOrder = (payload) => {
  return api
    .post("payment/verify-payment", payload)
    .then((response) => response)
    .catch((err) => err);
};

export const getOrders = () => {
  return api
    .get("payment/get-order")
    .then((response) => response)
    .catch((err) => err);
};

export const getOrdersDetails = ({ orderId, productId }) => {
  return api
    .get(`payment/get-order/${orderId}/${productId}`)
    .then((response) => response)
    .catch((err) => err);
};

export const orderCancel = ({ orderId, productId }) => {
  return api
    .get(`payment/cancel-order/${orderId}/${productId}`)
    .then((response) => response)
    .catch((err) => err);
};

export const getAdminOrder = () => {
  return api
    .get("payment/get-admin-order")
    .then((response) => response)
    .catch((err) => err);
};

export const getStatusUpdate = (payload) => {
  return api
    .get(
      `payment/admin-status-update?orderId=${payload.orderId}&value=${payload.value}`,
      payload
    )
    .then((response) => response)
    .catch((err) => err);
};

// hero section
export const getCarousel = () => {
  return api
    .get("/hero/get-carousel")
    .then((response) => response)
    .catch((err) => err);
};
