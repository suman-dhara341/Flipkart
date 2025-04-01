import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  BarElement,
} from "chart.js";

import { Bar, Line, Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
);

// Line Chart
//
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};
const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const pieChart = {
  labels,
  datasets: [
    {
      label: "Products",
      data: [500000, 70000, 80000, 60000, 90000, 100000, 120000],
      backgroundColor: "#7B3AEC",
    },
    // {
    //   label: "Dataset 2",
    //   data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
    //   backgroundColor: "rgba(53, 162, 235, 0.5)",
    // },
  ],
};

const Dashboard = () => {
  const totalOrders = useSelector((state) => state?.admin?.orders) || [];
  const totalProducts = useSelector((state) => state?.admin?.products) || [];

  const totalSalesAmount = totalOrders?.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.price * currentValue.quantity,
    0
  );

  // Order Status
  let Processing = 0;
  let Shipped = 0;
  let Delivered = 0;
  let Cancelled = 0;
  let Pending = 0;
  totalOrders?.forEach((element) => {
    if (element.status === "Processing") {
      Processing++;
    } else if (element.status === "Shipped") {
      Shipped++;
    } else if (element.status === "Delivered") {
      Delivered++;
    } else if (element.status === "Cancelled") {
      Cancelled++;
    } else if (element.status === "Pending") {
      Pending++;
    }
  });

  const OrderStatus = {
    labels: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
    datasets: [
      {
        label: "Total",
        data: [Pending, Processing, Shipped, Delivered, Cancelled],
        backgroundColor: [
          "#ff08ad",
          "#9334EA",
          "#F8CE10",
          "#4ADE80",
          "#ff0000",
        ],
        borderColor: ["#ffffff", "#ffffff", "#ffffff", "#ffffff"],
        borderWidth: 1,
      },
    ],
  };

  // Stock Status
  let outOfStock = 0;
  let inStock = 0;
  totalProducts?.forEach((item) => {
    if (item.stock > 0) {
      inStock++;
    } else if (item.stock === 0) {
      outOfStock++;
    }
  });

  const StockStatus = {
    labels: ["Out Of Stock", "In Stock"],
    datasets: [
      {
        label: "Total",
        data: [outOfStock, inStock],
        backgroundColor: ["#ea2b21", "#4ADE80"],
        borderColor: ["#ffff", "#ffffff"],
        borderWidth: 1,
      },
    ],
  };

  // total sales
  const orderMonthYear = {};

  const orderDelivered = totalOrders.filter(
    (item) => item.status === "Delivered"
  );
  orderDelivered.forEach((data) => {
    const date = new Date(data.date);
    const year = date.getFullYear();
    const month = date.toLocaleString("en-US", { month: "long" });

    if (!orderMonthYear[year]) {
      orderMonthYear[year] = {
        January: 0,
        February: 0,
        March: 0,
        April: 0,
        May: 0,
        June: 0,
        July: 0,
        August: 0,
        September: 0,
        October: 0,
        November: 0,
        December: 0,
      };
    }

    orderMonthYear[year][month] += data.price * data.quantity;
  });

  const datasets = Object.keys(orderMonthYear).map((year, index) => ({
    label: `Sales in ${year}`,
    data: labels.map((month) => orderMonthYear[year][month]),
    borderColor: ["#7C3AED", "#F49E0B", "#10B982"][index % 3],
    backgroundColor: ["#7C3AED", "#F49E0B", "#10B982"][index % 3],
  }));

  const LineChart = {
    labels,
    datasets,
  };

  // Products
  const productsMonthYear = {};

  totalProducts.forEach((item) => {
    const date = new Date(item.createdAt);
    const year = date.getFullYear();
    const month = date.toLocaleString("en-US", { month: "long" });

    // Initialize the year if it doesn't exist
    if (!productsMonthYear[year]) {
      productsMonthYear[year] = {
        January: 0,
        February: 0,
        March: 0,
        April: 0,
        May: 0,
        June: 0,
        July: 0,
        August: 0,
        September: 0,
        October: 0,
        November: 0,
        December: 0,
      };
    }
    productsMonthYear[year][month]++;
  });

  const pieChartDatasets = Object.keys(productsMonthYear).map(
    (year, index) => ({
      label: `Total Products in ${year}`,
      data: labels.map((month) => productsMonthYear[year][month]),
      borderColor: ["#7C3AED", "#F49E0B", "#10B982"][index % 3],
      backgroundColor: ["#7C3AED", "#F49E0B", "#10B982"][index % 3],
    })
  );

  const pieChart = {
    labels,
    datasets: pieChartDatasets,
  };

  return (
    <div className="mt-16  pb-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-[#7B3AEC] p-4 rounded-lg text-white">
          <p className="text-sm font-semibold">Total Sales Amount</p>
          <p className="font-semibold text-lg">₹{totalSalesAmount}</p>
        </div>
        <div className="bg-[#EE4444] p-4 rounded-lg text-white">
          <p className="text-sm font-semibold">Total Orders</p>
          <p className="font-semibold text-lg">{totalOrders?.length}</p>
        </div>
        <div className="bg-[#F69E07] p-4 rounded-lg text-white">
          <p className="text-sm font-semibold">Total Products</p>
          <p className="font-semibold text-lg">{totalProducts?.length}</p>
        </div>
        {/* <div className="bg-[#13B783] p-4 rounded-lg text-white">
          <p className="text-sm font-semibold">Total Sales Amount</p>
          <p className="font-semibold text-lg">₹13333</p>
        </div> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 mt-4 gap-4">
        <div className="md:col-span-2 bg-white p-4 rounded-lg">
          <Line options={options} data={LineChart} />
        </div>
        <div className="md:col-span-1 bg-white p-4 rounded-lg w-full">
          <p className="font-semibold text-center">Order Status</p>
          <Pie data={OrderStatus} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="md:col-span-2 bg-white rounded-lg">
          <Bar options={options} data={pieChart} />
        </div>
        <div className="md:col-span-1 bg-white p-4 rounded-lg w-full">
          <p className="font-semibold text-center">Stock Status</p>
          <Pie data={StockStatus} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
