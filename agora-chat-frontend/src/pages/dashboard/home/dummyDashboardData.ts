export const usersData: {
  title: string;
  data: {
    options: ApexCharts.ApexOptions;
    series: ApexAxisChartSeries | ApexNonAxisChartSeries | undefined;
    type: string;
  }[];
}[] = [
  {
    title: "Users",
    data: [
      {
        options: {
          chart: {
            width: 380,
            type: "pie",
          },
          labels: [],
          xaxis: { labels: { show: false } },
          yaxis: { labels: { show: false } },
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200,
                },
                legend: {
                  position: "bottom",
                },
              },
            },
          ],
        },
        series: [44, 55, 13, 43, 22],
        type: "pie",
      },
    ],
  },
];
