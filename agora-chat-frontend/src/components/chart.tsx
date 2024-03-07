import ReactApexChart from "react-apexcharts";

interface IAppChartProps {
    options: ApexCharts.ApexOptions | undefined;
    series: ApexAxisChartSeries | ApexNonAxisChartSeries | undefined;
    type: any;
}
const AppChart = ({ options, series, type }: IAppChartProps) => {
    return (
        <div>
            <ReactApexChart
                options={options}
                series={series}
                type={type}
                height={250}
            // width={380}
            />
        </div>
    );
};

export default AppChart;
