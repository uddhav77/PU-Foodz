import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = () => {
    const [menuData, setMenuData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:7000/api/foodMenu')
            .then((response) => response.json())
            .then((data) => setMenuData(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    // Process data for chart (example: extracting dish names and their prices)
    const dishNames = menuData.map((dish) => dish.name);
    const dishPrices = menuData.map((dish) => parseFloat(dish.options[0].full));

    // Define chart data
    const chartData = {
        labels: dishNames,
        datasets: [{
            label: 'Prices',
            data: dishPrices,
            backgroundColor: 'rgba(75,192,192,0.6)', // Bar color
        }, ],
    };

    return ( <
        div >

        <
        /div>
    )
}

export default BarChart;