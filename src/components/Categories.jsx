import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
      {categories.map((item) => (
        <Link key={item.idCategory} to={`/description/${item.strCategory}`}>
          <div className="category-item text-red-500 text-3xl font-bold bg-white ml-10 mt-20  relative rounded-2xl shadow-2xl hover:scale-110 hover:duration-300">
            <div>
              <img
                src={item.strCategoryThumb}
                alt={item.strCategory}
                className="w-[500px] relative h-[300px] shadow-2xl rounded-2xl"
              />
            </div>
            <div className="text-center mt-8 bg-red-400 text-white p-2 w-[250px] absolute top-0 right-0">
              {item.strCategory}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
