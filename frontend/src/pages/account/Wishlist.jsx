import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { wishList } from "../../actions/api.call";
import toast from "react-hot-toast";
import { setWishlist } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const wishlists = useSelector((state) => state?.profile?.wishlist) || [];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteWishlist = async (id) => {
    if (window.confirm("Are you sure you want to delete")) {
      const res = await wishList(id);
      if (res?.data?.success) {
        toast.success(res.data.message);
        dispatch(setWishlist(res.data.wishlist?.productId));
      } else {
        toast.error(
          res.response?.data?.message || "Something was wrong. Try again."
        );
      }
    }
  };

  const viewProduct = (id) => {
    navigate(`/product_details/${id}`);
  };
  return (
    <>
      {wishlists.length > 0 ? (
        wishlists?.map((item) => (
          <div
            key={item?._id}
            className="grid grid-cols-6 gap-4 p-4 bg-white rounded-md m-2 cursor-pointer"
          >
            <div
              onClick={() => viewProduct(item?._id)}
              className="col-span-5 flex items-center gap-2"
            >
              <img
                src={item.images[0]?.url}
                alt={item.images[0]?.url}
                className="h-24 w-20"
              />
              <div>
                <p className="line-clamp-1 text-sm font-semibold">
                  {item?.name}
                </p>
                <p className="text-sm line-clamp-1">{item?.description}</p>
                <div className="flex items-center gap-3">
                  <p className="text-xl font-semibold">₹{item?.finalPrice}</p>
                  <p className="line-through text-sm ">₹{item?.price}</p>
                  <p className="text-sm">{item?.discount}% off</p>
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <p
                onClick={() => deleteWishlist(item._id)}
                className="text-sm font-semibold"
              >
                Delete
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500 p-4">No Product Found</div>
      )}
    </>
  );
};

export default Wishlist;
