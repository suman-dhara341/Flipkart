import React, { useEffect, useState } from "react";
import Left from "./Left";
import Right from "./Right";
import { allProducts } from "../../actions/api.call";
import { useLocation, useParams } from "react-router-dom";

const Product = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [totalProducts, setTotalProducts] = useState();
  const [allCategories, setAllCategories] = useState();
  const location = useLocation();

  const { search } = useParams();

  const getQueryParams = () => {
    const params = new URLSearchParams(location.search);
    return {
      minPrice: params.get("minPrice") || 0,
      maxPrice: params.get("maxPrice") || 200000,
      page: page,
      search: search,
    };
  };

  const getProducts = async () => {
    const getQueryParamsURL = getQueryParams();
    const res = await allProducts(getQueryParamsURL);

    setData(res.data?.allProduct);
    setTotalProducts(res.data?.totalProducts);
    setAllCategories(res.data?.allCategories);
  };

  useEffect(() => {
    setPage(1);
  }, [search]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  useEffect(() => {
    getProducts();
  }, [page, search, location.search]);

  return (
    <div className="grid md:grid-cols-4 md:p-4 gap-2 bg-[#EDEFF2]">
      {data?.length ? (
        <>
          {" "}
          <div className="md:col-span-1">
            <Left allCategories={allCategories} />
          </div>
          <div className="md:col-span-3 ">
            {data?.length ? <Right data={data} /> : <p>No Product Found</p>}

            <div className="bg-white p-4 flex items-center justify-center border-t-2">
              <button
                onClick={() => setPage((prev) => prev - 1)}
                className="bg-gray-200 p-2 rounded-full mx-2"
              >
                Prev
              </button>
              <span className="px-4">{page}</span>
              <button
                onClick={() => setPage((prev) => prev + 1)}
                className="bg-[#2874F0] p-2 rounded-full text-white mx-2"
              >
                Next
              </button>
            </div>
          </div>
        </>
      ) : (
        <p className="flex items-center justify-center md:col-span-4 text-2xl h-screen">
          No Product Found
        </p>
      )}
    </div>
  );
};

export default Product;
