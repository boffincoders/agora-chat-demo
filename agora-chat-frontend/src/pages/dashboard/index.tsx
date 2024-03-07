import Layout from "../../components/layout";
import Loader from "../../components/loader";

const Dashboard = () => {
  let loggedInUser: any = localStorage.getItem("loggedInUser");

  return <div>{loggedInUser ? <Layout /> : <Loader />}</div>;
};

export default Dashboard;
