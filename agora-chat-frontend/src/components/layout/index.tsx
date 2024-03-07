import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { IGetUsersData } from "../../interfaces/user/getUser.reponse";
import { getUsers } from "../../reduxThunk/slices/getUsers.slice";
import ChattingSidebar from "../chattingSidebar";
import AppContainer from "../container";
import Loader from "../loader";
import Header from "./header";
import Sidebar from "./sidebar";
export interface ILayoutProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => any;
}
const Layout = ({ children }: any) => {
  const location = useLocation();
  let isChatPage =
    location.pathname.includes("/chat/") || location.pathname === "/chats";
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state: any) => state.getUsers);
  const [usersList, setUsersList] = useState<IGetUsersData[]>([]);
  const [isSideBarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [matches, setMatches] = useState(
    window.matchMedia("(max-width: 768px)").matches
  );
  const getUsersList = async () => {
    let res = await dispatch(getUsers());
    if (res.payload.success) setUsersList(res.payload.data);
  };
  useEffect(() => {
    if (isChatPage) getUsersList();
  }, [isChatPage]);
  useEffect(() => {
    window
      .matchMedia("(max-width: 768px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);
  return isLoading ? (
    <Loader />
  ) : (
    <div className="lg:flex">
      {/* Sidebar for large devices */}
      <div className="2xl:w-[15%] xl:w-[20%] lg:w-[30%]  max-lg:hidden w-full sticky ">
        {location.pathname.includes("/chat/") ||
          location.pathname === "/chats" ||
          isChatPage ? (
          usersList &&
          <ChattingSidebar openChatBar={isSideBarOpen} setIsOpenChatBar={setIsSidebarOpen} usersList={usersList} />
        ) : (
          <Sidebar
            isSidebarOpen={isSideBarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        )}
      </div>
      {/* Header */}
      <div
        className={`lg:w-[80%] xl:w-[80%] 2xl:w-[85%] w-full relative ${matches && isSideBarOpen ? "pointer-events-none" : ""
          }`}
      >
        <Header
          isSidebarOpen={isSideBarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <div className="pt-3 md:p-3 overflow-y-auto h-[89vh]">
          <AppContainer>
            <Suspense
              fallback={
                <div>
                  <Loader />
                </div>
              }
            >
              <Outlet />
            </Suspense>
          </AppContainer>
        </div>
      </div>
      {/* Sidebar for small and medium devices */}
      {isSideBarOpen ?
        <div className="lg:hidden w-[90%] md:w-[40%] absolute top-0">
          {location.pathname.includes("/chat/") ||
            location.pathname === "/chats" ||
            isChatPage ? (
            usersList &&
            (
              <ChattingSidebar
                openChatBar={isSideBarOpen}
                setIsOpenChatBar={setIsSidebarOpen}
                usersList={usersList}
              />
            )
          ) : (
            <Sidebar
              isSidebarOpen={isSideBarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />
          )}
        </div>
        : <></>
      }

    </div>
  );
};

export default Layout;
