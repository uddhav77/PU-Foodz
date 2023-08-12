import React, { useState, useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";

function Chart() {
  const [menuData, setMenuData] = useState([]);
  const chartRef = useRef(null); // Use a ref to store the chart instance

  useEffect(() => {
    fetch("http://localhost:7000/api/foodMenu")
      .then((response) => response.json())
      .then((data) => setMenuData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Process data for chart (example: extracting dish names and their prices)
  const dishNames = menuData.map((dish) => dish.name);
  const dishPrices = menuData.map((dish) => parseFloat(dish.options[0].full));

  // Define chart data
  const chartData = {
    labels: dishNames,
    datasets: [
      {
        label: "Prices",
        data: dishPrices,
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Bar color
      },
    ],
  };

  // Clean up the chart instance when the component is unmounted
  useEffect(() => {
    return () => {
      // Destroy the chart instance
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Food Menu Bar Chart</h2>
        <div className="h-96 w-full">
          <Bar
            ref={chartRef} // Assign the ref to the chart instance
            data={chartData}
            options={{
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: "Price",
                  },
                },
                x: {
                  title: {
                    display: true,
                    text: "Dish",
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Chart;
