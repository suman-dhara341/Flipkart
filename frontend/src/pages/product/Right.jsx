import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { NavLink } from "react-router-dom";
import { wishList } from "../../actions/api.call";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setWishlist } from "../../redux/authSlice";

const Right = ({ data }) => {
  const dispatch = useDispatch();
  const wishlists = useSelector((state) => state?.profile?.wishlist);
  const wishlist = async (id) => {
    const res = await wishList(id);
    if (res?.data?.success) {
      toast.success(res.data.message);
      dispatch(setWishlist(res.data.wishlist?.productId));
    } else {
      toast.error(
        res.response?.data?.message || "Something was wrong. Try again."
      );
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4  bg-white md:p-4">
      {data?.length &&
        data?.map((item) => {
          const isWished = wishlists?.some((value) => value._id === item._id);

          return (
            <div key={item._id} className="hover:shadow-md p-4">
              <div className="relative">
                <img src={item.images[0]?.url} alt="" className="w-full h-44" />
                <div
                  onClick={() => wishlist(item._id)}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                >
                  {isWished ? (
                    <FavoriteIcon fontSize="small" />
                  ) : (
                    <FavoriteBorderIcon fontSize="small" />
                  )}
                </div>
              </div>

              <NavLink
                to={`/product_details/${item._id}`}
                className="space-y-2"
              >
                <p className="line-clamp-2 text-sm font-semibold mt-2">
                  {item.name}
                </p>
                <div className="space-x-2">
                  <span className="bg-[#388E3C] px-2 py-1 rounded-lg text-sm text-white">
                    4.2
                  </span>
                  <span className="text-sm">({item.numOfReviews})</span>
                </div>
                <div className="space-x-2">
                  <span className="font-semibold">₹{item.finalPrice}</span>
                  <span className="text-sm line-through text-gray-600">
                    ₹{item.price}
                  </span>
                  <span className="text-[#388E3C] text-sm font-semibold">
                    {item.discount}% off
                  </span>
                </div>
              </NavLink>
            </div>
          );
        })}
    </div>
  );
};

export default Right;
