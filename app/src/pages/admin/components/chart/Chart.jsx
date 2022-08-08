import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useState, useEffect } from 'react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

const Chart = () => {
    const [chartData, setChartData] = useState({
        datasets: [],
    })
    
    const value = 0

    const [chartOptions, setChartOptions] = useState({})
    
    useEffect(() => {
        setChartData({
            labels: ["John", "Kevin", "George", "Micheal", "Oreo"],
            datasets: [
                {
                    label: "chart alpha test",
                    data: [12, 55, 34, 120, 720],
                    borderColor: "rgb(53, 162, 235)",
                    BackgroundColor: "rgba(53, 162, 235, 0.4)",
                }
            ]
        });
        setChartOptions({
            responsive: true,
            plugins: {
                legend: {
                    position: "top"
                },
                title: {
                    display: true
                }
            }
        })
    }, [value])

    return (
        <div>
            <Bar options={chartOptions} data={chartData} />
        </div>
    )
}

export default Chart