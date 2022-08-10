import {
        Chart as ChartJS,
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend,
        LineElement,
        PointElement
    } from 'chart.js';
    import { Bar, Line } from 'react-chartjs-2';
    import { useState, useEffect } from 'react';
    import axios from 'axios';
    import { motion } from "framer-motion";

    
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        LineElement,
        PointElement,
        Title,
        Tooltip,
        Legend
    )
    
    const Chart = () => {
        const [chartData, setChartData] = useState({
            datasets: [],
        })
        const [dat, setData] = useState()
        const [startOrderDate, setStartOrderDate] = useState()
        const [endOrderDate, setEndOrderDate] = useState()
        const mockDate1 = "2022-02-04"
        const mockDate2 = "2022-05-02"
        var sus1 = []
        var sus2 = []
        var finalDate = []

        const value = 0
    
        const [chartOptions, setChartOptions] = useState({})
        function getCommesse(){
            axios.get(`${process.env.REACT_APP_FASTAPI_URL}/orders`).then(res=>{
                for(var i in res.data.data){
                    sus1.push(res.data.data[i].startDate)
                    sus2.push(res.data.data[i].endDate)
                    setStartOrderDate(sus1)
                    setEndOrderDate(sus2)
                }
            })
        }
        function calcolaData(){
            for(var i = 0; i < startOrderDate.length; i++){
                let startDat = new Date(startOrderDate[i])
                let endDat = new Date(endOrderDate[i])
                let diffTime = Math.abs(startDat - endDat)
                let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
                finalDate.push(diffDays)
                console.log(finalDate)
            }
        }

        useEffect(() => {
            setChartData({
                labels: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio","Giugno","Luglio", "Agosto", "Settembre","Ottobre","Novembre","Dicembre"],
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
                calcolaData()
                console.log(startOrderDate)
                return (
                <>
                    <div>
                        <Line options={chartOptions} data={chartData} />
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