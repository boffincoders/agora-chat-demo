import { ArrowRightIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import EmojiPicker from "emoji-picker-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { IPagination } from "../../interfaces/base";
import { ISingleUserChatData } from "../../interfaces/chat";
import { IGetUsersData } from "../../interfaces/user/getUser.reponse";
import Loader from "../loader";

interface IChattingNavProps {
    user: IGetUsersData;
    onHandleSendMessage: (data: { sent_to: string; message: string }) => any;
    loading: boolean;
    chatMessages: ISingleUserChatData | undefined;
    handleRefetch: (id: string, pagination: IPagination, allMessages: any) => any;
    pagination: IPagination;
}
const ChattingBar = ({
    onHandleSendMessage,
    loading,
    user,
    handleRefetch,
    pagination,
    chatMessages,
}: IChattingNavProps) => {
    const ref = useRef<any>();
    let loggedInUser: any = localStorage.getItem("loggedInUser");
    const [isEmojiRender, setIsEmojiRender] = useState<boolean>(false);
    if (loggedInUser) loggedInUser = JSON.parse(loggedInUser);
    const [message, setMessage] = useState("");
    useEffect(() => {
        if (
            chatMessages &&
            chatMessages.data.length > 0 &&
            chatMessages.pageNo === 1
        ) {
            const container = ref.current;
            container.scrollTop = container.scrollHeight;
        }
    }, [chatMessages, chatMessages?.data]);
    const handleScroll = useCallback(() => {
        const container = ref.current;

        if (container) {
            const scrollTop = container.scrollTop;
            if (scrollTop === 0 && chatMessages && !chatMessages.isLastDoc)
                handleRefetch(
                    user?._id,
                    {
                        pageNo: chatMessages.pageNo + 1,
                        perPage: 10,
                    },
                    chatMessages
                );
        }
    }, [chatMessages, handleRefetch, user?._id]);
    return user?.type ? (
        <div className="shadow-2xl bg-[#F6F7FC] h-[77vh] relative">
            <div className="flex justify-center pt-2">
                <p className="text-center text-xs py-1  bg-gray-800 px-4 rounded-xl text-white">
                    Today
                </p>
            </div>

            <div
                onScroll={(e) => handleScroll()}
                ref={ref}
                className="px-10 max-h-[60vh] pb-15 !overflow-y-auto"
            >
                {loading ? (
                    <Loader />
                ) : (
                    chatMessages &&
                    chatMessages.data.length > 0 &&
                    chatMessages?.data.map((message) => {
                        if (message.sent_to.toString() !== loggedInUser._id.toString())
                            return (
                                message?.message && (
                                    <div className="flex justify-between">
                                        <div></div>
                                        <div className="text-white p-2 rounded-lg mt-2 bg-[green]">
                                            {message?.message}
                                        </div>
                                    </div>
                                )
                            );
                        else
                            return (
                                message?.message && (
                                    <div className="flex">
                                        <div className="bg-[#ffff] shadow-2xl p-2 mt-2 rounded-lg">
                                            {message?.message}
                                        </div>
                                    </div>
                                )
                            );
                    })
                )}
            </div>
            {loading ? (
                <Loader />
            ) : (
                <div className="absolute bottom-0 w-full">
                    {user?.type === "pending" ? (
                        <div>
                            <p className="text-center mb-2">
                                Wait Until User Accepts Your Invitation Then You Will Be Able To
                                Send Messages
                            </p>
                        </div>
                    ) : (
                        <div>
                            {isEmojiRender && (
                                <div className="lg:flex justify-between">
                                    <div></div>
                                    <EmojiPicker
                                        onEmojiClick={(e) => setMessage((prev) => prev + e.emoji)}
                                    />
                                </div>
                            )}

                            <InputGroup>
                                <Input
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Type....."
                                    borderColor={"#1c99f2"}
                                    backgroundColor={"white"}
                                    value={message}
                                    rounded={0}
                                    colorScheme=""
                                    className="border border-solid border-[#1c99f2] "
                                />

                                <InputRightElement pointerEvents={"fill"}>
                                    <div className="text-black text-xl">
                                        <MdOutlineEmojiEmotions
                                            onClick={() => setIsEmojiRender(!isEmojiRender)}
                                            className="cursor-pointer text-black text-xl mr-3"
                                        />
                                    </div>

                                    <ArrowRightIcon
                                        onClick={() => {
                                            onHandleSendMessage({
                                                message: message,
                                                sent_to: user._id,
                                            });
                                            setIsEmojiRender(false);
                                            setMessage("");
                                        }}
                                        className="cursor-pointer mr-8"
                                    />
                                </InputRightElement>
                            </InputGroup>
                        </div>
                    )}
                </div>
            )}
        </div>
    ) : (
        <Loader />
    );
};

export default ChattingBar;
