// import { DataAvgI } from "../hooks/useFetchDataClientAvg";
import { PerDayAvgI } from "../hooks/useFetchAveragePerDay"

import {
    Chart as ChartJS,
    LineController,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
  
  ChartJS.register(
    LineController,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
  );
  
  import { Line } from "react-chartjs-2";

function Linegraph({dataArr}: {dataArr: PerDayAvgI[]}) {
  return (
    <Line
    data={{
        labels: dataArr?.map((item) => item.date),
        datasets: [
          {
            label: "voltage",
            data: dataArr?.map((item) => item.avgVoltage),
            backgroundColor: "rgba(255, 159, 64, 0.2)",
            pointBorderColor: "rgba(255, 159, 64, 0.5)",
            borderColor: "rgba(255, 159, 64, 0.2)"
          },
          {
            label: "current",
            data: dataArr?.map((item) => item.avgCurrent),
            backgroundColor: "rgba(153, 102, 255, 0.2)",
            pointBorderColor: "rgba(153, 102, 255, 0.5)",
            borderColor: "rgba(153, 102, 255, 0.2)"
          },
        ],
      }}
      options={{
        responsive: true,
        layout: {
          padding: 35,
        },
      }}
    />
  )
}

export default Linegraph
