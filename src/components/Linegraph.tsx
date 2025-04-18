import { PerDayAvgI } from "../interface/index"
import { computeKiloWattsPerHour } from "../utils/index"

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
  // const defaultEntry = { avgVoltage: 0.0, avgCurrent: 0.0, date: "Start" };
  // const fullData = dataArr ? [defaultEntry, ...dataArr] : [defaultEntry];
  return (
    <>
      <div >
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
              {
                label: "killowatt",
                data: dataArr?.map((item) => computeKiloWattsPerHour(item.avgVoltage,item.avgCurrent, 1)),
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                pointBorderColor: "rgba(54, 162, 235, 0.5)",
                borderColor: "rgba(54, 162, 235, 0.2)"
              }
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false, 
          }}
          style={{ width: "100%", height: "300px" }}
        />
      </div>
    </>
  )
}

export default Linegraph
