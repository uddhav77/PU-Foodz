import React, { useEffect, useState } from "react";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      const data = await response.json();
      setCategories(data.categories);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-wrap justify-center">
      {categories.map((item, index) => (
        <div
          key={index}
          className="category-item text-red-500 text-4xl font-bold bg-cyan-200 ml-10 mt-20 rounded-2xl shadow-2xl p-10 hover:scale-110 hover:duration-300"
        >
          <div>
            <img src={item.strCategoryThumb} alt={item.strCategory} />
          </div>
          <div className="text-center mt-8">{item.strCategory}</div>
        </div>
      ))}
    </div>
  );
};

export default Categories;
