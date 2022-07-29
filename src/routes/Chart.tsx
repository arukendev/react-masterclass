import { useQuery } from "@tanstack/react-query";
import ReactApexChart from "react-apexcharts";
import { fetchCoinHistory } from "../api";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface IChartProps {
  coinId: string;
}

function Chart({ coinId }: IChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ReactApexChart
          type="line"
          series={[
            {
              name: "sales",
              data: data?.map((price) => price.close) ?? [],
              //?? => null 병합 연산자 여러타입으로 선언된것을 병합
            },
          ]}
          options={{
            theme: { mode: "dark" },
            chart: {
              height: 500,
              width: 500,
              toolbar: { show: false },
              background: "transparent",
            },
            grid: { show: false },
            stroke: { curve: "smooth", width: 4 },
            yaxis: { show: false },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: {
                show: false,
              },
              type: "datetime",
              categories: data?.map((price) => +price.time_close * 1000),
            },
            fill: {
              type: "gradient",
              gradient: {
                type: "vertical",
                gradientToColors: ["green"],
                stops: [0, 100],
              },
            },
            colors: ["red"],
            tooltip: { y: { formatter: (value) => `$ ${value.toFixed(2)}` } },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
