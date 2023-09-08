"use client";
import { accessibility } from "@/functions/accessibilityFunctions";
import { GraphData } from "@/functions/interfaces";
import dynamic from "next/dynamic";
import { useState } from "react";

const Access = new accessibility();

export default function Graph({ graphData }: { graphData: GraphData }) {
  const [graphFull, setGraphFull] = useState(false);

  function graphToggle(e) {
    Access.handlerWrapper(e, setGraphFull);
  }

  function closeGraph(e) {
    Access.closeWrapper(e, setGraphFull);
  }
  const Chart = dynamic(() => import("react-apexcharts"));

  const chartSerie = graphData.series;
  const chartOpt: ApexCharts.ApexOptions = {
    labels: graphData.labels,
  };

  return (
    <div>
      {/* mini */}
      <div className="graphContainer relative p-1">
        <Chart
          series={chartSerie}
          options={{
            ...chartOpt,

            legend: {
              show: false,
              position: "left",
              labels: { colors: "#000" },
              fontSize: "12px",
            },
            chart: {
              animations: { enabled: false },
            },
            stroke: { show: false },
            plotOptions: { pie: { expandOnClick: true } },
          }}
          type="pie"
          height={"130px"}
          width={"95%"}
        />

        <div className="FSbtn change-on-click" onClick={graphToggle}>
          <div className="FScross change-on-click"></div>
        </div>
      </div>

      {/*full */}
      <div
        onClick={closeGraph}
        className={`${
          graphFull ? "flex" : "hidden"
        } common_wrapper z-20 close-on-click`}
      >
        <div className="relative p-1 FSgraph close-on-click">
          <Chart
            series={chartSerie}
            options={{
              ...chartOpt,
              legend: {
                position: "left",
                labels: { colors: "#000" },
                fontSize: "20px",
              },
              chart: {
                animations: { speed: 400, easing: "linear" },
                height: "100%",
              },
              dataLabels: { style: { fontSize: "20px" } },
              responsive: [
                {
                  breakpoint: 1000,
                  options: {
                    legend: {
                      position: "top",
                      fontSize: "22px",
                    },
                  },
                },
              ],
            }}
            type="pie"
            height={"100%"}
          />
          <div className="FSclose close-on-click" onClick={closeGraph}>
            <div className="FSx close-on-click"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
