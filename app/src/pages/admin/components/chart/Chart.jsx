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
import axios from 'axios';
    
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
        const [startOrderDate, setStartOrderDate] = useState([])
        const [endOrderDate, setEndOrderDate] = useState([])
        const [finalDate, setFinalDate] = useState([])
        
        const value = 0
    
        const [chartOptions, setChartOptions] = useState({})
        function getCommesse(){
            axios.get(`${process.env.REACT_APP_FASTAPI_URL}/orders`).then(res=>{
                for(var x in res.data.data){
                    setStartOrderDate(res.data.data[x].startDate)
                    setEndOrderDate(res.data.data[x].endDate)
                }
            })
        }
        useEffect(() => {
            setChartData({
                labels: ["John", "Kevin", "George", "Micheal", "Oreo"],
                datasets: [
                    {
                        label: "chart alpha test",
                        data: [12, 55, 34, 120, 720],
                        borderColor: "rgb(255,02,02)",
                        backgroundColor: "rgba(210, 0, 0, 0.7)",
                    }
                ],
                borderWidth: 1,
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
            getCommesse()
        }, [value])
        
        return (
            <div>
                <Bar options={chartOptions} data={chartData} />
            </div>
        )
    }
    
    export default Chart