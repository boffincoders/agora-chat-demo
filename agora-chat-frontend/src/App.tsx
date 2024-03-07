import { useToast } from "@chakra-ui/react";
import { AgoraChat } from "agora-chat";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Loader from "./components/loader";
import { connection } from "./config/agora.config";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import Dashboard from "./pages/dashboard";
import ChatRequests from "./pages/dashboard/chatRequests";
import PageNotFound from "./pages/pageNotFound";
import PrivatePage from "./pages/privatePage";
import UpdateProfile from "./pages/updateProfile";
import { updateChats } from "./reduxThunk/slices/chatMessages.slice";
import { addConnection } from "./reduxThunk/slices/connection.slice";
import { generateChatToken } from "./reduxThunk/slices/generateToken";
import { routesConfig } from "./routes";

function App() {
  const dispatch = useDispatch();
  const toast = useToast();

  const data = useSelector((data: any) => data.loggedInUser);
  let AcConnection: AgoraChat.Connection = useSelector(
    (state: any) => state.connection
  );
  const chatMessages = useSelector((state: any) => state.chatMessages);

  const getDynamicComp = (path: string) => {
    let Comp = React.lazy(() => import(`${path}`));
    return Comp;
  };
  //Generating Agora token
  const generateToken = async (id: string) => {
    let respo = await dispatch(generateChatToken(id));
    if (respo) {
      await connection.open({ user: id, agoraToken: respo.payload.data });
      dispatch(addConnection(connection));
    }
  };

  useEffect(() => {
    if (data?.user) {
      let loggedInUserr = data?.user;
      generateToken(loggedInUserr.chatId);
    }
  }, [data?.user]);
  
  useEffect(() => {
    if (AcConnection?.connection) {
      AcConnection = AcConnection?.connection;
      AcConnection.addEventHandler("connection&message", {
        onTextMessage(msg) {
          if (chatMessages?.chats) dispatch(updateChats({ chats: msg }));
          toast({
            position: "top-right",
            title: `Message From ${msg.from}`,
            description: msg.msg,
            status: "warning",
            isClosable: true,
          });
        },
      });
    }
  }, [AcConnection?.connection]);
  
  return !AcConnection?.connection && data?.user ? (
    <Loader />
  ) : (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivatePage Children={Dashboard} />}>
          {routesConfig.map((route) => (
            <Route
              path={route.key}
              element={<PrivatePage Children={getDynamicComp(route.path)} />}
            />
          ))}
        </Route>
        <Route
          path="/update-profile"
          element={<PrivatePage Children={UpdateProfile} />}
        />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/chatting/requests" element={<ChatRequests />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
