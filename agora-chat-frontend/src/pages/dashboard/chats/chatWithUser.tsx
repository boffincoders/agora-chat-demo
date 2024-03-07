import { useToast } from "@chakra-ui/react";
import AC, { AgoraChat } from "agora-chat";
import { HttpStatusCode } from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ChattingBar from "../../../components/chattingBar/index";
import ChattingNavbar from "../../../components/chattingNavbar";
import Loader from "../../../components/loader";
import { IPagination } from "../../../interfaces/base";
import { ISingleUserChatData } from "../../../interfaces/chat";
import { getChats } from "../../../reduxThunk/slices/getChats.slice";
import { sendMessage } from "../../../reduxThunk/slices/sendMessage.slice";
import chatServices from "../../../services";
let loggedInUser: any = localStorage.getItem("loggedInUser");
if (loggedInUser) loggedInUser = JSON.parse(loggedInUser);
const ChatWithUser = () => {
  const toast = useToast();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const chatMessages = useSelector((state: any) => state.chatMessages);
  const [pagination] = useState<IPagination>({
    pageNo: 1,
    perPage: 10,
  });
  const { isLoading } = useSelector((state: any) => state.getChatMessages);
  const { isLoading: loading } = useSelector((state: any) => state.getUsers);
  const [user, setUser] = useState<any>();

  const [allMessages, setAllMessages] = useState<ISingleUserChatData>();
  let AcConnection: AgoraChat.Connection = useSelector(
    (state: any) => state.connection
  );
  AcConnection = AcConnection.connection;
  const getHistoryOfChat = async (
    id: string,
    pagination: IPagination,
    allMessagess: any
  ) => {
    let response = await dispatch(getChats({ id, pagination }));
    let dataToSet: any = {};
    if (response.payload?.data.length > 0) {
      let resData = response.payload;
      if (allMessagess && allMessagess.data.length > 0)
        resData = {
          ...resData,
          data: [...resData.data, ...allMessagess.data],
        };

      let sortedData = [...resData.data].sort(
        (a: any, b: any) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      dataToSet = {
        ...resData,
        data: sortedData,
      };
    } else dataToSet = response.payload;
    setAllMessages(dataToSet);
  };

  const getSpecifcUserDetail = async (id: string) => {
    let response = await chatServices.getUsers(id);
    if (response.status === HttpStatusCode.Ok) setUser(response.data.data);
  };
  const handleSendMessage = useCallback(
    async (data: { sent_to: string; message: string }) => {
      try {
        let msg = AC.message.create({
          msg: data.message,
          to: user?.chatId,
          type: "txt",
          chatType: "singleChat",
        });

        await AcConnection.send(msg)
          .then(() => {
            let objToSet = {
              __v: 0,
              _id: Math.random().toString(),
              createdAt: Math.random().toString(),
              isReaded: false,
              message: data.message,
              sent_from: loggedInUser._id,
              sent_to: data.sent_to,
              updatedAt: new Date().toString(),
            };
            setAllMessages((prev: any) => {
              return {
                ...prev,
                data:
                  prev?.data?.length > 0
                    ? [...prev?.data, objToSet]
                    : [objToSet],
              };
            });
          })
          .catch((err) => console.log(err));
      } catch (error) {
        console.log(error, "er");
      }
      let response = await dispatch(
        sendMessage({
          sent_to: data.sent_to,
          message: data.message,
        })
      );
      if (response.payload.statusCode !== HttpStatusCode.Ok) {
        toast({
          position: "top-left",

          title: "Something Went Wrong",
          status: "error",
          isClosable: true,
        });
        getHistoryOfChat(user._id, pagination, allMessages);
      }
    },
    [dispatch, AcConnection, getHistoryOfChat, user]
  );
  useEffect(() => {
    if (AcConnection && id) {
      getHistoryOfChat(id, pagination, null);
      getSpecifcUserDetail(id);
    }
  }, [AcConnection, id]);
  useEffect(() => {
    if (
      chatMessages.chats &&
      chatMessages?.chats?.chats &&
      chatMessages?.chats?.chats.from.toString() === user.chatId
    ) {
      let obj = {
        __v: 0,
        _id: Math.random().toString(),
        createdAt: new Date().toISOString(),
        isReaded: false,
        message: chatMessages.chats.chats.msg,
        sent_from: user._id,
        sent_to: loggedInUser._id,
        timestamp: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setAllMessages((prev: any) => {
        return {
          ...prev,
          data: prev?.data ? [...prev?.data, obj] : [],
        };
      });
    }
  }, [chatMessages?.chats]);
  useEffect(() => {
    if (user && !user?.type) navigate(-1);
  }, [user, AcConnection, navigate]);
  return (
    <div>
      {!AcConnection || loading || !user || !user?.type ? (
        <Loader />
      ) : (
        user && (
          <>
            <ChattingNavbar user={user} />
            <ChattingBar
              pagination={pagination}
              handleRefetch={getHistoryOfChat}
              chatMessages={allMessages}
              loading={isLoading}
              onHandleSendMessage={handleSendMessage}
              user={user}
            />
          </>
        )
      )}
    </div>
  );
};

export default ChatWithUser;
