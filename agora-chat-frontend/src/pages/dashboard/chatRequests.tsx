import { Avatar, Button, Card, useToast } from "@chakra-ui/react";
import { HttpStatusCode } from "axios";
import { useEffect, useState } from "react";
import AppContainer from "../../components/container";
import Header from "../../components/layout/header";
import Loader from "../../components/loader";
import { IGetChatRequestData } from "../../interfaces/chat/getChatRequests.response";
import chatServices from "../../services";

const ChatRequests = () => {
    const [chatRequests, setChatRequests] = useState<IGetChatRequestData[]>([]);
    const [chatRequestLoader, setChatRequestsLoader] = useState<boolean>(false);
    const toast = useToast();
    const [loading, setLoading] = useState<{
        type: string;
        isResponding: boolean;
    }>({ type: "", isResponding: false });
    const getChatRequests = async () => {
        setChatRequestsLoader(true);
        let response = await chatServices.getChatRequests();
        if (response.statusCode === HttpStatusCode.Ok)
            setChatRequests(response.data);
        setChatRequestsLoader(false);
    };
    const handleResponseRequest = async (data: {
        reqId: string;
        respondType: string;
    }) => {
        setLoading({ type: data.respondType, isResponding: true });
        let response = await chatServices.respondChatRequest(data);
        if (response.statusCode === HttpStatusCode.Ok)
            toast({
                position: "top-left",

                title:
                    data.respondType === "accepted"
                        ? "Request Accepted"
                        : "Request Rejected",
                status: "success",
                isClosable: true,
            });
        else
            toast({
                position: "top-left",

                title: response.data.message,
                status: "error",
                isClosable: true,
            });
        setLoading({ type: data.respondType, isResponding: false });
    };
    useEffect(() => {
        getChatRequests();
    }, []);
    return (
        <div>
            <Header isSidebarOpen={false} setIsSidebarOpen={() => { }} />
            <AppContainer>
                <div className="text-lg mt-3 text-[#6d5fdf]">Confirm Chat Requests</div>
                {chatRequestLoader ? (
                    <Loader />
                ) : chatRequests.length > 0 ? (
                    <div className="grid grid-cols-12 lg:space-x-4 mt-4">
                        {chatRequests.map((x) => {
                            return (
                                <div className="lg:col-span-4 2xl:col-span-3 col-span-12 max-lg:mt-4">
                                    <Card className="p-3 shadow-2xl py-4">
                                        <div className="flex justify-center">
                                            <Avatar src={x?.reqUser?.profilePic ?? ""} />
                                        </div>
                                        <p className="text-center mt-2">{x.reqUser.email}</p>
                                        <p className="text-center my-1">{x.reqUser.userName}</p>
                                        <div className="flex justify-center mt-4 gap-3">
                                            <Button
                                                isLoading={
                                                    loading.type === "rejected" && loading.isResponding
                                                }
                                                onClick={() =>
                                                    handleResponseRequest({
                                                        reqId: x._id,
                                                        respondType: "rejected",
                                                    })
                                                }
                                                colorScheme="red"
                                            >
                                                Reject
                                            </Button>
                                            <Button
                                                isLoading={
                                                    loading.type === "accepted" && loading.isResponding
                                                }
                                                onClick={() =>
                                                    handleResponseRequest({
                                                        reqId: x._id,
                                                        respondType: "accepted",
                                                    })
                                                }
                                                colorScheme="green"
                                            >
                                                Accecpt
                                            </Button>
                                        </div>
                                    </Card>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center mt-[30vh]">No Request Found !</div>
                )}
            </AppContainer>

            {/* {chatRequests.length === 0 ? (
                <PageNotFound />
            ) : (
                <div className="flex justify-center items-center h-[90vh]"></div>
            )} */}
        </div>
    );
};

export default ChatRequests;
