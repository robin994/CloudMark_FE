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
    import { motion } from "framer-motion";

    
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
        const [startOrderDate, setStartOrderDate] = useState()
        const [endOrderDate, setEndOrderDate] = useState()
        const [finalDate, setFinalDate] = useState([])
        const mockDate1 = "2022-02-04"
        const mockDate2 = "2022-05-02"


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
        function calcolaData(){
            let startDat = new Date(mockDate1)
            let endDat = new Date(mockDate2)
            let diffTime = Math.abs(startDat - endDat)
            let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
            console.log("ci sono: ", diffDays, " giorni di differenza")
        }
        calcolaData()

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
        const controlChart = ()=>{
            if(startOrderDate && endOrderDate){

                return (
                <>
                    <div>
                        <Bar options={chartOptions} data={chartData} />
                    </div>
                </>
            )
            }else{
                return (
                    <motion.div
                      className="container rounded bg-white mt-5 mb-5 text-center"
                      initial={{ y: -100 }}
                      animate={{ y: 0 }}
                    >
                      <span style={{ fontSize: "25px", letterSpacing: "3px" }}>
                        LOADING
                      </span>
                      <div className="loadbar shadow"></div>
                    </motion.div>
                  );
            }

        }
        return(<>{controlChart()}</>)
    }
    export default Chart