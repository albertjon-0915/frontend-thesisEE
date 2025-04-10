import { computeKiloWattsPerHour } from "../utils/index.tsx";

import {
  Chart as ChartJS,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  BarElement,
  BarController,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);
import { Bar } from "react-chartjs-2";
import { DataAvgI } from "../interface/index";
import useFetchAllias from '../hooks/useFetchAllias.tsx';

function Bargraph({ dataArr }: { dataArr: DataAvgI[] }) {
  const { nameRef } = useFetchAllias();

  return (
    <Bar
      data={{
        labels: dataArr?.map((item) => nameRef?.[item.espClient] ?? item.espClient),
        datasets: [
          {
            label: "voltage",
            data: dataArr?.map((item) => item.voltage),
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 0.8)",
            borderWidth: 1.5,
          },
          {
            label: "current",
            data: dataArr?.map((item) => item.current),
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 0.8)",
            borderWidth: 1.5,
          },
           {
            label: "killowatt",
            data: dataArr?.map((item) => computeKiloWattsPerHour(item.voltage,item.current, 1)),
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 0.8)",
            borderWidth: 1.5,
          }
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: 30,
        },
      }}
    />
  );
}

export default Bargraph;
