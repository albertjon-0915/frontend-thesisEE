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

function Bargraph({ dataArr }: { dataArr: DataAvgI[] }) {
  return (
    <Bar
      data={{
        labels: dataArr?.map((item) => item.espClient),
        datasets: [
          {
            label: "voltage",
            data: dataArr?.map((item) => item.voltage),
            backgroundColor: "rgba(75, 192, 192, 0.2)",
          },
          {
            label: "current",
            data: dataArr?.map((item) => item.current),
            backgroundColor: "rgba(255, 99, 132, 0.2)",
          },
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
