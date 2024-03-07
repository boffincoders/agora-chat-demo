import { Card } from "@chakra-ui/react";
import AppChart from "../../../components/chart";
import AppContainer from "../../../components/container";
import { usersData } from "./dummyDashboardData";

const Home = () => {
    return (
        <AppContainer>
            {usersData.map((x) => {
                return (
                    <Card title={x.title} className="p-3 xl:px-4">
                        <div>{x.title}</div>
                        {x.data.map((homeData) => (
                            <AppChart
                                type={homeData.type}
                                options={homeData.options}
                                series={homeData.series}
                            />
                        ))}
                    </Card>
                );
            })}
        </AppContainer>
    );
};

export default Home;
