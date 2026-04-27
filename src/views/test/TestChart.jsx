import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Line } from "react-chartjs-2";

// chart.js 필수 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


function TestChart() {

  const data = [
    {
    storeNm:'매장1'
    ,m01: 90
    ,m02: 40
    ,m03: 50
    ,m04: 70
    ,m05: 110
    ,m06: 10
    ,m07: 60
    ,m08: 40
    ,m09: 80
    ,m10: 40
    ,m11: 0
    ,m12: 10
    }
    ,{
    storeNm:'매장2'
    ,m01: 10
    ,m02: 20
    ,m03: 100
    ,m04: 60
    ,m05: 100
    ,m06: 30
    ,m07: 40
    ,m08: 10
    ,m09: 10
    ,m10: 50
    ,m11: 60
    ,m12: 120
    }
  ]



  const colors = [
    "rgba(136, 250, 29, 0.95)",
    "rgba(255, 14, 14, 0.98)",
    "rgba(54, 162, 235, 0.95)"
  ];




  const chartData = {
    labels: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],

    datasets: data.map((store, idx) => ({
      label: store.storeNm,
      data: [
        store.m01, store.m02, store.m03, store.m04,
        store.m05, store.m06, store.m07, store.m08,
        store.m09, store.m10, store.m11, store.m12
      ],
      borderColor: colors[idx],
      backgroundColor: colors[idx],
      tension: 0.4
    }))
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true
      },
      tooltip: {
        enabled: true
      }
    }
  };

  return(
    <>
    <div style={{ width: "100%", height: 400 }}>
      <Line data={chartData} options={options} />
    </div>
    </>
  );
}
export default TestChart