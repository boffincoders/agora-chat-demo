import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../components/loader";

const PrivatePage = ({ Children }: any) => {
    const data = useSelector((data: any) => data.loggedInUser);
    const navigate = useNavigate();
    useEffect(() => {
        if (!data?.user) navigate("/login");
    }, []);

    return <div>{!data?.user ? <Loader /> : <Children />}</div>;
};

export default PrivatePage;
