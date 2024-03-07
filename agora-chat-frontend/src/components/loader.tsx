import { Spinner } from "@chakra-ui/react";

const Loader = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <Spinner size={"lg"} color="#1c99f2" />
        </div>
    );
};

export default Loader;
